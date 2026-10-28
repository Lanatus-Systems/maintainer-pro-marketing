export const EXAMPLES = [
  {
    title: "“Make the button say Book a call.”",
    today: [
      "The product manager writes that in Slack.",
      "The developer asks which page. A screenshot comes back.",
      "Then someone opens the project, finds the button, and sends a link to check.",
    ],
    after: [
      "The product manager types that sentence on a live copy of the product.",
      "The AI finds the button and changes it.",
      "The developer opens the page and decides whether it goes live.",
    ],
  },
  {
    title: "A ticket full of comments and files",
    today: [
      "The ticket has a description, a pile of comments, a spreadsheet, and screenshots.",
      "A developer reads all of it and figures out which comment is the real request.",
      "Only then does anyone open the project.",
    ],
    after: [
      "Add the label butterneck and assign the ticket.",
      "Jira starts the chat. The AI reads the ticket and the files, then makes the change.",
      "The developer reviews it and decides whether it goes live.",
    ],
  },
] as const;

export const STEPS = [
  {
    n: "01",
    title: "Connect the product",
    lines: [
      "Create a workspace.",
      "A developer installs a small connector on a computer that already has the project. That computer needs Node.js 22 or newer, and a coding assistant already signed in: Cursor, Claude Code, or Antigravity (team, enterprise or API plans recommended).",
      "They point it at the project and start the app. Everyone else then opens a live copy.",
    ],
  },
  {
    n: "02",
    title: "Hand the request to the AI",
    lines: [
      "People on the product team describe the change in chat, on that live copy.",
      "Or add the label butterneck to a Jira ticket and assign it.",
      "That ticket starts the chat on its own.",
    ],
  },
  {
    n: "03",
    title: "You decide what goes live",
    lines: [
      "Read the conversation and look at the app.",
      "Publish it the way you already do.",
      "If the change is wrong, leave it. Nothing goes live until you say so.",
    ],
  },
] as const;

export const JIRA = [
  {
    title: "Connect Jira once",
    lines: [
      "Sign in with Jira Cloud and choose your site.",
      "Link a Jira project to your app.",
      "Paste Butterneck’s address into Jira, so Jira can tell Butterneck when a ticket is created or updated.",
      "Map each developer’s Jira account to their computer.",
    ],
  },
  {
    title: "A labeled ticket starts the chat",
    lines: [
      "Add the label butterneck.",
      "Assign it to a teammate whose Jira account is mapped to a computer that has the project.",
      "If the assignee isn’t mapped, nothing starts. The Jira page in Butterneck shows why.",
      "Butterneck opens a private copy of the project, named after the ticket.",
      "The title, description, comments, and attached files become the request.",
    ],
  },
  {
    title: "The link goes back on the ticket",
    lines: [
      "When the AI is done, a short note and a link to the preview are added to the ticket.",
      "The full conversation stays on the live copy.",
      "Updating that same ticket later does not open a second copy.",
    ],
  },
] as const;

export const WHY = [
  {
    title: "AI can already make the change",
    lines: ["It can edit a real project, working with your team."],
  },
  {
    title: "The slow part is the back-and-forth",
    lines: [
      "Which page. Which screenshot. Which comment is the real one.",
      "Passing that between the product manager, the AI, and the project takes longer than the change.",
    ],
  },
  {
    title: "That is the time this saves",
    lines: [
      "The change itself is usually small.",
      "What takes the week is getting the request to the project.",
    ],
  },
] as const;

export const DIFFERENCE = [
  {
    title: "AI in the code editor",
    lines: ["A developer still has to open the ticket and paste it in."],
  },
  {
    title: "A ticket sitting in Jira",
    lines: ["A developer still has to carry that ticket over to the project."],
  },
  {
    title: "Butterneck",
    lines: [
      "A product manager asks on the live product, or a labeled Jira ticket starts the chat.",
      "The AI edits the project.",
      "A developer publishes it.",
    ],
  },
] as const;

export const ACCESS = [
  {
    title: "You choose who can ask",
    body: "The link opens the preview. You decide whose message starts the AI: a list of people, or anyone with the link.",
  },
  {
    title: "Looking does not create an account",
    body: "Someone can open the preview. They can send a message only if you already allow them.",
  },
  {
    title: "They can ask to be let in",
    body: "If the link is closed, a visitor asks for access. You allow it or decline it.",
  },
] as const;

export const FAQS = [
  {
    q: "Who publishes the change?",
    lines: [
      "Someone on your team.",
      "The AI changes only the project you connected, then stops.",
      "If the change is wrong, it stays on that computer. It does not go live.",
    ],
  },
  {
    q: "Who can talk to the AI?",
    lines: [
      "You choose: a list of people, or anyone with the link.",
      "If the link is closed, a visitor can ask for access. You allow it or decline it.",
      "A reply from a developer does not change any files.",
    ],
  },
  {
    q: "Can a Jira ticket start the chat?",
    lines: [
      "Connect Jira Cloud, give Jira Butterneck’s address so it can send ticket updates, and map each developer’s Jira account to their computer.",
      "Add the label butterneck, and assign the ticket to a teammate whose Jira account is mapped to a computer that has the project.",
      "If the assignee isn’t mapped, nothing starts. The Jira page in Butterneck shows why.",
      "A private copy opens. The title, description, comments, and attached files become the request.",
      "When the AI is done, a short note and a link go back on the ticket.",
      "Updating that same ticket later does not open a second copy.",
      "You can still paste a ticket number into an existing chat to load that ticket.",
    ],
  },
  {
    q: "Where do the file changes happen?",
    lines: [
      "On the computer you connected, inside the project you chose.",
      "You can also block other folders.",
      "Secret settings files (.env) are on an ignore list the AI is told to stay out of. It is an instruction, not a hard block, so keep production secrets off that computer.",
    ],
  },
  {
    q: "Why not use a tool that opens the pull request for you?",
    lines: [
      "Butterneck runs on a developer’s computer, where the project already runs. There is no new cloud environment to set up and no need to copy secrets into a hosted machine.",
      "The person who asked sees the change on a live preview. Then a developer decides what happens next.",
      "Butterneck itself never opens a pull request, merges, or deploys.",
      "A tool that opens pull requests can suit teams who want a PR as the hand-off. Butterneck suits teams who want a developer to decide before anything becomes a PR.",
    ],
  },
] as const;

export const NAV = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#why-now", label: "Why now" },
  { href: "/#jira", label: "Jira" },
  { href: "/pricing", label: "Pricing" },
  { href: "/integrations/jira", label: "Jira integration" },
  { href: "/#faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
] as const;

export const FOOTER_NAV = [
  { href: "/#example", label: "Examples" },
  { href: "/#why-now", label: "Why now" },
  { href: "/#difference", label: "The difference" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#jira", label: "Jira" },
  { href: "/#access", label: "Access" },
  { href: "/#safety", label: "Your call" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
  { href: "/jira/privacy", label: "Jira privacy" },
  { href: "/jira/terms", label: "Jira terms" },
] as const;
