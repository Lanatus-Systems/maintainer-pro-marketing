export const SECURITY = {
  path: "/security",
  title: "Security",
  description:
    "Where a Butterneck edit happens, which folder it can touch, what stays off limits, and who sees the project.",
  lead: "A reviewer usually asks five things. Here they are.",
  facts: [
    {
      title: "The bridge runs on your computer",
      paragraphs: [
        "You pair a computer from the workspace. The bridge stays on that computer. It starts the project there, and the edit happens there.",
      ],
    },
    {
      title: "It edits the project you connected",
      paragraphs: [
        "You pick the folder. The assistant is limited to that folder, or to the folders you attach as one project. It is told not to write anywhere else.",
      ],
    },
    {
      title: "Secret settings stay off limits",
      paragraphs: [
        "Files named .env are on the ignore list, including .env.local and the same names in subfolders. You can add more paths. The assistant is told to refuse a request that needs one of them.",
        "That assistant is the coding tool already signed in on the computer. It follows this boundary the way that tool follows a project you open. Butterneck does not put a separate locked-down operating system around it.",
      ],
    },
    {
      title: "You publish",
      paragraphs: [
        "Butterneck does not merge and does not deploy. When the preview looks right, your team publishes the way you already do. Until then the edit stays on the computer.",
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
} as const;
