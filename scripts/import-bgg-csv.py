"""Turns a BoardGameGeek collection CSV export into src/data/boardgames.json (the site's snapshot).

    python scripts/import-bgg-csv.py path/to/collection.csv [username]

Export the CSV from boardgamegeek.com/collection/user/<username> → "Export" (while logged in). Only
games you own are kept, and expansions are skipped. Thumbnails aren't in the CSV, so the snapshot
shows names only; a live build with BGG_TOKEN adds the box art.
"""

import csv
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "data" / "boardgames.json"


def main() -> None:
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    src = Path(sys.argv[1])
    username = sys.argv[2] if len(sys.argv) > 2 else json.loads(OUT.read_text(encoding="utf8"))["username"]

    games = []
    with src.open(encoding="utf-8-sig", newline="") as f:
        for row in csv.DictReader(f):
            if row.get("own", "1") not in ("1", "true", "True"):
                continue
            kind = (row.get("itemtype") or row.get("subtype") or row.get("objecttype") or "").lower()
            if "expansion" in kind:
                continue
            name = (row.get("objectname") or row.get("name") or "").strip()
            if not name:
                continue
            games.append(
                {
                    "id": str(row.get("objectid", "")).strip(),
                    "name": name,
                    "year": (row.get("yearpublished") or "").strip() or None,
                    "plays": int(row.get("numplays") or 0),
                }
            )

    games.sort(key=lambda g: g["name"].lower())
    OUT.write_text(json.dumps({"username": username, "games": games}, ensure_ascii=False, indent=2) + "\n", encoding="utf8")
    print(f"{len(games)} games written to {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
