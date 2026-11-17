/** Bump SECURITY_UPDATED when /security copy changes. */
export const SECURITY_UPDATED = "2026-11-17";

export const SECURITY = {
  path: "/security",
  title: "Security",
  seoTitle: "Security for AI change requests: where edits run",
  description:
    "Where an AI change request is edited (on the connected computer), which folder it can touch, what is on the ignore list, who can send a request, and who sees the project.",
  lead: "A reviewer usually asks six things. Here they are.",
  definition:
    "In short: Butterneck runs the coding assistant on your connected computer and tells it to stay in the folder you pick and to leave .env files alone. These are guardrails, not hard blocks. It does not copy the repository to its servers to edit it, and it does not merge or deploy. Your team publishes.",
  facts: [
    {
      title: "The bridge runs on your computer",
      paragraphs: [
        "You pair a computer from the workspace. The bridge stays on that computer. It starts the project there, and the edit happens there.",
        "It keeps an outbound connection to Butterneck, which relays the share link and the chat. It updates itself from Butterneck's server.",
      ],
    },
    {
      title: "It edits the project you connected",
      paragraphs: [
        "You pick the folder. The assistant is limited to that folder, or to the folders you attach as one project. It is told not to write anywhere else.",
      ],
    },
    {
      title: "Secret settings are on an ignore list",
      paragraphs: [
        "Files named .env are on the ignore list, including .env.local and the same names in subfolders. You can add more paths. The assistant is told to refuse a request that needs one of them.",
        "That assistant is the coding tool already signed in on the computer. Nobody is at its terminal to click allow, so Butterneck starts it with its own permission prompts turned off: Claude Code and Antigravity with --dangerously-skip-permissions, Cursor with --trust and --force. So the folder limit and the ignore list are instructions to the assistant, not a hard block. Butterneck does not put a separate locked-down operating system around it. Connect a development computer that has no production secrets.",
      ],
    },
    {
      title: "You publish",
      paragraphs: [
        "Butterneck does not merge and does not deploy. When the preview looks right, your team publishes the way you already do. Until then the change isn't published.",
      ],
    },
    {
      title: "Who can send a request",
      paragraphs: [
        "Each connected computer starts with a chosen list of people who can send requests. The person assigned to that computer is always on it. \"Anyone with the link\" is a setting you turn on.",
        "The share link is unlisted, not private. Anyone who has it can open the preview. Every request runs the coding assistant on your computer, so keep the list unless that computer holds nothing you would mind.",
      ],
    },
    {
      title: "The coding assistant sees the project",
      paragraphs: [
        "The edit is made by Cursor, Claude Code, or Antigravity, whichever is signed in on that computer. That provider receives what the assistant reads in order to make the change.",
        "Butterneck does not copy the repository to its servers to edit it. The preview is the app running on your computer. The share link relays that page so someone else can open it. Chat messages and attachments are stored in the workspace.",
      ],
    },
  ],
  faqs: [
    {
      q: "Does Butterneck upload my code to its servers?",
      lines: [
        "Butterneck does not copy the repository to its servers to edit it. The edit happens on the connected computer, made by the coding assistant signed in there (Cursor, Claude Code, or Antigravity).",
        "That provider receives what the assistant reads in order to make the change. The preview is relayed through Butterneck so the share link works, and chat messages and attachments are stored in the workspace.",
      ],
    },
    {
      q: "Can the AI read my .env files?",
      lines: [
        "Files named .env are on an ignore list, including .env.local and the same names in subfolders, and the assistant is told to refuse a request that needs one of them.",
        "That is a guardrail, not a hard block: the assistant runs with its own permission prompts turned off. Connect a development computer that has no production secrets.",
      ],
    },
    {
      q: "Does Butterneck merge or deploy changes?",
      lines: [
        "No. Butterneck does not merge and does not deploy. When the preview looks right, your team publishes the way you already do.",
      ],
    },
    {
      q: "Who can open the preview link and send requests?",
      lines: [
        "Each connected computer starts with a chosen list of people who can send requests. \"Anyone with the link\" is a setting you turn on.",
        "The share link is unlisted, not private. Anyone who has it can open the preview. Every request runs the coding assistant on your connected computer, so keep the list unless that computer holds nothing you would mind.",
      ],
    },
    {
      q: "Whose access does the coding assistant run with?",
      lines: [
        "It runs as the user who runs the bridge, on a developer's connected computer. Butterneck doesn't add a container, a virtual machine or a separate user account around it.",
        "For a harder boundary, connect a dedicated development computer that has the project and a signed-in coding assistant, but no production secrets and no other projects you'd rather it never saw.",
      ],
    },
  ],
  moreDetail: [
    {
      label: "How Butterneck runs an AI coding agent in a sandbox on your own machine",
      href: "/blog/run-ai-coding-agent-sandbox-on-your-machine",
    },
    {
      label: "Ask freely, ship deliberately: an architecture for human-in-the-loop AI product changes",
      href: "/blog/human-in-the-loop-architecture-for-ai-product-changes",
    },
    {
      label: "Why a connected computer instead of a cloud sandbox",
      href: "/blog/ai-prs-need-an-owner#why-a-connected-computer-instead-of-a-cloud-sandbox",
    },
  ],
} as const;
