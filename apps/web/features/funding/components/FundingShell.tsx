import type { ReactNode } from "react";

import { navigationGroups } from "../data";
import type { View } from "../types";

type FundingShellProps = { theme: "light" | "dark"; hasManualTheme: boolean; view: View; query: string; children: ReactNode; onViewChange: (view: View) => void; onQueryChange: (query: string) => void; onToggleTheme: () => void; onCreate: () => void };

export function FundingShell({ theme, hasManualTheme, view, query, children, onViewChange, onQueryChange, onToggleTheme, onCreate }: FundingShellProps) {
  const nextThemeLabel = theme === "dark" ? "Light mode" : "Dark mode";
  const themeDescription = hasManualTheme ? `Switch to ${nextThemeLabel.toLowerCase()}` : `Automatic by time. Switch to ${nextThemeLabel.toLowerCase()}`;

  return <main className={`fundingApp ${theme}`}><aside className="fundingSide"><div className="fundingBrand"><span>H</span><strong>Harbor</strong></div><div className="fundingWorkspace"><i />Capital operations <b>⌄</b></div><nav aria-label="Primary navigation">{navigationGroups.map((group) => <section key={group.label}><p>{group.label}</p>{group.items.map((item) => <button key={item.view} onClick={() => onViewChange(item.view)} className={view === item.view ? "active" : ""}><span>{item.icon}</span>{item.label}</button>)}</section>)}</nav><div className="fundingUser"><span>LM</span><div><strong>Leah Morgan</strong><small>Senior adviser</small></div></div></aside><section className="fundingShell"><header className="fundingTop"><label><span>⌕</span><input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search businesses, owners, applications" /><kbd>⌘ K</kbd></label><div><em>SYNTHETIC DATA</em><button className="themeToggle" onClick={onToggleTheme} title={themeDescription} aria-label={themeDescription}><span aria-hidden="true">{theme === "dark" ? "☀" : "◐"}</span>{nextThemeLabel}</button><button className="primary" onClick={onCreate}>New application</button></div></header>{children}</section></main>;
}
