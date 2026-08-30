import type { ReactNode } from "react";

import type { DocumentStatus, Stage } from "../types";

export function Badge({ children }: { children: ReactNode }) {
  return <span className="badge">{children}</span>;
}

export function StageBadge({ stage }: { stage: Stage }) {
  return <Badge>{stage}</Badge>;
}

export function DocumentBadge({ status }: { status: DocumentStatus }) {
  return <Badge>{status}</Badge>;
}

export function Metric({ label, value, note }: { label: string; value: string; note: ReactNode }) {
  return <article className="metric"><small>{label}</small><strong>{value}</strong><span>{note}</span></article>;
}

export function PageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return <header className="pageHeader"><div><p>{eyebrow}</p><h1>{title}</h1><span>{description}</span></div>{action}</header>;
}
