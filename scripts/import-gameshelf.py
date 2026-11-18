"""Saves a snapshot of Dylan's board game collection to src/data/boardgames.json.

    python scripts/import-gameshelf.py [username]

The data comes from GameShelf (gameshelf.io/user/<username>), which reads the BoardGameGeek collection
with its own BGG API access. This is an unofficial use of GameShelf's backend, so run it by hand
occasionally rather than on every build. Only games marked "Owned" are kept.
"""

import json
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "data" / "boardgames.json"
URL = "https://us-central1-bgg-collection.cloudfunctions.net/getUserCollection8?name={}"


def num(value):
    try:
        n = float(value)
    except (TypeError, ValueError):
        return None
    return int(n) if n.is_integer() else round(n, 2)


def first(value):
    return value[0] if isinstance(value, list) and value else value


def main() -> None:
    username = sys.argv[1] if len(sys.argv) > 1 else "nifflr"
    req = urllib.request.Request(URL.format(username), headers={"User-Agent": "dylanweicker.github.io snapshot"})
    with urllib.request.urlopen(req, timeout=60) as res:
        data = json.load(res)

    games = []
    for g in data["games"].values():
        if "Owned" not in (g.get("status") or []):
            continue
        games.append(
            {
                "id": str(g["id"]),
                "name": g["name"],
                "year": num(g.get("yearPublished")),
                "thumbnail": g.get("thumbnail") or None,
                "image": g.get("image") or None,
                "expansion": g.get("type") == "Expansion",
                "minPlayers": num(g.get("minPlayers")),
                "maxPlayers": num(g.get("maxPlayers")),
                "bestPlayers": [str(p) for p in g.get("playersBest") or []],
                "minTime": num(g.get("minPlayTime")),
                "maxTime": num(g.get("maxPlayTime")) or num(g.get("playingTime")),
                "minAge": num(g.get("minAge")),
                "rating": num(g.get("bggRating")),
                "weight": num(g.get("weight")),
                "plays": num(first(g.get("numPlays"))) or 0,
                "designers": g.get("designers") or [],
                "mechanics": g.get("mechanics") or [],
                "categories": g.get("categories") or [],
            }
        )

    games.sort(key=lambda x: x["name"].lower())
    OUT.write_text(json.dumps({"username": username, "games": games}, ensure_ascii=False, indent=1) + "\n", encoding="utf8")
    base = sum(not x["expansion"] for x in games)
    print(f"{len(games)} owned ({base} base games, {len(games) - base} expansions) written to {OUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
