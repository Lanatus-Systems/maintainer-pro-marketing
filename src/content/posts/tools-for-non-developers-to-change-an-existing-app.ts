import type { BlogPost } from "@/content/blog";

export const post: BlogPost = {
  slug: "tools-for-non-developers-to-change-an-existing-app",
  title: "AI tools that let non-developers change an existing web app (2026)",
  seoTitle: "AI tools that let non-developers change an existing app",
  description:
    "Compare AI tools that let PMs and designers change an existing web app: who asks, where the agent runs, PR or no PR, Jira, and published prices (Oct 2026).",
  date: "2026-10-28",
  updated: "2026-10-28",
  author: "The Butterneck team",
  tags: ["comparison", "AI tools", "AI change requests", "product teams", "non-developers"],
  cover: {
    src: "/blog/cover-tools-for-non-developers-to-change-an-existing-app.png",
    alt: "Butterneck blog cover: AI tools that let non-developers change an existing web app, compared",
    width: 1200,
    height: 630,
  },
  body: `
Last checked: 28 October 2026 (prices and quotes re-read on each tool's site that day). Prices and features change; each row links to the page we read. "Not on the pages we read" means we didn't find it there, not that the product lacks it.

Product managers, designers, support staff and founders increasingly want to change the app their team already runs, not build a new one. The AI tools below all work on an existing codebase, but they act at different moments: some give you a prototype, some open a pull request for you, some start after a pull request exists, and some stop before one. We make Butterneck, which is listed too; we've tried to describe every tool in its own words and say where each is the better pick.

## At a glance

| Tool | Who it's for (their words) | Where the work happens | What you get back | Jira | Published price |
|---|---|---|---|---|---|
| [Butterneck](https://www.butterneck.com) | Product teams: anyone who asks for a change, plus the developer who decides | The developer's agent, on a computer the team connects | A live preview the requester checks; no PR until a developer decides | Yes (label and assign a ticket) | Free Starter; Pro $19 per person |
| [ronda](https://useronda.com/) | "Marketing, design, and product" | An isolated live sandbox running your dev server | "ronda writes the code and opens a pull request. Engineering reviews and merges." | Not on the pages we read | Free $0; Starter $9/month; bring your own Anthropic key |
| [Refinar](https://refinar.ai/en/for/product-managers) | Product managers (its /for/product-managers page) | "A copy of the live app" | "Publish it or send it to engineering"; risky changes go to a developer first as a draft PR | Not checked | "From $50 a month for 500 credits" |
| [Fixdog](https://fix.dog/) | "PMs, designers, operators" | "Directly on their live product" | It "auto-generates a PR. Eng reviews and merges." | Not checked | No public price found |
| [Itera](https://iteradev.ai/) | Product teams: builders, plus free collaborators | Your live web product, through chat | AI-generated pull requests (GitHub, GitLab, Bitbucket) for engineering review | Not checked | Builder €30 and Unlimited €100 per seat/month; collaborators free; "Currently free for early partners" |
| [Clogless](https://clogless.ai/) | Product teams handing work to engineering | "A live sandbox on your real codebase", in its cloud | A pull request it opens with your Git provider | Yes (one of six ticketing tools) | $99/month Starter, $489/month Team, billed annually |
| [Revyse](https://www.revyse.dev/) | Developers locally; in the cloud, "anyone on the team" | Your running Next.js app (local), or an isolated cloud sandbox | A diff to review (local), or a pull request it opens with a Vercel preview (cloud) | Not on the pages we read | Pilot pricing: Starter $19, Pro $49, Agency $149 a month (credits, billed by invoice) |
| [Plusma](https://plusma.ai/) | PMs and designers ("No terminal, no IDE") | "An instant preview environment" built from your GitHub repo | "A clean pull request… ready for your engineering team to review and merge" | Not on the page we read | No public price found |
| [PinAppAI](https://pinappai.com/) | Solo founders who "build with v0, Claude Code, or Cursor"; agencies collecting client feedback | Reviewers pin on the live site; the developer's own agent applies changes | Edits your agent applies, which reviewers approve or reject on a generated /changes/ page | Not on the pages we read | $0 / $9 / $15 per seat (Team, 2-seat min); reviewers free |
| [Handle Studio](https://gethandle.ai/studio) | Designers, design engineers, solo founders | A Mac app or Chrome extension with your Claude Code or Codex agent, on your local repos | "A clean commit to a remote branch for your team to review" | Not on the pages we read | Free and open source |
| [Layrr](https://narnia.sh/layrr/) | Developers running a local web app | A proxy in front of your local dev server, using Claude Code, Codex CLI or Gemini | It "commits successful edits with a [layrr] prefix" | No | Free, open source (MIT) |
| [Modeinspect](https://modeinspect.com/) | Design engineers and product designers | Cloud design canvas connected to your codebase | "Every change opens as a normal pull request on a branch" | Not on the pages we read | Hobby $0; Pro $20/month per person |
| [Workshop](https://docs.workshop.ai/solutions/prototyping) | PMs, designers, founders, researchers | Cloud, or Desktop with your codebase via GitHub | "A clickable prototype… with mocked data" | Not in the docs index | $0 / $20 / $50 / $200 a month (credits) |
| [Else](https://www.somethingelse.ai/) | Teams reviewing a PR (engineer, QA, designer, PM) | A hosted preview environment running your full stack | Edits in the preview of a PR an engineer already opened | Not on the homepage | No public price ("Start for free") |
| [Synlets](https://synlets.com/) | PMs, founders, engineering leads | Its cloud, with your repo cloned at runtime | "A reviewable pull request"; "nothing is merged without your approval" | Yes (label or assign) | $79–$999/month (credits), no per-seat fees; free tier |
| [Specship](https://specship.dev/) | Founders and small teams | Connected GitHub repo | Acceptance criteria, failing tests, code and "review-ready pull requests"; optional auto-merge (beta) | Listed as an integration | Pricing TBD (waitlist) |
| [CoderHelm](https://coderhelm.com/) | Engineering teams on GitHub, Jira and AWS | Hosted, or in your own AWS account | A pull request on a \`coderhelm/\` branch; auto-merge off by default | Yes (label or assign) | Closed beta; bring your own Anthropic key |
| [Epicraft](https://www.epicraft.dev/) | "The PM is the user, not the developer" | From a Jira ticket assigned to its bot | A branch and a pull request; "You review the PR in GitHub, approve, merge" | Yes (assign the ticket to its bot) | No public price; "Now accepting design partners" |

## The tools, one by one

**ronda** — "Small changes shouldn't wait on engineering." Marketing, design and product describe the change in plain English, it runs in an isolated live sandbox on your dev server, and "ronda writes the code and opens a pull request. Engineering reviews and merges." You bring your own Anthropic key. Good pick if you want a pull request from a plain-English request on a small budget.

**Refinar** — "Describe a change to your product, watch it built on a copy of the live app, then publish it or send it to engineering. No terminal or GitHub account." Risky changes go to a developer first as a draft PR. The clearest difference from Butterneck: Refinar lets the person who asked publish small changes themselves. Good pick if that is what you want.

**Fixdog** — It "lets PMs, designers, operators make changes directly on their live product and auto-generates a PR. Eng reviews and merges." We couldn't find a public price. Good pick if you want an auto-generated PR from a change made on the live product.

**Itera** — Lets the team "propose changes to your live web product through chat" and "submit it for engineering review" as AI-generated pull requests. Builders pay per seat; "Collaborators are always free". Good pick for teams that want a PR from a chat on the live product. We compare it in more detail in our [Itera alternative](/blog/itera-alternative) post.

**Clogless** — "A live sandbox on your real codebase. Ship changes as pull requests that engineering reviews." It runs in its own cloud sandbox and connects to six ticketing tools, Jira included. Good pick if you want a cloud workspace that turns tickets into PRs. More in our [Clogless alternative](/blog/clogless-alternative) post.

**Revyse** — "Point at any part of your running app and say what should change. Revyse plans it, writes the code, runs your checks and hands you a diff to review." Locally it's a dev-server overlay you start with \`npx revyse dev\`; in its cloud mode, "Anyone on the team can request a change from the dashboard", and Revyse "opens a pull request and checks the preview your Vercel integration builds for it." It supports Next.js 14–16 (Vite and CRA are "experimental") and refuses backend, auth, payments and database-schema changes. Good pick for Next.js teams that want a reviewed diff or PR.

**Plusma** — "Describe a change, preview it live, iterate until it's right, and hand your team a clean PR." It connects to your GitHub repo and "Every change spins up an instant preview environment" in its cloud. Good pick for PMs and designers who want to iterate on a cloud preview and then hand engineering a PR.

**PinAppAI** — A "visual change-request layer for AI-built sites". Reviewers drop pins on the live site, the developer's agent applies them, and reviewers approve or reject on a generated page. It's the closest to Butterneck in spirit: reviewers are free on every plan, and the developer's own agent applies the changes. Good pick if you're a solo builder collecting client feedback on a deployed site.

**Handle Studio** — "Design directly in production code." It's free, open source, needs no account, and works with the agents designers and developers already use. The trade-off is that the person making the change installs and runs it (Studio needs macOS 13+ on Apple Silicon). Good pick for designers who are comfortable running a local repo.

**Layrr** — "Point, click, and edit your running web app." A free, MIT-licensed proxy in front of your local dev server that uses Claude Code, Codex CLI or Gemini and "commits successful edits with a [layrr] prefix". Whoever runs it needs the repo, and its last release was in May 2026. Good pick for developers who want a free visual overlay on their own machine.

**Modeinspect** — "A design canvas with your codebase and agents built in", aimed at getting "the last 20% of fidelity, in code". It runs in the cloud, so no local dev machine is needed, and every change becomes a pull request. Good pick for design engineers polishing UI.

**Workshop** — "Go from idea to clickable prototype in minutes." Its Desktop app can pull in your codebase, but the output is a prototype with mocked data, which engineering "can pick up where Workshop left off". Good pick for exploring an idea before committing to a real change.

**Else** — "Preview environments with AI editing." An engineer opens a PR, Else spins up a live environment of the full stack, and PMs, QA and designers fix things in place. It works after a PR exists, so it can sit alongside tools that work before one. Good pick for teams that want richer PR review.

**Synlets** — "Tickets in. Pull requests out." Assign a ticket and its agent writes the change and opens a PR, then iterates on review comments. Credit-based plans with no per-seat fees. Good pick if you want tickets turned straight into PRs in the cloud.

**Specship** — Ticket-to-PR automation that starts from acceptance criteria and failing tests, with an optional auto-merge for low-risk PRs in private beta. Pricing isn't published yet. Good pick for small teams that want test-first automation.

**CoderHelm** — "Assign a GitHub issue or Jira ticket and get a pull request", plus CI fixing, PR review and alerts-to-fixes, hosted or in your own AWS account. In closed beta. Good pick for engineering teams that want an engineering-ops agent.

**Epicraft** — "Your AI developer lives inside Jira. Create a ticket. Assign the bot. Watch it write code, push a branch, and open a PR — all from Jira comments." It "posts an implementation plan, and waits for your 👍", and says "The PM is the user, not the developer". It's at the design-partner stage, with no public price. Good pick if you want PMs to turn Jira tickets into PRs.

**Butterneck** — The person who asks opens a link (or labels a Jira ticket) and chats beside a live running copy of the app while the developer's own agent makes the edit on a computer the team connects. They check the change in the preview and keep refining. Butterneck doesn't open pull requests, merge or deploy: a developer reads the conversation and the diff and decides whether it becomes a PR through the team's usual process. The agent edits the code on the connected computer, but the preview and the chat reach it through Butterneck's server, so this isn't an "everything stays local" tool. Starting from a Jira ticket isn't unique to Butterneck either: Synlets, CoderHelm, Clogless and Epicraft (which is also built for PMs) start from tickets too. The difference is what comes back: a live preview on the developer's own running app, and no pull request until a developer decides. Not the right pick if you want a tool that creates the PR for you; several above do that well.

## How to choose

- **You want a prototype to explore an idea:** Workshop, Modeinspect.
- **You want a ticket turned into a pull request automatically:** Synlets, Specship, CoderHelm (Jira's built-in options are worth a look too).
- **You want a ticket in Jira turned into a PR, with the PM as the user:** Epicraft (design-partner stage), Synlets, CoderHelm.
- **You want a cloud preview you iterate on, then a PR:** Plusma, Revyse (cloud), ronda.
- **You want a PR from a plain-English request:** ronda, Fixdog, Itera, Clogless.
- **You want the requester to publish small changes themselves:** Refinar.
- **You want better review once a PR exists:** Else.
- **You're a designer or developer who'll run the tool yourself:** Handle Studio, Layrr, Modeinspect.
- **You want the person who asked to check the change before any PR exists:** PinAppAI, Butterneck.

Prices last checked 28 October 2026, as published on each tool's site that day. Tell us if something here is out of date and we'll fix it.
`,
};
