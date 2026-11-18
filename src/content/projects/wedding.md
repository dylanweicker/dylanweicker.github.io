---
title: Wedding Site
year: '2026'
role: Best man & web developer
summary: A custom wedding website for two dear friends, with an animated envelope intro, household RSVPs, a gift registry and an admin dashboard for the couple.
icon: /icons/champagne.webp
stack: [React 19, Vite, TypeScript, Tailwind CSS 4, Firebase, TipTap, Vitest, Playwright]
links:
  live: https://tipladys2027.web.app/
order: 1
---

## The idea

When my friends Gemma and Warren got engaged, I offered to build them something nicer than a template site. Being the best man has its perks.

## What I built

- **An envelope that opens.** Guests arrive to a sealed envelope that unfolds into the site, built with CSS 3D transforms and an SVG wax seal. It scales smoothly to any screen and respects reduced-motion settings.
- **Household RSVPs.** Guests find their invitation by name, then RSVP for everyone in their household, with meal choices and plus-ones.
- **A registry** where gifts are reserved in a transaction, so two guests can't buy the same thing.
- **An admin dashboard** for the couple, with responses, CSV import and export, guest management, registry management and a rich-text editor for notes to the wedding party.

## Under the hood

Guests stay anonymous, and nothing can be listed without an admin login. Firestore security rules check the shape of every write and are covered by their own test suite. Playwright checks every page at phone and desktop sizes. The whole app ships in about 125 KB (gzipped).

I built it with Claude Code as my pair programmer, and it was a great test of how far careful planning plus AI assistance can go on a real project.
