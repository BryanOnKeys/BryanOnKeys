"""Refresh the public snapshot only; retain the previous snapshot if fetching fails."""
import json
from pathlib import Path
from scripts.profile.collect import collect

ROOT = Path(__file__).resolve().parents[2]
target = ROOT / "profile" / "data.json"
snapshot = collect("BryanOnKeys")
if snapshot.get("login") != "BryanOnKeys" or snapshot.get("schemaVersion") != 1:
    raise ValueError("Unexpected GitHub data owner or schema")
if not snapshot.get("calendar", {}).get("days") or not isinstance(snapshot.get("repositories"), list):
    raise ValueError("Incomplete public snapshot")
temporary = target.with_suffix(".json.tmp")
temporary.write_text(json.dumps(snapshot, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
temporary.replace(target)
print("Updated verified public GitHub snapshot")
