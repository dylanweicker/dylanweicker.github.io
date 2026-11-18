---
title: RFP Harvester
client: Qatalyst Research Group
year: 2022 – present
role: Designer & developer
summary: The system that finds Qatalyst's bidding opportunities. It checks more than 40 procurement sources three times a day, removes duplicates and expired notices, and has AI score each one against the firm's service lines.
icon: /icons/sheaf.png
tint: ['#fff3c4', '#d4a017']
stack: [Python, BeautifulSoup, Selenium, Anthropic SDK, Supabase, Langfuse, Docker, Railway]
order: 9
---

## The problem

A consulting firm depends on finding the right requests for proposals in time. Public opportunities are scattered across dozens of federal, provincial, territorial and international portals, and most of them aren't a fit.

## What I built

- **A harvester** that runs three times a day across more than 40 procurement sources in Canada and internationally, including MERX, CanadaBuys, BC Bid, provincial and territorial portals, the World Bank and TED Europa.
- **Clean-up.** Duplicates and expired notices are removed.
- **AI fit scoring** against Qatalyst's service lines and past work.
- **Assessment.** Staff review the scored opportunities and run structured fit assessments. Associates can express interest, and AI-written fit summaries help staff choose the team.

## Under the hood

Python, with an email-alert parser or web scraper for each source, running as a scheduled Docker service. Scoring uses Claude, traced in Langfuse. Results land in Qatalink, where the rest of the bid process happens.
