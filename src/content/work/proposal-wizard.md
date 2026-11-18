---
title: Proposal Wizard
client: Qatalyst Research Group
year: 2025 – 2026
role: Architect & developer
summary: A Claude plugin that takes a request for proposals (RFP) through eleven enforced steps, from RFP analysis to a compliance-checked Word document. The proposal lead approves the plan on a review page before anything is drafted.
icon: /icons/memo.png
tint: ['#d6c9ff', '#7a8cff']
stack: [Claude Code plugin, Claude skills & hooks, Python, python-docx, docxcompose, openpyxl, HTML/JS]
order: 2
---

## The problem

Responding to an RFP means reading a dense document, choosing the right team and past projects, writing a methodology and budget, drafting a dozen sections, and checking every requirement is met. It all happens under deadline. An LLM can help with each step, but a free-form chat makes it easy to skip steps or lose the thread.

## What I built

Proposal Wizard is a Claude plugin that Qatalyst's proposal leads use. It runs an RFP through a fixed sequence of steps:

1. **RFP analysis.** Scope, scoring criteria, mandatory requirements and dates. Then background research on the client and the subject, and an outline that maps every scoring criterion to a heading.
2. **The Understanding plan.** A point-form plan for the "Our Understanding" section.
3. **Team selection.** Staff matched to the RFP's requirements.
4. **Methodology.** Phases, steps, deliverables and a person-day budget.
5. **Past projects.** The strongest comparable work from the project library.
6. **Fit.** A score out of 100 for whether the bid is worth pursuing.
7. **The lead's review.** The lead's decisions are applied to the plan.
8. **Drafting.** Every section is drafted in parallel.
9. **Validation.** Each draft is checked before assembly.
10. **Assembly.** Branded Word documents, then an executive summary written from the assembled proposal.
11. **Compliance review.** The proposal is scored against the RFP's own criteria.

A lead can go step by step, let Steps 1 to 6 run straight through to the handoff, or leave everything to an overnight run.

## The review page

After Step 6, the plan goes to the lead on a single page built as a claude.ai artifact. A cover list shows every active proposal with its status, lead, closing date and fit score. Each proposal has a page for each part of the plan:

- **Outline:** tick headings in or out, rename them, drag to reorder, set page counts, and see which scoring criterion each heading answers.
- **Team:** add or swap people, set roles, and choose who leads or supports each step.
- **Past projects:** feature, drop or reorder them, and edit why each one is relevant.
- **Methodology:** include, reword or move steps, or add ones commonly used for this type of project.
- **References:** choose who to put forward, checked live against the RFP's rules and our contact records.
- **Budget:** a grid of days by step and person. Any cell the lead edits is pinned and survives a regenerate.

Every item has a box for a note to the system, and each page has an Approve button. Once all six pages are approved, the lead presses **Run now** or **Run overnight**. Step 7 reads the decisions back into the planning files and rebuilds the budget without re-estimating the days the lead set. Then drafting starts. Nothing is drafted until the lead has signed off on the plan.

One master page serves every proposal, so a fix to the page reaches all of them at once.

## Under the hood

- **Steps are enforced by hooks.** Each step is defined by the file it writes. A hook refuses to save that file unless the step's skill was actually loaded, which it reads from the session transcript rather than trusting the model. Only the user can override it.
- **Parallel drafting.** Each section is drafted by its own subagent with its own section skill, in waves that respect dependencies (the cover letter comes last).
- **Validation that sorts failures.** Step 9 decides which sections to re-draft, which to repair automatically and which only need a warning. The proposal can't be assembled while anything is failing.
- **Writing that doesn't sound like AI.** A house voice guide, a script that scores drafts for AI-sounding patterns, and a final rewrite pass that is rejected if it changes any number, date or name.
- **A second opinion.** A different model fact-checks every sourced figure against its source. A fresh subagent that didn't write the prose scores the proposal against the RFP's criteria.
- About 46 skills, 5 hooks, roughly 41,000 lines of Python and 44 test files. The Word output is built with python-docx and docxcompose.

## Learning from the leads

After submission, the plugin compares its drafts with what the lead actually sent, sentence by sentence, and compares its plan with the one the lead approved. Changes that recur across proposals become a backlog of changes to the plugin itself. One-off edits are logged as a lead's preference.
