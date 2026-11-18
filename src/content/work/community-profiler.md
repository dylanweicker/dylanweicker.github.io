---
title: Community Profiler
client: Qatalyst Research Group
year: '2026'
role: Designer & developer
summary: An economic development tool that brings together 18+ Statistics Canada datasets for any Canadian community and drafts a community economic profile with footnoted, checked sources.
icon: /icons/houses.png
tint: ['#ffe0c7', '#e07b39']
stack: [R, cansim, PostgreSQL, Next.js, Recharts, Claude API, Docker, Railway]
order: 8
---

## The problem

Community economic profiles are a staple of economic development work, and they take a long time to assemble by hand. The data is spread across many Statistics Canada tables, small communities often have suppressed values, and every figure in the profile needs a source.

## What I built

- **18+ Statistics Canada datasets** for any community in Canada, refreshed monthly.
- **A fallback for suppressed data.** Where a community's value is suppressed, the profiler uses the next geography up that has it.
- **A nine-tab dashboard** covering labour, jobs, housing, business and cost of living.
- **An AI-drafted profile** with footnoted sources, exported to Word with its charts.

## Under the hood

The data pipeline is an R job that pulls the tables into Postgres each month. After a profile is generated, every citation is checked, and any reference that can't be traced to the data the model was given is flagged. The profiler is part of Qatalink.
