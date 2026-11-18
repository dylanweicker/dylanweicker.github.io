---
title: BC Tourism & Hospitality Employment Tracker
client: go2HR
year: 2021 – present
role: Developer
summary: A monthly tracker of BC's tourism and hospitality workforce, provincially and by region, with 13 interactive charts built from Statistics Canada's Labour Force Survey.
icon: /icons/chart-up.png
tint: ['#d4f7e4', '#22a06b']
# TODO(Dylan): confirm the charting library and anything else in the stack
stack: [Statistics Canada RTRA, Labour Force Survey, WordPress]
order: 7
---

## The problem

go2HR, the human resources association for BC's tourism and hospitality industry, tracks the sector's workforce month by month, for the province and for each region. The data comes from Statistics Canada's Labour Force Survey, which has to be requested through the Real Time Remote Access (RTRA) program.

## What I built

I designed the Employment Tracker in 2021 and have maintained it since. It's embedded in go2HR's WordPress site:

- **13 interactive charts** covering employment by sector and region, occupations, demographics, unemployment, hours, hourly earnings, food-service sales and hotel occupancy.
- **KPI cards** for the headline numbers, and **downloadable data** behind every chart.

## Under the hood

Every month Qatalyst retrieves the latest Labour Force Survey data through RTRA. I automated the update so that a single script rebuilds every chart's dataset from the master data tables. I also supported go2HR's move to a new hosting environment.
