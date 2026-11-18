---
title: Tourism Insights Data System
client: Tourism Industry Association of Canada
year: 2026 – 2027
role: Technical lead
summary: The Statistics Canada data system behind TIAC's Tourism Insights Series. It pulls 44 core tables, keeps every pull, and freezes a snapshot for each report so every published figure traces back to its source.
icon: /icons/maple-leaf.png
tint: ['#ffd6cc', '#e0453a']
stack: [Next.js 15, React 19, TypeScript, PostgreSQL, R, Azure Container Apps, Azure Bicep, Microsoft Entra ID, ExcelJS, GitHub Actions]
order: 4
---

## The problem

Qatalyst produces the Tourism Industry Association of Canada's Tourism Insights Series: an annual Tourism Trends Report and four white papers a year from 2026 to 2029. Every figure in them comes from Statistics Canada, and Statistics Canada revises its data. A number in a report has to stay defensible long after the source table has moved on.

## What I built

- **A pipeline for 44 core tables** across eight domains, including tourism GDP, visitation, workforce and business health. Every pull is kept.
- **Frozen snapshots.** A dated snapshot is frozen for each report, so every published figure can be traced to the exact table and release it came from.
- **Checks before analysts see the data.** After each load, automated checks flag changes in row counts, reference periods, units and revised values.
- **Excel exports** of indicators and series for the analysts writing the reports.

## Under the hood

The fetch job is written in R and runs in a container on a weekday schedule. The web app is Next.js on PostgreSQL. Everything runs in Azure Canada Central, defined in Bicep, with Microsoft Entra sign-on. CI builds the app, runs the migrations and validates the infrastructure.
