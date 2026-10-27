import copy
import json
import unittest
import xml.etree.ElementTree as ET
from pathlib import Path

from scripts.profile.collect import ContributionParser, public_repositories
from scripts.profile.draw import assets

ROOT = Path(__file__).resolve().parents[1]


class ProfileDataTests(unittest.TestCase):
    def test_private_or_unknown_visibility_is_never_published(self):
        public = {
            "name": "public",
            "html_url": "https://github.com/example/public",
            "private": False,
        }
        private = {
            "name": "private",
            "html_url": "https://github.com/example/private",
            "private": True,
        }
        unknown = {"name": "unknown", "html_url": "https://github.com/example/unknown"}
        result = public_repositories([public, private, unknown])
        self.assertEqual([repo["name"] for repo in result], ["public"])
        self.assertNotIn("private", result[0])

    def test_calendar_fails_closed_when_counts_cannot_be_verified(self):
        parser = ContributionParser()
        parser.feed(
            '<td data-date="2026-10-27" id="day" data-level="4"></td><tool-tip for="day">unknown</tool-tip>'
        )
        with self.assertRaisesRegex(ValueError, "verified count"):
            parser.calendar()

    def test_snapshot_totals_match_the_real_calendar(self):
        data = json.loads((ROOT / "profile/data.json").read_text())
        days = data["calendar"]["days"]
        self.assertEqual(len({day["date"] for day in days}), len(days))
        self.assertEqual(sum(day["count"] for day in days), data["calendar"]["total"])
        self.assertTrue(
            all(day["count"] >= 0 and 0 <= day["level"] <= 4 for day in days)
        )

    def test_repository_text_is_escaped_in_every_svg(self):
        config = json.loads((ROOT / "profile/config.json").read_text())
        data = json.loads((ROOT / "profile/data.json").read_text())
        config = copy.deepcopy(config)
        config["projects"][0]["title"] = 'A & B <script>alert("unsafe")</script>'
        generated = assets(config, data, "M0 0h16v16H0z")
        namespace = {"svg": "http://www.w3.org/2000/svg"}
        for name, value in generated.items():
            root = ET.fromstring(value)
            self.assertEqual(root.tag, "{http://www.w3.org/2000/svg}svg", name)
            self.assertEqual(root.findall(".//svg:script", namespace), [], name)
        self.assertIn("&lt;script&gt;", generated["projects/nexo-fulfillment.svg"])


if __name__ == "__main__":
    unittest.main()
