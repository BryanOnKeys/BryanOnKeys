"""Collect only public GitHub data; never persist API credentials or private repos."""

import json
import os
import re
import time
from datetime import datetime, timezone
from html.parser import HTMLParser
from urllib.error import HTTPError, URLError
from urllib.parse import quote
from urllib.request import Request, urlopen


def request(url, payload=None):
    headers = {
        "Accept": "application/vnd.github+json",
        "User-Agent": "BryanOnKeys-profile",
        "Accept-Language": "en-US,en;q=0.9",
    }
    token = os.environ.get("GH_TOKEN")
    if token and url.startswith("https://api.github.com/"):
        headers["Authorization"] = f"Bearer {token}"
    body = json.dumps(payload).encode() if payload is not None else None
    if body:
        headers["Content-Type"] = "application/json"
    for attempt in range(3):
        try:
            with urlopen(
                Request(url, data=body, headers=headers), timeout=30
            ) as response:
                return response.read().decode("utf-8")
        except HTTPError as error:
            if error.code not in (429, 500, 502, 503, 504) or attempt == 2:
                raise RuntimeError(f"GitHub returned HTTP {error.code}") from None
        except (URLError, TimeoutError):
            if attempt == 2:
                raise RuntimeError(
                    "GitHub could not be reached; the previous snapshot is retained"
                ) from None
        time.sleep(attempt + 1)
    raise RuntimeError("GitHub request failed")


def api(path):
    return json.loads(request("https://api.github.com" + path))


def public_repositories(repositories):
    """An authenticated endpoint must never accidentally reveal private metadata."""
    return [
        {
            "name": repo["name"],
            "url": repo["html_url"],
            "fork": bool(repo.get("fork", False)),
            "stars": int(repo.get("stargazers_count", 0)),
            "language": repo.get("language"),
            "pushedAt": repo.get("pushed_at"),
        }
        for repo in repositories
        if repo.get("private", True) is False
    ]


class ContributionParser(HTMLParser):
    """Fallback for GitHub's own public calendar, including tooltip counts."""

    def __init__(self):
        super().__init__()
        self.cells = {}
        self.tooltips = {}
        self.tip = None
        self.heading = False
        self.heading_text = ""

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in ("td", "rect") and attrs.get("data-date") and attrs.get("id"):
            self.cells[attrs["id"]] = {
                "date": attrs["data-date"],
                "level": int(attrs.get("data-level", 0)),
            }
        if tag == "tool-tip" and attrs.get("for"):
            self.tip = attrs["for"]
            self.tooltips[self.tip] = ""
        if tag == "h2" and attrs.get("id") == "js-contribution-activity-description":
            self.heading = True

    def handle_endtag(self, tag):
        if tag == "tool-tip":
            self.tip = None
        if tag == "h2":
            self.heading = False

    def handle_data(self, data):
        if self.tip is not None:
            self.tooltips[self.tip] += data
        if self.heading:
            self.heading_text += data

    def calendar(self):
        days = []
        for key, cell in self.cells.items():
            tip = self.tooltips.get(key, "")
            count = re.search(r"([\d,]+)\s+contribution", tip)
            if "No contributions" in tip:
                value = 0
            elif count:
                value = int(count.group(1).replace(",", ""))
            else:
                raise ValueError("GitHub calendar changed; a day has no verified count")
            days.append({**cell, "count": value})
        total = re.search(r"([\d,]+)\s+contributions?", self.heading_text)
        if len(days) < 300 or not total:
            raise ValueError("The public contribution calendar is incomplete")
        days.sort(key=lambda day: day["date"])
        count = int(total.group(1).replace(",", ""))
        if sum(day["count"] for day in days) != count:
            raise ValueError(
                "Contribution totals do not match GitHub's public calendar"
            )
        return {"total": count, "days": days, "source": "github-public-calendar"}


def calendar(login):
    if os.environ.get("GH_TOKEN"):
        query = """query($login:String!){user(login:$login){contributionsCollection{
          contributionCalendar{totalContributions weeks{contributionDays{
            date contributionCount contributionLevel
          }}}
        }}}"""
        try:
            result = json.loads(
                request(
                    "https://api.github.com/graphql",
                    {
                        "query": query,
                        "variables": {"login": login},
                    },
                )
            )
            value = result["data"]["user"]["contributionsCollection"][
                "contributionCalendar"
            ]
            levels = {
                "NONE": 0,
                "FIRST_QUARTILE": 1,
                "SECOND_QUARTILE": 2,
                "THIRD_QUARTILE": 3,
                "FOURTH_QUARTILE": 4,
            }
            days = [
                {
                    "date": day["date"],
                    "count": day["contributionCount"],
                    "level": levels[day["contributionLevel"]],
                }
                for week in value["weeks"]
                for day in week["contributionDays"]
            ]
            return {
                "total": value["totalContributions"],
                "days": days,
                "source": "github-graphql",
            }
        except (RuntimeError, KeyError, TypeError, ValueError):
            print("Using GitHub's public calendar fallback.")
    parser = ContributionParser()
    parser.feed(request(f"https://github.com/users/{quote(login)}/contributions"))
    return parser.calendar()


def collect(login):
    if not re.fullmatch(r"[A-Za-z0-9][A-Za-z0-9-]{0,38}", login):
        raise ValueError("Invalid GitHub login")
    user = api(f"/users/{login}")
    repositories = []
    for page in range(1, 21):
        batch = api(f"/users/{login}/repos?type=owner&per_page=100&page={page}")
        repositories.extend(public_repositories(batch))
        if len(batch) < 100:
            break
    else:
        raise ValueError(
            "Repository pagination limit reached; refusing a partial snapshot"
        )
    repositories.sort(key=lambda repo: repo["name"].casefold())
    languages = {}
    for repo in repositories:
        if not repo["fork"] and repo["name"].casefold() != login.casefold():
            values = api(f"/repos/{login}/{quote(repo['name'])}/languages")
            for name, size in values.items():
                languages[name] = languages.get(name, 0) + size
    public_names = {f"{login}/{repo['name']}" for repo in repositories}
    labels = {
        "PushEvent": "Código actualizado",
        "PullRequestEvent": "Pull request",
        "IssuesEvent": "Issue",
        "ReleaseEvent": "Versión publicada",
        "CreateEvent": "Nueva rama o repositorio",
        "IssueCommentEvent": "Conversación técnica",
    }
    activity = []
    for event in api(f"/users/{login}/events/public?per_page=100"):
        name = event.get("repo", {}).get("name", "")
        kind = event.get("type")
        if event.get("public") is True and name in public_names and kind in labels:
            activity.append(
                {
                    "repository": name.split("/", 1)[1],
                    "label": labels[kind],
                    "date": event["created_at"][:10],
                    "type": kind,
                }
            )
        if len(activity) == 5:
            break
    return {
        "schemaVersion": 1,
        "updatedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "login": login,
        "followers": user["followers"],
        "joinedAt": user["created_at"][:10],
        "repositories": repositories,
        "languages": dict(
            sorted(languages.items(), key=lambda item: item[1], reverse=True)
        ),
        "calendar": calendar(login),
        "activity": activity,
    }
