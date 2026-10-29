import type { BlogPost } from "@/content/blog";

export const post: BlogPost = {
  slug: "tools-for-non-developers-to-change-an-existing-app",
  title: "AI tools that let non-developers change an existing web app (2026)",
  seoTitle: "AI tools that let non-developers change an existing app",
  description:
    "Compare AI tools that let PMs and designers change an existing web app: who asks, where the agent runs, PR or no PR, Jira, and published prices (Oct 2026).",
  date: "2026-10-28",
  updated: "2026-10-29",
  author: "The Butterneck team",
  tags: ["comparison", "AI tools", "AI change requests", "product teams", "non-developers"],
  cover: {
    src: "/blog/cover-tools-for-non-developers-to-change-an-existing-app.png",
    alt: "Butterneck blog cover: AI tools that let non-developers change an existing web app, compared",
    width: 1200,
    height: 630,
  },
  body: `
Last checked: 29 October 2026 (prices and quotes re-read on each tool's own pages that day, except Itera; see the note under the table). Prices and features change; each row links to the page we read. "Not on the pages we read" means we didn't find it there, not that the product lacks it.

Product managers, designers, support staff and founders increasingly want to change the app their team already runs, not build a new one. The AI tools below all work on an existing codebase, but they act at different moments: some give you a prototype, some open a pull request for you, some start after a pull request exists, and some stop before one. We make Butterneck, which is listed too; we've tried to describe every tool in its own words and say where each is the better pick.

Butterneck isn't affiliated with, endorsed by or sponsored by any other tool listed here. Product names and trademarks belong to their owners and are used only to identify the products.

## At a glance

| Tool | Who it's for (their words) | Where the work happens | What you get back | Jira | Published price |
|---|---|---|---|---|---|
| [Butterneck](https://www.butterneck.com) | Product teams: anyone who asks for a change, plus the developer who decides | The developer's agent, on a computer the team connects | A live preview the requester checks; no PR until a developer decides | Yes (label and assign a ticket) | Starter free; Pro USD 19 per person/month (20% off billed annually); one-month Pro trial |
| [ronda](https://useronda.com/) | "Marketing, design, and product" | An isolated live sandbox running your dev server | "ronda writes the code and opens a pull request. Engineering reviews and merges." | Not on the pages we read | Free $0; Starter $9/month; bring your own Anthropic key (as of Oct 29, 2026, per [ronda's pricing page](https://useronda.com/pricing)) |
| [Refinar](https://refinar.ai/en/for/product-managers) | Product managers (its /for/product-managers page) | "A copy of the live app" | "Publish it or send it to engineering"; risky changes go to a developer first as a draft PR | Not on the pages we read | "From $25 a month" for 250 credits (as of Oct 29, 2026, per [Refinar's pricing page](https://refinar.ai/en/pricing)) |
| [Fixdog](https://fix.dog/) | "PMs, designers, operators" | "Directly on their live product" | It "auto-generates a PR. Eng reviews and merges." | Not on the page we read | No public price found |
| [Clogless](https://clogless.ai/) | Product teams handing work to engineering | "A live sandbox on your real codebase", in its cloud | A pull request it opens with your Git provider | Yes (one of six ticketing tools, per its [ticket-to-PR page](https://clogless.ai/ticket-to-pull-request)) | $99/month Starter, $489/month Team, billed annually (as of Oct 29, 2026, per [Clogless's pricing page](https://clogless.ai/pricing)) |
| [Revyse](https://www.revyse.dev/) | Developers locally; in the cloud, "anyone on the team" | Your running Next.js app (local), or an isolated cloud sandbox | A diff to review (local), or a pull request it opens with a Vercel preview (cloud) | Not on the pages we read | Pilot pricing: Starter $19, Pro $49, Agency $149 a month (credits, billed by invoice; as of Oct 29, 2026, per [Revyse's pricing page](https://www.revyse.dev/pricing)) |
| [Plusma](https://plusma.ai/) | PMs and designers ("No terminal, no IDE") | "An instant preview environment" built from your GitHub repo | "A clean pull request… ready for your engineering team to review and merge" | Not on the page we read | No public price found |
| [Fei Studio](https://autonomyai.io/solutions/product-managers/) (AutonomyAI) | Product managers (its /solutions/product-managers page) | Its own app, no IDE or terminal ([compare page](https://autonomyai.io/compare/)), or from Claude Code, Cursor or another MCP client ([MCP announcement](https://autonomyai.io/product-updates/fei-studio-now-works-inside-claude-code-cursor-and-any-ai-agent/)); the change is "Rendered in the real app" | "A merge-ready pull request in your real codebase — your engineers approve every merge" | Pulls a Jira issue in by ID or URL as the instructions ([help article](https://help.autonomyai.io/articles/2675572398-do-you-integrate-jira-to-get-relevant-context)) | Priced "per task", not per seat ([compare page](https://autonomyai.io/compare/)); its pricing page wasn't reachable on 29 Oct 2026 |
| [Ovren](https://ovren.ai/) | "Anyone on the team describes the change. Your developer reviews it" | "A safe copy of your project", connected through a GitHub App | "A pull request into your own product, for your team to review", with a live preview of frontend changes; "You or your developer merge it. Ovren never does." | Not on the page we read | Free up to 5 changes; Pro "$29 one-time" for up to 50 changes; top-up balance, no subscription (as of Oct 29, 2026, per the pricing answer on [Ovren's homepage](https://ovren.ai/)) |
| [Flex](https://www.flexenv.com/product-changes) | "Product, operations, and engineering teams" | A self-hosted runner "in infrastructure your team controls", on your connected repository (a hosted cloud option is "Coming soon") | "Isolated branches and live previews"; engineers "control the merge" | Not on the pages we read (Slack, Linear and GitHub are) | Hobby free (1 member, 3 previews); Starter $60/month (£50) and Team $240/month (£200), unlimited members; your own model keys (as of Oct 29, 2026, per [Flex's pricing page](https://www.flexenv.com/pricing)) |
| [PinAppAI](https://pinappai.com/) | Solo founders who "build with v0, Claude Code, or Cursor"; agencies collecting client feedback | Reviewers pin on the live site; the developer's own agent applies changes | Edits your agent applies, which reviewers approve or reject on a generated /changes/ page | Not on the pages we read | $0 / $9 / $15 per seat (Team, 2-seat min); reviewers free (as of Oct 29, 2026, per [PinAppAI's pricing page](https://pinappai.com/pricing/)) |
| [Handle Studio](https://gethandle.ai/studio) | Designers, design engineers, solo founders | A Mac app (macOS 13+ on Apple Silicon) with your Claude Code, Codex or Rovo Dev agent, on your local repos | "A clean commit to a remote branch for your team to review" | Not on the pages we read | Free and open source |
| [Layrr](https://narnia.sh/layrr/) | Developers running a local web app | A proxy in front of your local dev server, using Claude Code, Codex CLI or Gemini (via Pi) | It "commits successful edits with a [layrr] prefix" | Not on the page we read | Free, open source (MIT, per its [GitHub repo](https://github.com/narnia-sh/layrr)) |
| [PulseDev](https://pulsedev.app/) | People running a site on their own machine ("On any site you run locally") | A macOS app on your running local site, using Claude Code, Codex, Gemini CLI or OpenCode | Source edits that touch your files only after you "approve the diff" | Not on the page we read | Free to start; Pro $18/month, or a $12/month launch price ("Lock it in before Nov 3"); a separate Founder Lifetime offer is $149 once for the first 200 buyers (as of Oct 29, 2026, per the pricing section on [PulseDev's homepage](https://pulsedev.app/)) |
| [Modeinspect](https://modeinspect.com/) | Design engineers and product designers | Cloud design canvas connected to your codebase | "Every change opens as a normal pull request on a branch" | Not on the pages we read | Hobby $0; Pro $20/month per person (as of Oct 29, 2026, per [Modeinspect's pricing page](https://modeinspect.com/pricing)) |
| [Workshop](https://docs.workshop.ai/solutions/prototyping) | PMs, designers, founders, researchers | Cloud, or Desktop with your codebase via GitHub | "A clickable prototype… with mocked data" | Not in the docs index | $0 / $20 / $50 / $200 a month (credits; as of Oct 29, 2026, per [Workshop's pricing page](https://workshop.ai/pricing)) |
| [Else](https://www.somethingelse.ai/) | Teams reviewing a PR (engineer, QA, designer, PM) | A hosted preview environment running your full stack | Edits in the preview of a PR an engineer already opened | Not on the homepage | No public price ("Start for free") |
| [Synlets](https://synlets.com/) | PMs, founders, engineering leads | Its cloud, with your repo cloned at runtime | "A reviewable pull request"; "nothing is merged without your approval" | Yes (Jira and Asana integration) | $79–$999/month (credits), no per-seat fees; free tier (as of Oct 29, 2026, per the pricing section on [Synlets' homepage](https://synlets.com/)) |
| [Specship](https://specship.dev/) | Founders and small teams | Connected GitHub repo | Acceptance criteria, failing tests, code and "review-ready pull requests"; optional auto-merge (beta) | Planned or in beta (GitHub and ClickUp today) | "Pricing TBD" (waitlist) |
| [CoderHelm](https://coderhelm.com/) | Engineering teams on GitHub, Jira and AWS | Hosted, or in your own AWS account | A pull request on a \`coderhelm/\` branch; auto-merge off by default | Yes (label or assign) | Closed beta; bring your own Anthropic key |
| [Epicraft](https://www.epicraft.dev/) | "The PM is the user, not the developer" | From a Jira ticket assigned to its bot | A branch and a pull request; "You review the PR in GitHub, approve, merge" | Yes (assign the ticket to its bot) | No public price found |
| [CodeHerder](https://codeherder.com/for-product-teams) | Product people "whose engineers are booked on roadmap work" | Agents on a device you connect (your machine, or your AWS account), using a coding agent CLI signed in there | Its agents plan, code, review and merge; "No stage waits for a person by default" (approval gates optional) | Not on the pages we read | Free $0; Starter $19/month; Pro $49/month (concurrent agents, not seats), shown as "indicative and not yet billed"; hosted service invite-only (as of Oct 29, 2026, per [CodeHerder's pricing page](https://codeherder.com/pricing)) |

Itera is covered below and in our [Itera alternative](/blog/itera-alternative) post; we couldn't re-check its site on 29 Oct 2026, so it isn't in the table.

## The tools, one by one

**ronda** — "Small changes shouldn't wait on engineering." Marketing, design and product describe the change in plain English, it runs in an isolated live sandbox on your dev server, and "ronda writes the code and opens a pull request. Engineering reviews and merges." You bring your own Anthropic key. Good pick if you want a pull request from a plain-English request on a small budget.

**Refinar** — "Describe a change to your product, watch it built on a copy of the live app, then publish it or send it to engineering. No terminal or GitHub account." Risky changes go to a developer first as a draft PR. The clearest difference from Butterneck: Refinar lets the person who asked publish small changes themselves. Good pick if that is what you want.

**Fixdog** — It "lets PMs, designers, operators make changes directly on their live product and auto-generates a PR. Eng reviews and merges." We couldn't find a public price. Good pick if you want an auto-generated PR from a change made on the live product.

**Itera** — (From its site as we read it on 28 October 2026; we couldn't reach it on 29 October.) Lets the team "propose changes to your live web product through chat" and "submit it for engineering review" as AI-generated pull requests. Builders pay per seat; "Collaborators are always free". Good pick for teams that want a PR from a chat on the live product. We compare it in more detail in our [Itera alternative](/blog/itera-alternative) post.

**Clogless** — "A live sandbox on your real codebase. Ship changes as pull requests that engineering reviews." It runs in its own cloud sandbox and connects to six ticketing tools, Jira included. Good pick if you want a cloud workspace that turns tickets into PRs. More in our [Clogless alternative](/blog/clogless-alternative) post.

**Revyse** — "Point at any part of your running app and say what should change. Revyse plans it, writes the code, runs your checks and hands you a diff to review." Locally it's a dev-server overlay you start with \`npx revyse dev\`; in its cloud mode, "Anyone on the team can request a change from the dashboard", and Revyse "opens a pull request and checks the preview your Vercel integration builds for it." It supports Next.js 14–16 (Vite and CRA are "experimental") and refuses backend, auth, payments and database-schema changes. Good pick for Next.js teams that want a reviewed diff or PR.

**Plusma** — "Describe a change, preview it live, iterate until it's right, and hand your team a clean PR." It connects to your GitHub repo and "Every change spins up an instant preview environment" in its cloud. Good pick for PMs and designers who want to iterate on a cloud preview and then hand engineering a PR.

**Fei Studio (AutonomyAI)** — "Describe a change and it opens a merge-ready pull request in your real codebase — your engineers approve every merge." A PM describes the change in plain language, a screenshot or a Figma file; it builds it with your own components and design tokens, renders it, and opens a pull request. Since July 2026 a PM can also start a task from Claude Code, Cursor or another MCP client and check it on a link to its live sandbox. It can pull in a Jira issue by ID or URL as the instructions, and it's priced per task rather than per seat. Good pick for product teams with a design system who want PM requests to arrive as pull requests.

**Ovren** — "Ship Coding Tasks Without Waiting on Developers." A developer installs its GitHub App once; then anyone on the team describes a change, Ovren works on "a safe copy of your project", shows "a live preview of every frontend change", and opens a pull request "into the branch your team already merges into", with a report of what it changed. You pay per change from a balance you top up. Good pick if you want occasional changes delivered as PRs without a subscription.

**Flex** — "Give every teammate an AI software developer." A request from Slack, Linear or Flex itself becomes an isolated branch and a live preview, and engineers "review the code, control the merge, and decide what reaches production." Previews run on a self-hosted runner in infrastructure your team controls, using your own model keys. It also builds internal tools. Good pick for a team that wants previews on its own infrastructure and a pull-request flow.

**PinAppAI** — A "visual change-request layer for AI-built sites". Reviewers drop pins on the live site, the developer's agent applies them, and reviewers approve or reject on a generated page. It's the closest to Butterneck in spirit: reviewers are free on every plan, and the developer's own agent applies the changes. Good pick if you're a solo builder collecting client feedback on a deployed site.

**Handle Studio** — "Design directly in production code." It's free, open source, needs no account, and works with the agents designers and developers already use. The trade-off is that the person making the change installs and runs it (Studio needs macOS 13+ on Apple Silicon). Good pick for designers who are comfortable running a local repo.

**Layrr** — "Point, click, and edit your running web app." A free, MIT-licensed proxy in front of your local dev server that uses Claude Code, Codex CLI or Gemini and "commits successful edits with a [layrr] prefix". Whoever runs it needs the repo, and its last release was in May 2026. Good pick for developers who want a free visual overlay on their own machine.

**PulseDev** — "Point at your site. Approve the fix." Click an element on your running site, say what's wrong, and Claude Code, Codex, Gemini or OpenCode edits the source; "nothing touches your files until you approve the diff". It uses the agent plan you already pay for and "Runs on your machine, no PulseDev cloud". Like Layrr, whoever uses it runs the project locally. Pro is $18/month. As of 29 October 2026, PulseDev's homepage offered a $12/month launch price to anyone signing up "before Nov 3"; check its site for the current price. Good pick for a technical founder or designer who wants a visual fix loop on their own Mac.

**Modeinspect** — "A design canvas with your live product, components and tokens built in", aimed at "the last 20%" after vibe coding. It runs in the cloud, so no local dev machine is needed, and every change becomes a pull request. Good pick for design engineers polishing UI.

**Workshop** — "Go from idea to clickable prototype in minutes." Its Desktop app can pull in your codebase, but the output is a prototype with mocked data, which engineering "can pick up where Workshop left off". Good pick for exploring an idea before committing to a real change.

**Else** — "Preview environments with AI editing." An engineer opens a PR, Else spins up a live environment of the full stack, and PMs, QA and designers fix things in place. It works after a PR exists, so it can sit alongside tools that work before one. Good pick for teams that want richer PR review.

**Synlets** — "Tickets in. Pull requests out." Assign a ticket and its agent writes the change and opens a PR, then iterates on review comments. Credit-based plans with no per-seat fees. Good pick if you want tickets turned straight into PRs in the cloud.

**Specship** — Ticket-to-PR automation that starts from acceptance criteria and failing tests, with an optional auto-merge for low-risk PRs in private beta. Pricing isn't published yet. Good pick for small teams that want test-first automation.

**CoderHelm** — "Assign a GitHub issue or Jira ticket and get a pull request", plus CI fixing, PR review and alerts-to-fixes, hosted or in your own AWS account. In closed beta. Good pick for engineering teams that want an engineering-ops agent.

**Epicraft** — "Your AI developer lives inside Jira. Create a ticket. Assign the bot. Watch it write code, push a branch, and open a PR — all from Jira comments." It "posts an implementation plan, and waits for your 👍", and says "The PM is the user, not the developer". We couldn't find a public price. Good pick if you want PMs to turn Jira tickets into PRs.

**CodeHerder** — An engineer connects "a device and a repository" once, then product people file tasks and its agents plan, build, review and merge them, each in its own git worktree, on a machine you already have or in your AWS account. By default, "no person approves the plan, the code or the result"; teams can add approval gates or a required human approval on the git host. Plans are priced by concurrent agents, not seats. Good pick if you want agents to take a task all the way to merge on your own hardware.

**Butterneck** — The person who asks opens a link (or labels a Jira ticket and assigns it) and chats beside a live running copy of the app while the developer's own agent makes the edit on a computer the team connects. They check the change in the preview and keep refining. Butterneck doesn't open pull requests, merge or deploy: a developer reads the conversation and the diff and decides whether it becomes a PR through the team's usual process. The agent edits the files on the connected computer, the code context it reads goes to that agent's AI provider, and the preview and the chat reach it through Butterneck's servers, so this isn't an "everything stays local" tool. Starting from a Jira ticket isn't unique to Butterneck either: Synlets, CoderHelm, Clogless and Epicraft (which is also built for PMs) start from tickets too, and CodeHerder also runs agents on a machine the team connects. Since 28 October 2026, GitHub's own [Copilot Automations](https://github.blog/changelog/2026-10-28-new-tools-triggers-and-cost-controls-for-copilot-automations) can also start when an issue is labeled or assigned. The difference is what comes back: a live preview on the developer's own running app, and no pull request until a developer decides. The person asking doesn't install anything or need the project on their own computer: the developer's computer runs the app and the agent, and the requester only needs the link. Not the right pick if you want a tool that creates the PR for you; several above do that well.

## How to choose

- **You want a prototype to explore an idea:** Workshop, Modeinspect.
- **You want a ticket turned into a pull request automatically:** Synlets, Specship, CoderHelm, CodeHerder (Jira's built-in options are worth a look too).
- **You want a ticket in Jira turned into a PR, with the PM as the user:** Epicraft, Synlets, CoderHelm.
- **You want a cloud preview you iterate on, then a PR:** Plusma, Revyse (cloud), ronda, Ovren, Flex.
- **You want a PR from a plain-English request:** ronda, Fixdog, Itera, Clogless.
- **You want the requester to publish small changes themselves:** Refinar.
- **You want better review once a PR exists:** Else.
- **You're a designer or developer who'll run the tool yourself, with your own coding agent:** Handle Studio, Layrr, PulseDev, Modeinspect.
- **You want the person who asked to check the change before any PR exists, without installing anything:** PinAppAI, Butterneck.

Prices last checked 29 October 2026, as published on each tool's own pages that day. Tell us if something here is out of date and we'll fix it.

## FAQ

### Is there an AI coding agent for people who don't code?

Yes, several. Most of the tools above let a PM, designer or operator describe a change in plain language and have a coding agent make it in the team's real codebase. They differ in what comes back: a prototype (Workshop), a pull request (ronda, Fixdog, Itera as of 28 Oct, Clogless, Synlets, Ovren, Flex), a merged change (CodeHerder, when no approval gate is on), or a live preview the person who asked checks before a developer decides (Butterneck, PinAppAI).

### Can a non-developer change an existing app without breaking it?

Keep a developer in the decision. Look for three things: the change is shown on a preview before anything ships, a developer reviews it, and risky areas like login, billing and data stay with engineering. Our [AI change request policy template](/blog/ai-change-request-policy-template) lists what to fence off.

### Can I change my existing web app with AI without a developer?

On your own computer, yes, if you can run the project yourself: tools like Layrr and PulseDev put a point-and-edit overlay on your local dev server, and a coding agent such as Claude Code edits the source. If the app belongs to a team, someone still decides what ships. Tools like ronda and Revyse (in its cloud mode) turn your request into a pull request for the team to review. In Butterneck you don't need the project on your computer: you ask on a live copy of the app, the developer's own agent makes the change on a computer the team connects, and a developer decides what goes live. Butterneck never opens a pull request, merges or deploys.

### Does Butterneck open a pull request?

No. Butterneck never opens a pull request, merges or deploys. The person who asked checks the change on a live preview, and a developer reviews the diff and ships it the team's usual way.
`,
};
