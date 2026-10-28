import type { BlogPost } from "@/content/blog";

export const post: BlogPost = {
  slug: "tools-for-non-developers-to-change-an-existing-app",
  title: "Tools that let non-developers change an existing web app (2026)",
  description:
    "A fair comparison of PinAppAI, Handle Studio, Modeinspect, Workshop, Else, Synlets, Specship, CoderHelm and Butterneck: who each is for, where the work happens, what you get back, and published prices.",
  date: "2026-10-28",
  author: "The Butterneck team",
  tags: ["comparison", "AI change requests", "product teams", "non-developers"],
  cover: {
    src: "/blog/cover-tools-for-non-developers-to-change-an-existing-app.png",
    alt: "Butterneck blog cover: tools that let non-developers change an existing web app, compared",
    width: 1200,
    height: 630,
  },
  body: `
Last checked: 28 October 2026 (prices and quotes re-read on each tool's site that day). Prices and features change; each row links to the page we read. "Not on the pages we read" means we didn't find it there, not that the product lacks it.

Product managers, designers, support staff and founders increasingly want to change the app their team already runs, not build a new one. The tools below all work on an existing codebase, but they act at different moments: some give you a prototype, some open a pull request for you, some start after a pull request exists, and some stop before one. We make Butterneck, which is listed too; we've tried to describe every tool in its own words and say where each is the better pick.

## At a glance

| Tool | Who it's for (their words) | Where the work happens | What you get back | Jira | Published price |
|---|---|---|---|---|---|
| [Butterneck](https://www.butterneck.com) | Product teams: anyone who asks for a change, plus the developer who decides | The developer's agent, on a computer the team connects | A live preview the requester checks; no PR until a developer decides | Yes (label a ticket) | Free Starter; Pro $19 per person |
| [PinAppAI](https://pinappai.com/) | Solo founders who "build with v0, Claude Code, or Cursor"; agencies collecting client feedback | Reviewers pin on the live site; the developer's own agent applies changes | Edits your agent applies, which reviewers approve or reject on a generated /changes/ page | Not on the pages we read | $0 / $9 / $15 per seat (Team, 2-seat min); reviewers free |
| [Handle Studio](https://gethandle.ai/studio) | Designers, design engineers, solo founders | A Mac app or Chrome extension with your Claude Code or Codex agent, on your local repos | "A clean commit to a remote branch for your team to review" | Not on the pages we read | Free and open source |
| [Modeinspect](https://modeinspect.com/) | Design engineers and product designers | Cloud design canvas connected to your codebase | "Every change opens as a normal pull request on a branch" | Not on the pages we read | Hobby $0; Pro $20/month per person |
| [Workshop](https://docs.workshop.ai/solutions/prototyping) | PMs, designers, founders, researchers | Cloud, or Desktop with your codebase via GitHub | "A clickable prototype… with mocked data" | Not in the docs index | $0 / $20 / $50 / $200 a month (credits) |
| [Else](https://www.somethingelse.ai/) | Teams reviewing a PR (engineer, QA, designer, PM) | A hosted preview environment running your full stack | Edits in the preview of a PR an engineer already opened | Not on the homepage | No public price ("Start for free") |
| [Synlets](https://synlets.com/) | PMs, founders, engineering leads | Its cloud, with your repo cloned at runtime | "A reviewable pull request"; "nothing is merged without your approval" | Yes (label or assign) | $79–$999/month (credits), no per-seat fees; free tier |
| [Specship](https://specship.dev/) | Founders and small teams | Connected GitHub repo | Acceptance criteria, failing tests, code and "review-ready pull requests"; optional auto-merge (beta) | Listed as an integration | Pricing TBD (waitlist) |
| [CoderHelm](https://coderhelm.com/) | Engineering teams on GitHub, Jira and AWS | Hosted, or in your own AWS account | A pull request on a \`coderhelm/\` branch; auto-merge off by default | Yes (label or assign) | Closed beta; bring your own Anthropic key |

## The tools, one by one

**PinAppAI** — A "visual change-request layer for AI-built sites". Reviewers drop pins on the live site, the developer's agent applies them, and reviewers approve or reject on a generated page. It's the closest to Butterneck in spirit: reviewers are free on every plan, and the developer's own agent applies the changes. Good pick if you're a solo builder collecting client feedback on a deployed site.

**Handle Studio** — "Design directly in production code." It's free, open source, needs no account, and works with the agents designers and developers already use. The trade-off is that the person making the change installs and runs it (Studio needs macOS 13+ on Apple Silicon). Good pick for designers who are comfortable running a local repo.

**Modeinspect** — "A design canvas with your codebase and agents built in", aimed at getting "the last 20% of fidelity, in code". It runs in the cloud, so no local dev machine is needed, and every change becomes a pull request. Good pick for design engineers polishing UI.

**Workshop** — "Go from idea to clickable prototype in minutes." Its Desktop app can pull in your codebase, but the output is a prototype with mocked data, which engineering "can pick up where Workshop left off". Good pick for exploring an idea before committing to a real change.

**Else** — "Preview environments with AI editing." An engineer opens a PR, Else spins up a live environment of the full stack, and PMs, QA and designers fix things in place. It works after a PR exists, so it can sit alongside tools that work before one. Good pick for teams that want richer PR review.

**Synlets** — "Tickets in. Pull requests out." Assign a ticket and its agent writes the change and opens a PR, then iterates on review comments. Credit-based plans with no per-seat fees. Good pick if you want tickets turned straight into PRs in the cloud.

**Specship** — Ticket-to-PR automation that starts from acceptance criteria and failing tests, with an optional auto-merge for low-risk PRs in private beta. Pricing isn't published yet. Good pick for small teams that want test-first automation.

**CoderHelm** — "Assign a GitHub issue or Jira ticket and get a pull request", plus CI fixing, PR review and alerts-to-fixes, hosted or in your own AWS account. In closed beta. Good pick for engineering teams that want an engineering-ops agent.

**Butterneck** — The person who asks opens a link (or labels a Jira ticket) and chats beside a live running copy of the app while the developer's own agent makes the edit on a computer the team connects. They check the change in the preview and keep refining. Butterneck doesn't open pull requests, merge or deploy: a developer reads the conversation and the diff and decides whether it becomes a PR through the team's usual process. The agent edits the code on the connected computer, but the preview and the chat reach it through Butterneck's server, so this isn't an "everything stays local" tool. Not the right pick if you want a tool that creates the PR for you; several above do that well.

## How to choose

- **You want a prototype to explore an idea:** Workshop, Modeinspect.
- **You want a ticket turned into a pull request automatically:** Synlets, Specship, CoderHelm (Jira's built-in options are worth a look too).
- **You want better review once a PR exists:** Else.
- **You're a designer who'll run the tool yourself:** Handle Studio, Modeinspect.
- **You want the person who asked to check the change before any PR exists:** PinAppAI, Butterneck.

Prices as published on 28 October 2026. Tell us if something here is out of date and we'll fix it.
`,
};
