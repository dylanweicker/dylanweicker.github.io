---
title: Qatalink
client: Qatalyst Research Group
year: 2021 – present
role: Architect & lead developer
summary: Qatalyst's internal platform. It puts AI research tools next to the opportunity pipeline, proposals, project management, time tracking, accounting and reporting, for staff and associates.
icon: /icons/robot.png
tint: ['#8fd3ff', '#2ba6f0']
stack: [Next.js, TypeScript, Supabase, PostgreSQL, Claude API, OpenAI API, Microsoft Graph, TanStack Query, TipTap, Langfuse, Vitest, Railway]
order: 1
---

## The problem

Qatalyst's consultants do research for governments and non-profits: literature reviews, surveys, interviews, economic-development profiles and a steady stream of proposals. A lot of that work is careful, repetitive reading and writing, and it was spread across spreadsheets, shared drives and separate tools.

## What I built

Qatalink brings it all into one platform. The AI tools sit right next to the day-to-day operations:

- **Literature Review assistant.** A guided workflow. It finds sources with AI-generated searches, screens them for relevance, extracts findings for each research question and drafts the review with footnoted citations, ready to export to Word or PDF.
- **Survey Coder.** It develops themes from open-ended responses, codes every response and explains each code with quotes. Results export as an Excel coding matrix or a Word report.
- **Transcript Analyzer.** Identifying information is removed in the browser before anything is uploaded. Then it summarizes each interview and answers each research question across all of them, with citations.
- **Opportunities and proposals.** The RFP Harvester collects public RFPs, AI scores them for fit, and the proposal tools help draft the response.
- **Operations.** Projects, clients, time tracking, accounting and reporting. Each new project automatically gets a Microsoft 365 group, Teams team and SharePoint site, and accounting syncs with QuickBooks Online.

## Under the hood

- A model registry lets each task run on Claude, OpenAI or a Canadian-hosted model.
- Long-running AI steps stream their progress to the browser over server-sent events.
- Every AI call is logged with its cost and traced in Langfuse, so the firm knows what each tool really costs to run.
- About 66 pages, 198 API routes and 92 database tables, with row-level security on every table, and 155 automated test files run in CI.

## The journey

The first Qatalink (November 2021) was built on Nuxt, Vuetify and Firebase. It combined project management, hour logging, invoicing, expenses and bills with QuickBooks, RFP tracking, client surveys and reporting, and it held about 500 past-project records used in proposals. From 2023 I added an AI tools hub, including a fine-tuned GPT-3.5 model that screened incoming RFPs against Qatalyst's service lines. In 2024 and 2025 I directed two junior developers who extended the Literature Review, Transcript Summarizer and Survey Coder.

In February 2026 I rebuilt it from scratch as Qatalink 3 on Next.js and Supabase, with AI at the centre rather than bolted on.
