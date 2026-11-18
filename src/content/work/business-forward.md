---
title: Business Forward Employer Survey
client: Northwestern Polytechnic
year: 2026 – 2027
role: Technical lead
summary: A scored employer survey on Qatalyst's benchmarking platform. Employers in the Grande Prairie region answer 34 questions and get a benchmark report across four pillars of business resilience.
icon: /icons/compass.png
tint: ['#d9f2ff', '#3b8fd9']
stack: [Next.js 16, React 19, TypeScript, Supabase, pgvector, Anthropic SDK, React PDF, Railway]
order: 5
---

## The problem

Northwestern Polytechnic's Side Centre for Entrepreneurial Excellence, with the Grande Prairie Chamber, Community Futures and the Government of Alberta, engaged Qatalyst as its labour market researcher under the Canada–Alberta Workforce Tariff Response. They needed to know how exposed local employers were, and to give each employer something useful back for their time.

## What I built

I delivered the Business Forward Employer Survey on Qatalyst's benchmarking platform:

- **34 questions in six sections**, scored across four pillars: Market Resilience, Trade and Supply-Chain Exposure, Workforce Planning Maturity, and Key-Person Resilience.
- **A scored benchmark report** for every employer who completes it.
- **Aggregate results** for the project team, by domain and by organization.

## Under the hood

On the benchmarking platform, a new survey is configuration rather than new code. Scoring lives in a shared TypeScript engine with its own tests, and reports are rendered to PDF. The platform runs on Next.js and Supabase, hosted in Canada. It can also write AI evaluations and answer questions from a knowledge base.
