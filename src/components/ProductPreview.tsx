export function ProductPreview() {
  return (
    <div className="landing-preview" aria-hidden="true">
      <header className="aui-preview-header">
        <div>
          <h2>AI Assistant</h2>
          <p>On a live copy of the product</p>
        </div>
        <div className="aui-preview-user">
          <span>
            Priya
            <em>PM</em>
          </span>
          <span className="aui-preview-switch">Switch user</span>
        </div>
      </header>

      <div className="aui-preview-thread">
        <div className="aui-preview-row is-self">
          <p className="aui-preview-meta is-self">
            <span>Priya</span>
            <span className="aui-preview-badge is-pm">PM</span>
            <time>2:14 PM</time>
          </p>
          <div className="aui-preview-bubble is-self">
            Can the big button on the home page say “Book a call” and open our Calendly?
          </div>
          <div className="aui-preview-working">
            <span>
              <i />
              <i />
              <i />
            </span>
            Working on it…
          </div>
        </div>

        <div className="aui-preview-row">
          <p className="aui-preview-meta">
            <span>AI</span>
            <time>2:16 PM</time>
          </p>
          <div className="aui-preview-bubble is-ai">
            <div className="aui-reply-quote">
              <p className="aui-reply-quote-name">Priya</p>
              <p className="aui-reply-quote-body">
                Can the big button on the home page say “Book a call”…
              </p>
            </div>
            <p>
              The main button on the home page says “Get started” and goes to the signup page. I
              changed it to “Book a call” and pointed it at the Calendly link you sent.
            </p>
          </div>
          <p className="aui-preview-hint">
            If you don&apos;t see the change in the app, refresh this page.
          </p>
        </div>

        <div className="aui-preview-row">
          <p className="aui-preview-meta is-dev">
            <span>Alex</span>
            <span className="aui-preview-badge is-dev">dev</span>
            <time>2:18 PM</time>
          </p>
          <div className="aui-preview-bubble is-dev">Looks right. I’ll publish it.</div>
        </div>
      </div>

      <div className="aui-preview-composer">
        <div className="aui-preview-input">
          <span className="aui-preview-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path
                d="M21.44 11.05 12.25 20.24a6 6 0 1 1-8.49-8.49l10.6-10.6a4 4 0 0 1 5.66 5.66l-10.6 10.61a2 2 0 1 1-2.83-2.83l9.19-9.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="aui-preview-placeholder">
            Message… (paste a screenshot or attach a file)
          </span>
          <span className="aui-preview-send" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path
                d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <p>Paste a screenshot or attach PDF, Word, or Excel. Type @ to tag someone.</p>
      </div>
    </div>
  );
}
