---
title: Abomination Vaults
year: '2026'
role: Game master & developer
summary: A player companion site for the Pathfinder 2e campaign I run, with characters, session logs, quests, a Golarion calendar and a dungeon map, all without spoiling what the party hasn't found yet.
icon: /icons/abomination-vaults.webp
stack: [Next.js 16, React 19, TypeScript, Tailwind CSS 4, shadcn/ui]
links:
  live: https://abominationvaults.dylanweicker.ca/
order: 2
---

## The idea

I GM a Pathfinder 2e campaign through *Abomination Vaults*, a megadungeon beneath a haunted lighthouse. Between sessions, my players kept asking things like "who was that NPC again?" and "what day is it in-game?" So they got a website.

## What's inside

- **Characters.** More than 40 PCs, NPCs, allies and adversaries.
- **Session logs** and **quests** with progress tracking.
- **A Golarion calendar** that highlights the current in-game date.
- **Locations.** The town above ground and the Gauntlight dungeon, level by level.
- **Lore** with automatic cross-links and search.
- **A quick reference** for PF2e encounter, exploration and downtime actions.

## Under the hood

The site is fully static: all content is JSON, loaded at build time. Secrets stay secret. Anything the party hasn't discovered yet is flagged in the data and never rendered, so I can write ahead without spoilers leaking. It has a moody "ghostly blue" theme to match the lighthouse.
