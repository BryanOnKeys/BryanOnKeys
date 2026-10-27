"""Usage: python3 -m scripts.profile.build [--refresh | --check]."""

import argparse
import json
import xml.etree.ElementTree as ET
from pathlib import Path

from .collect import collect
from .draw import assets

ROOT = Path(__file__).resolve().parents[2]


def main():
    parser = argparse.ArgumentParser(description="Build the pearl-white GitHub profile")
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument(
        "--refresh", action="store_true", help="Fetch current public GitHub data"
    )
    mode.add_argument(
        "--check",
        action="store_true",
        help="Check committed SVGs against their sources",
    )
    args = parser.parse_args()
    config = json.loads((ROOT / "profile/config.json").read_text())
    data = (
        collect(config["login"])
        if args.refresh
        else json.loads((ROOT / "profile/data.json").read_text())
    )
    if data["login"] != config["login"] or data["schemaVersion"] != 1:
        raise ValueError("The public snapshot does not belong to this profile")
    mark = ET.parse(ROOT / "profile/mark-github.svg").getroot()[0].attrib["d"]
    generated = assets(config, data, mark)
    for name, content in generated.items():
        element = ET.fromstring(content)
        if element.tag != "{http://www.w3.org/2000/svg}svg" or "<script" in content:
            raise ValueError(f"Invalid or unsafe SVG: {name}")
    if args.check:
        changed = [
            name
            for name, value in generated.items()
            if not (ROOT / "assets/profile" / name).exists()
            or (ROOT / "assets/profile" / name).read_text() != value
        ]
        if changed:
            raise SystemExit("Generated assets are outdated: " + ", ".join(changed))
        print(f"Verified {len(generated)} SVG assets.")
        return
    for name, content in generated.items():
        target = ROOT / "assets/profile" / name
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(content, encoding="utf-8")
    if args.refresh:
        target = ROOT / "profile/data.json"
        temporary = target.with_suffix(".json.tmp")
        temporary.write_text(
            json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
        )
        temporary.replace(target)
    print(f"Generated {len(generated)} SVG assets from public GitHub data.")


if __name__ == "__main__":
    main()
