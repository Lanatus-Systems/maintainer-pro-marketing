
import {
  ICON_CLICKS,
  ICON_CURSOR,
  ICON_FRAME,
  WORDMARK_AASAAN,
  WORDMARK_ICON_TRANSFORM,
  WORDMARK_VIEWBOX,
  WORDMARK_WEB,
} from "./logo-paths";

const NAVY = "#091f41";
const TEAL = "#00c9af";
const GRAY = "#bcc6d2";
const RED = "#fb5b52";
const YELLOW = "#fac041";

const WORDMARK_RATIO = 991 / 155;

function StudioIconArt() {
  return (
    <>
      <rect x="52" y="157" width="319" height="168" rx="36" fill="#fff" />
      <path d={ICON_FRAME} fill={NAVY} />
      <circle cx="85" cy="121.5" r="15" fill={RED} />
      <circle cx="133.5" cy="121.5" r="15" fill={YELLOW} />
      <circle cx="183" cy="121.5" r="15" fill={TEAL} />
      <rect x="83" y="191" width="110" height="102" rx="14" fill={TEAL} />
      <rect x="216" y="189" width="133" height="26" rx="13" fill={GRAY} />
      <rect x="216" y="231" width="77" height="26" rx="13" fill={GRAY} />
      <path
        d={ICON_CLICKS}
        fill="none"
        stroke={TEAL}
        strokeWidth="16"
        strokeLinecap="round"
      />
      <path
        d={ICON_CURSOR}
        fill={TEAL}
        stroke={TEAL}
        strokeWidth="10"
        strokeLinejoin="round"
      />
    </>
  );
}

type StudioMarkProps = {
  size?: number;
  title?: string;
};

export function StudioMark({ size = 28, title }: StudioMarkProps) {
  return (
    <svg
      className="studio-logo-mark"
      width={size}
      height={size}
      viewBox="18.73 29.23 413.54 413.54"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      <StudioIconArt />
    </svg>
  );
}

type StudioLogoProps = {
  size?: number;
};

export function StudioLogo({ size = 28 }: StudioLogoProps) {
  return (
    <a href="/" className="studio-logo" aria-label="AasaanWeb">
      <svg
        className="studio-logo-word"
        width={Math.round(size * WORDMARK_RATIO)}
        height={size}
        viewBox={WORDMARK_VIEWBOX}
        aria-hidden
      >
        <g transform={WORDMARK_ICON_TRANSFORM}>
          <StudioIconArt />
        </g>
        <path d={WORDMARK_AASAAN} fill={NAVY} />
        <path d={WORDMARK_WEB} fill={TEAL} />
      </svg>
    </a>
  );
}
