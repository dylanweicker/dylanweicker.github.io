---
title: CRRF Insights Portal
client: Canadian Race Relations Foundation
year: 2025 – 2026
role: Lead developer
summary: A secure portal that brings reporting from every department into one system, so the Foundation can measure its work against its Performance Measurement Framework and export reports to Word, Excel and PDF.
icon: /icons/chart.png
tint: ['#c4f0a0', '#3e9e2a']
stack: [Next.js 15, React, TypeScript, Supabase, Tailwind CSS, shadcn/ui, Recharts, ExcelJS, docx, Vercel]
order: 3
---

## The problem

The Canadian Race Relations Foundation is a national anti-racism Crown corporation that funds and supports over 72 initiatives a year. It needed to put its Performance Measurement Framework into practice, but the information lived in different shapes and places, so producing a consistent picture for the whole organisation meant a lot of manual compiling.

## What I built

- **Configurable data collection.** Staff record initiatives, projects and outcomes through forms that administrators configure without code changes, including table-style questions with guidance.
- **Department modules.** HR, Finance, Communications and Community Investments each get their own module, dashboard and Excel import.
- **Automatic imports.** Grant applications come in from SurveyMonkey Apply on a schedule.
- **Reports on live data.** Saved filters, fiscal-year roll-ups and a KPI dashboard organized by strategic priority. Everything exports to Excel and PDF.
- **Permissions and auditability.** Role-based access, department privacy settings and an activity log.

I ran the requirements sessions with CRRF staff and wrote the system documentation.

## Training staff to use it

After launch, Qatalyst trained CRRF staff on the portal, and I built a tool to measure what they learned. It's a pre- and post-training assessment with 19 scored questions and feedback on each answer. The admin dashboard compares results question by question and across nine departments, and exports to Word and PowerPoint, showing where staff are confident and where they need more support.

## Under the hood

49 pages and about 55 database tables on Next.js and Supabase, with the schema built up over many migrations as the Foundation's needs grew. Deployed on Vercel.
