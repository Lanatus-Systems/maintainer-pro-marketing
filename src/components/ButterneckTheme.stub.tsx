// AasaanWeb builds: no Butterneck theme styles or motion.
import type { ReactNode } from "react";

export function ButterneckTheme() {
  return null;
}

export function HeroStage({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function ToolMarquee(_props: { label: string; items: readonly string[] }) {
  return null;
}
