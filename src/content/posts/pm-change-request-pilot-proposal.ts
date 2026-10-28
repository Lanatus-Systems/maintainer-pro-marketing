import type { BlogPost } from "@/content/blog";

export const post: BlogPost = {
  slug: "pm-change-request-pilot-proposal",
  title: "A 4-week pilot to let PMs request live changes: the proposal to send your engineering lead",
  description:
    "A copyable one-page proposal for a 4-week pilot where PMs request small product changes on a live preview and one developer decides what ships. Scope, guardrails, metrics to track and decision criteria.",
  date: "2026-10-28",
  author: "The Butterneck team",
  tags: ["PM pilot proposal", "AI change requests", "AI for product managers", "engineering leads", "product teams"],
  cover: {
    src: "/blog/cover-pm-change-request-pilot-proposal.png",
    alt: "Butterneck blog cover: A 4-week pilot to let PMs request live changes. Week 1 start small, week 2 open the scope, week 3 normal volume, week 4 decide",
    width: 1200,
    height: 630,
  },
  body: `
Your team has a backlog of small changes: a button label, a confusing empty state, an error message nobody likes. Each one is quick to do and slow to get done, because it waits in the same queue as everything else engineering owns. You want to try letting PMs ask an AI coding agent for these changes directly. Your engineering lead wants to know what could go wrong.

This post gives you a one-page pilot proposal you can copy, fill in and send. It runs for four weeks, keeps a developer in charge of what ships, fences off the risky parts of the codebase, and says up front what you will measure and how you will decide whether to continue. We make Butterneck, a tool for exactly this kind of request, so the proposal describes that flow. The structure works with any setup where a PM asks and a developer decides.

## Why propose a pilot, not a policy

"Let PMs change the product" sounds like a big decision. A four-week pilot with a small scope is a small one. It asks your engineering lead to agree to something they can stop at any time, with one named developer reviewing every change.

A pilot also answers the questions a policy can't: How long does the developer actually spend per change? How many requests turn out to be fine as asked? How often does something need to be undone? You don't know these numbers for your team yet. Nobody does. The pilot is how you find out.

## This shape isn't just ours

VirtusLab's Visdom guide on [non-coder contributors via agent interfaces](https://visdom-maturity-matrix.virtuslab.com/guides/organization/non-coder-contributors-via-agent-interfaces) describes a head of engineering whose PM has a backlog of UI and copy changes waiting on engineering. Its advice: "design a pilot for one specific task type: UI copy changes", and "run the pilot for four weeks with the PM making changes that a developer then reviews before merge." If the developer reviews are mostly "looks good", it suggests the team "can propose reducing the review requirement for this specific task type."

The same guide says to start narrow ("a PM interface for UI copy changes"), that the non-coder's verification "cannot be 'read the code'" but can be seeing "the change in a staging environment", and that governance should be "proportional to risk, not uniform". The guide is independent of Butterneck and doesn't mention it. It also frames this as an advanced capability that depends on good context and verification being in place, which is one more reason to start with a small, supervised pilot.

## The one-page proposal

Copy everything in the box, replace the parts in [brackets], and send it to your engineering lead. A plain-text version is easy to paste into an email, a doc or a Jira ticket.

\`\`\`
PILOT PROPOSAL: PMs request small product changes on a live preview (4 weeks)

To: [engineering lead]
From: [PM name]
Dates: [start date] to [end date, 4 weeks later]

GOAL
Find out whether small, well-defined product changes can go from "ask" to
"ready for a developer to decide" faster, without adding risk or review load.
At the end of week 4 we decide together: stop, keep going as is, or widen it.

WHO
- Requesters: [1-3 named PMs / designers]
- Developer reviewer: [one named developer]. Decides what ships. Can say no
  to any change, any time, without explaining.
- Owner of this pilot: [PM name]

IN SCOPE (requesters can ask directly)
- Copy: headings, body text, help text, error and success messages
- Labels: buttons, menu items, form fields, tooltips
- Empty states: what a page says and shows when there is no data yet
- Small UI tweaks: spacing, alignment, colors from the existing palette,
  showing or hiding an existing element, mobile layout fixes

ENGINEERING-ONLY ZONE (not in the pilot; normal ticket to engineering)
- Authentication and login
- Permissions and who can see what
- Billing, prices that are charged, payments and checkout
- Data models, database changes, migrations, deleting data
- Secrets, API keys, environment settings
- Anything legal or compliance-related that needs sign-off

HOW A REQUEST WORKS
1. The requester asks in a chat on a live preview of the app, or labels a
   Jira ticket for it.
2. A coding agent makes the change on the developer's computer, using the
   team's existing AI coding plan.
3. The requester checks the result on the live preview and refines it in
   plain words until it is right.
4. The developer reviewer reads the conversation, looks at the change, and
   decides: publish it the usual way, or drop it. Nothing ships without
   the developer.

GUARDRAILS
- One change per request.
- The agent works in the project folder we connect. Other folders can
  be blocked.
- Secret settings files (.env) are on an ignore list the agent is told to
  stay out of. This is a guardrail, not a hard block, so no production
  secrets on the pilot computer.
- A run can be stopped and its file changes reverted.
- Only named requesters can send requests during the pilot.
- Anything that touches the engineering-only zone is dropped and becomes a
  normal ticket.
- The developer reviewer can pause the pilot at any time.

CADENCE (4 weeks)
- Week 1: set up, 3-5 small copy or label changes, daily check-in (15 min).
- Week 2: open the full in-scope list; weekly 30-min review.
- Week 3: normal volume; weekly 30-min review; adjust the scope list.
- Week 4: normal volume; final review meeting and decision.

WHAT WE WILL MEASURE (to track, not targets or promised results)
- Time from ask to preview: request sent -> requester sees the change on
  the preview.
- Developer minutes per change: time the reviewer spends reading,
  checking and publishing (or dropping) each change.
- Shipped vs dropped: share of requests that were published, and why the
  others were dropped.
- Reverts: changes that were published and later had to be undone.
- Baseline for comparison: the same numbers for 5-10 similar changes from
  the last two months, done the usual way (as far as we can reconstruct).

DECISION AT THE END OF WEEK 4
- Stop if: any change in the engineering-only zone shipped; or the
  developer reviewer says review took more time than doing the changes
  themselves; or reverts were higher than our usual rate.
- Keep going as is if: the numbers are mixed but the reviewer and
  requesters want to continue.
- Widen if: [criteria we agree before week 1, e.g. most changes shipped
  with little rework and no reverts]. Widening means more requesters or
  more change types, one at a time.

WHAT WE NEED
- One developer computer with the project running, connected for the pilot.
- [Tool] seats for the requesters and the reviewer.
- 15 minutes a day in week 1 and 30 minutes a week after that from the
  developer reviewer.
\`\`\`

## How to fill it in

**Goal.** Keep it to one or two sentences. The goal is to learn something, not to prove the idea works. "Find out whether" is more convincing to an engineering lead than "show that".

**Who.** Name real people. One developer reviewer, not "the team". A pilot with a shared reviewer has no owner, and changes sit. Start with one requester if you can; add a second in week 2 if the first week goes well.

**In scope.** Pull the list from your real backlog. Go through the last two months of tickets and pick the ones that were copy, labels, empty states or small layout fixes. If a ticket on the list would make your engineering lead nervous, move it to the engineering-only zone. The point is a list both of you agree on before week 1.

**Engineering-only zone.** Be generous here. It costs you nothing to leave something out of a pilot, and it makes the yes easier. If your team already has a written list, reuse it; our [AI change request policy template](/blog/ai-change-request-policy-template) has one you can start from.

**How a request works.** This is the part that makes it safe: the requester checks the change on a live preview first, and the developer decides what ships. Nothing reaches production because a PM asked for it.

**Guardrails.** Write down only what is actually true of your setup. If you use Butterneck, the guardrails in the template are ones the product has (see below). If you use something else, check each line.

**What we will measure.** These are the numbers to track, not results to expect. Don't put targets on them in the proposal. Agree on what "good enough to continue" looks like in the decision section instead.

## The week-by-week plan

### Week 1: set up and start small

- Connect one developer computer with the project running, and give the requesters access.
- Write down the baseline: pick 5-10 similar changes from the last two months and note, as best you can, how long each took from ask to shipped.
- Send 3-5 copy or label changes only. One change per request.
- Daily 15-minute check-in between the requester and the developer reviewer: what was unclear, what took time, what to change in how requests are written.

### Week 2: open the full scope

- Requests can now cover the whole in-scope list: copy, labels, empty states, small UI tweaks.
- Start logging every request in a simple table: date, what was asked, time to preview, developer minutes, shipped or dropped (and why).
- First 30-minute weekly review. Move anything that felt risky to the engineering-only zone.

### Week 3: normal volume

- Requesters ask for changes as they come up, not saved for the pilot.
- If you use Jira, try a few requests that start from a labeled ticket instead of the chat.
- Weekly review: look at the dropped requests. Were they out of scope, unclear, or did the agent get them wrong? Each has a different fix.

### Week 4: decide

- Keep going at normal volume.
- Before the final meeting, fill in the numbers for all four weeks next to the baseline.
- Final review: the developer reviewer speaks first. Then decide: stop, keep going as is, or widen.

## What to measure, and how

None of these numbers come from us, and we aren't giving you numbers to expect. They're what you track during the pilot so the decision at the end is based on your team's data.

| Metric | What it is | How to capture it |
|---|---|---|
| Time from ask to preview | From the moment the request is sent to the moment the requester sees the change on the preview. | Timestamps in the chat or on the ticket. |
| Developer minutes per change | Time the developer reviewer spends reading the conversation, checking the change, and publishing or dropping it. | The reviewer notes it per change. Rough is fine. |
| Shipped vs dropped | Share of requests that were published, and the reason for each one that wasn't. | The request log. |
| Reverts | Published changes that later had to be undone. | The request log, plus your normal release history. |

Two cautions. First, a four-week pilot with a few people is a small sample, so treat the numbers as a direction, not proof. Second, the baseline is usually rough, since most teams don't record how long a small ticket waited. Say so in the final review rather than presenting it as exact.

## Exit and decision criteria

Agree on these before week 1 and put them in the proposal. Deciding the rules after you've seen the numbers turns the final meeting into a debate.

- **Stop** if any change in the engineering-only zone shipped, if the developer reviewer says reviewing took more time than making the changes themselves, or if reverts were higher than your usual rate.
- **Keep going as is** if the numbers are mixed but the reviewer and requesters both want to continue. Run another four weeks with the same scope.
- **Widen** if the criteria you agreed up front are met. Widen one thing at a time: one more requester, or one more type of change, not both.

The developer reviewer can pause the pilot at any point, for any reason. Say that in the proposal. It is the line that gets most engineering leads to yes.

## How the request flow works in Butterneck

If you run the pilot with Butterneck, this is what happens. We checked each point against the product code.

- **Requests come from a chat on a live preview, or from Jira.** A requester types the change into a chat next to a live preview of the running app. Or they add the label \`butterneck\` to a Jira ticket and assign it to a teammate whose Jira account is mapped to a computer that has the project; see the [Jira integration](/integrations/jira).
- **The agent runs on a developer's computer.** It uses the Claude Code, Cursor or Antigravity CLI already signed in there, on your team's existing plan (team, enterprise or API plans recommended). It sends code context to its AI provider, as it does in normal use, and chat messages and preview traffic go through Butterneck's server.
- **The requester checks the change on the preview** and refines it in plain words.
- **A developer decides what ships.** They read the conversation, look at the change, and publish it the way the team already does, or drop it. Butterneck never opens a pull request, never merges and never deploys.

The guardrails in the proposal map to the product:

- **Folders.** The agent works in the connected project folder, and you can block other folders.
- **Secrets.** \`.env\` files are on an ignore list the agent is told to stay out of. That's a guardrail, not a hard block, so keep production secrets off the pilot computer.
- **Stop and undo.** A run can be stopped, and its file changes reverted.
- **Who can ask.** You choose who can send requests: a list of people, or anyone with the link. For a pilot, use the list.
- **Developer replies.** A developer can reply in the chat without starting the agent.

For writing the requests themselves, give your requesters [how to write a change request for an AI coding agent](/blog/how-to-write-a-change-request-for-ai). Its five-line template (where, now, want, keep, check) makes requests easier to review, and the **Check** line doubles as the requester's sign-off on the preview.

On cost: the Starter plan is free for one developer and one requester, which covers a one-PM pilot. More requesters need Pro seats. AI usage runs on your team's own coding assistant plan, not on Butterneck. See [pricing](/pricing).

## FAQ

### How long should a PM change request pilot run?

Four weeks is enough to get past setup, see normal volume for two or three weeks, and still be short enough that an engineering lead will agree to it. VirtusLab's Visdom guide suggests the same length for a UI copy pilot.

### What should be in scope for a PM pilot?

Copy, labels, empty states and small UI tweaks, taken from your real backlog. Leave out authentication, permissions, billing and payments, data models and anything with secrets. Those stay engineering-only.

### Who reviews the changes during the pilot?

One named developer reviews every change and decides what ships. They can drop any change, and pause the pilot, at any time.

### What should we measure?

Time from ask to preview, developer minutes per change, the share of changes shipped versus dropped, and reverts. Compare them with a rough baseline from similar past changes. These are things to track, not targets.

### What if the pilot doesn't work?

Then you stop, and you have data on why: unclear requests, too much review time, or changes that needed undoing. Agree on the stop criteria before week 1 so the decision is easy.

### Does the PM need to know how to code?

No. The requester describes the change and checks it on a live preview. The developer reviewer looks at the code.

## Try it

[Book a 30-minute demo](https://calendar.app.google/p2McAaz4ZwXBiG5m9) and bring the in-scope list from your backlog; we'll run one of the changes on a live copy. Or see [pricing](/pricing) and start on the free plan.
`,
};
