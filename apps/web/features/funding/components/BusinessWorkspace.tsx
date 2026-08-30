import type { ReactNode } from "react";

import { workflowStages } from "../data";
import type { Business, BusinessTab, Document, Stage } from "../types";
import { Badge, DocumentBadge, Metric, StageBadge } from "./Primitives";

type BusinessWorkspaceProps = {
  business: Business;
  list: Business[];
  tab: BusinessTab;
  auditOnly: boolean;
  onTabChange: (tab: BusinessTab) => void;
  onSelectBusiness: (id: string) => void;
  onMove: (id: string, stage: Stage) => void;
  onVerify: (id: string, documentId: string) => void;
  onComplete: (id: string, taskId: string) => void;
  onAccept: (id: string, offerId: string) => void;
  onLogNote: () => void;
  onAuditOnlyChange: (value: boolean) => void;
};

const tabs: BusinessTab[] = ["Overview", "Application", "Underwriting", "Offers", "Documents", "Activity and audit"];

export function BusinessWorkspace(props: BusinessWorkspaceProps) {
  const { business, list, tab, auditOnly, onTabChange, onSelectBusiness, onMove, onVerify, onComplete, onAccept, onLogNote, onAuditOnlyChange } = props;
  const verified = business.documents.filter((document) => document.status === "Verified").length;
  const content = tab === "Application" ? <Application business={business} onMove={onMove} /> : tab === "Underwriting" ? <Underwriting business={business} onMove={onMove} /> : tab === "Offers" ? <Offers business={business} onAccept={onAccept} /> : tab === "Documents" ? <Documents business={business} verified={verified} onVerify={onVerify} /> : tab === "Activity and audit" ? <ActivityAudit business={business} auditOnly={auditOnly} onAuditOnlyChange={onAuditOnlyChange} /> : <Overview business={business} verified={verified} onTabChange={onTabChange} onVerify={onVerify} onComplete={onComplete} />;
  return <section className="businessWorkspace"><aside className="businessList"><div className="listTitle"><div><p>Borrowers</p><h1>Businesses</h1></div><button aria-label="Add business">+</button></div><div className="listFilter"><span>{list.length} records</span><button>Active applications</button></div>{list.map((item) => <button key={item.id} className={item.id === business.id ? "selected" : ""} onClick={() => onSelectBusiness(item.id)}><span className="businessAvatar">{item.initials}</span><strong>{item.name}<small>{item.contact} · {item.requested}</small></strong><StageBadge stage={item.stage} /></button>)}</aside><section className="businessRecord"><div className="crumb">Businesses <span>/</span> {business.name}</div><header className="businessHeader"><div className="businessTitle"><span>{business.initials}</span><div><div><h2>{business.name}</h2><StageBadge stage={business.stage} /></div><p>{business.industry} · {business.location} · Owner {business.owner}</p></div></div><div><button className="secondary" onClick={() => onTabChange("Activity and audit")}>View audit</button><button className="primary" onClick={onLogNote}>Log activity</button></div></header><div className="attention"><span>!</span><div><strong>{business.decisionDue}</strong><small>{business.stage === "Underwriting" ? "Initial decision target. Escalate if blocked." : "Next action is visible in the work queue."}</small></div><button onClick={() => onTabChange("Overview")}>Open work</button></div><div className="tabs" role="tablist">{tabs.map((item) => <button key={item} className={tab === item ? "current" : ""} onClick={() => onTabChange(item)} role="tab" aria-selected={tab === item}>{item}{item === "Documents" && <em>{business.documents.length}</em>}</button>)}</div>{content}</section></section>;
}

function Overview({ business, verified, onTabChange, onVerify, onComplete }: { business: Business; verified: number; onTabChange: (tab: BusinessTab) => void; onVerify: (id: string, documentId: string) => void; onComplete: (id: string, taskId: string) => void }) {
  return <div className="overview"><div className="mainColumn"><section className="card"><SectionHeading eyebrow="Application snapshot" title="Funding request" action={<button className="textAction" onClick={() => onTabChange("Application")}>Open application</button>} /><div className="inlineMetrics"><Metric label="Requested capital" value={business.requested} note={business.product} /><Metric label="Monthly revenue" value={business.revenue} note={`${business.timeInBusiness} in business`} /><Metric label="Underwriting score" value={business.score} note={<Badge>{business.risk} risk</Badge>} /></div></section><section className="card"><SectionHeading eyebrow="Decision trail" title="Recent activity" action={<button className="textAction" onClick={() => onTabChange("Activity and audit")}>View all</button>} /><div className="eventList">{business.audits.slice(0, 3).map((item, index) => <article key={item.id}><span>{index === 0 ? "✓" : "▤"}</span><div><strong>{item.action}</strong><p>{item.context}</p><small>{item.at} · {item.actor}</small></div></article>)}</div></section><section className="card"><SectionHeading eyebrow="Borrower profile" title="Owners and guarantors" action={<Badge>{business.owners.length} people</Badge>} /><div className="owners">{business.owners.map((owner) => <div key={owner.name}><span>{owner.initials}</span><strong>{owner.name}<small>{owner.role}</small></strong><b>{owner.share}</b></div>)}</div></section></div><aside className="sideColumn"><section className="card"><SectionHeading eyebrow="Priorities" title={`Open work ${business.tasks.filter((task) => !task.done).length}`} />{business.tasks.filter((task) => !task.done).map((task) => <div className="task" key={task.id}><button onClick={() => onComplete(business.id, task.id)} aria-label={`Complete ${task.title}`} /><div><strong>{task.title}</strong><small><Badge>{task.type}</Badge> Due {task.due}</small></div></div>)}</section><section className="card"><SectionHeading eyebrow="Required evidence" title="Documents" action={<button className="textAction" onClick={() => onTabChange("Documents")}>{verified} of {business.documents.length} done</button>} /><div className="miniDocuments">{business.documents.slice(0, 4).map((document) => <div key={document.id}><span className={document.status === "Verified" ? "verified" : ""}>✓</span><strong>{document.name}</strong>{document.status !== "Verified" && <button onClick={() => onVerify(business.id, document.id)}>Verify</button>}</div>)}{business.documents.length === 0 && <p>No evidence requested yet.</p>}</div></section><section className="card contact"><p>Primary contact</p><h3>{business.contact}</h3><span>{business.phone}</span><button className="textAction">Send secure request</button></section></aside></div>;
}

function Application({ business, onMove }: { business: Business; onMove: (id: string, stage: Stage) => void }) {
  const current = Math.max(workflowStages.indexOf(business.stage), 0);
  const next = workflowStages[current + 1];
  return <section className="card workspaceTab"><SectionHeading eyebrow="Guided funding workflow" title="Application workspace" action={<StageBadge stage={business.stage} />} /><div className="stepper">{workflowStages.slice(0, 6).map((stage, index) => <div key={stage} className={index <= current ? "done" : ""}><span>{index < current ? "✓" : index + 1}</span><small>{stage}</small></div>)}</div><div className="informationGrid"><Info title="Borrower business" rows={[["Legal name", business.name], ["Industry", business.industry], ["Location", business.location]]} /><Info title="Initial qualification" rows={[["Funding request", business.requested], ["Target product", business.product], ["Monthly revenue", business.revenue], ["Time in business", business.timeInBusiness]]} /><Info title="Consent controls" rows={[["SMS communications", <Badge>Recorded</Badge>], ["Credit authorization", <Badge>{business.stage === "Pre qualified" ? "Not captured" : "Verified"}</Badge>], ["Electronic signature", <Badge>{business.stage === "Pre qualified" ? "Pending" : "Recorded"}</Badge>]]} /></div><div className="actions">{next && <button className="primary" onClick={() => onMove(business.id, next)}>Advance application</button>}<button className="secondary" onClick={() => onMove(business.id, "Declined")}>Record decline</button></div></section>;
}

function Underwriting({ business, onMove }: { business: Business; onMove: (id: string, stage: Stage) => void }) {
  return <section className="card workspaceTab"><SectionHeading eyebrow="Read only analysis workspace" title="Underwriting summary" action={<Badge>{business.risk} risk</Badge>} /><div className="underwritingMetrics"><Metric label="Monthly deposits" value={business.revenue} note="Bank statement normalization complete" /><Metric label="Average balance" value="$46,820" note="Synthetic demo value" /><Metric label="NSF and negative days" value="1 of 90" note="Source verification required" /><Metric label="Existing obligations" value="$6,200 weekly" note="Debt schedule review pending" /></div><div className="decision"><div><strong>Decision controls</strong><ul><li>Verify identity for every personal guarantor.</li><li>Confirm authorization before a credit request.</li><li>Review ownership, business purpose, and evidence freshness.</li><li>Record exceptions, reviewer, and decision rationale.</li></ul></div><div><strong>Human decision gate</strong><p>Automation may flag issues but cannot approve or decline a borrower.</p><button className="primary" onClick={() => onMove(business.id, "Offer sent")}>Approve for offer</button></div></div></section>;
}

function Offers({ business, onAccept }: { business: Business; onAccept: (id: string, offerId: string) => void }) {
  return <section className="card workspaceTab"><SectionHeading eyebrow="Versioned terms" title="Funding offers" action={<button className="secondary">Draft offer</button>} />{business.offers.length ? <div className="offers">{business.offers.map((offer) => <article className={offer.selected ? "selected" : ""} key={offer.id}><div><span>{offer.partner}</span>{offer.selected && <Badge>Selected</Badge>}</div><h4>{offer.product}</h4><strong>{offer.amount}</strong><p>{offer.terms}</p><dl><div><dt>Scheduled payment</dt><dd>{offer.payment}</dd></div><div><dt>Offer expiry</dt><dd>{offer.expiry}</dd></div></dl><button className="primary" disabled={offer.selected} onClick={() => onAccept(business.id, offer.id)}>{offer.selected ? "Accepted" : "Record acceptance"}</button></article>)}</div> : <div className="empty">No offers generated. Underwriting approval is required before an offer can be drafted.</div>}<p className="formNote">Production offer delivery must retain exact terms, disclosures, delivery proof, acceptance, signature, and the responsible user.</p></section>;
}

function Documents({ business, verified, onVerify }: { business: Business; verified: number; onVerify: (id: string, documentId: string) => void }) {
  return <section className="card workspaceTab"><SectionHeading eyebrow="Secure collection" title="Document checklist" action={<Badge>{verified} of {business.documents.length} verified</Badge>} /><div className="documentList">{business.documents.map((document) => <DocumentRow key={document.id} document={document} onVerify={() => onVerify(business.id, document.id)} />)}{business.documents.length === 0 && <div className="empty">No documents are required until the full application begins.</div>}</div><p className="formNote">Demo metadata only. Production files require encrypted storage, malware scanning, versioning, retention rules, and audited access.</p></section>;
}

function ActivityAudit({ business, auditOnly, onAuditOnlyChange }: { business: Business; auditOnly: boolean; onAuditOnlyChange: (value: boolean) => void }) {
  return <section className="card workspaceTab"><SectionHeading eyebrow="Immutable event record" title="Activity and audit" action={<label className="toggle"><input type="checkbox" checked={auditOnly} onChange={(event) => onAuditOnlyChange(event.target.checked)} /> Audit events only</label>} />{!auditOnly && <div className="notes">{business.notes.map((note, index) => <article key={`${note}${index}`}><span>▤</span><div><strong>{index === 0 ? "Latest adviser note" : "Client record note"}</strong><p>{note}</p></div></article>)}</div>}<div className="audit">{business.audits.map((item) => <article key={item.id}><span>{item.at}</span><div><strong>{item.action}</strong><small>{item.actor} · {item.context}</small></div></article>)}</div></section>;
}

function DocumentRow({ document, onVerify }: { document: Document; onVerify: () => void }) {
  return <div><span>▤</span><strong>{document.name}<small>{document.owner} · {document.updated}</small></strong><DocumentBadge status={document.status} /><button className="quiet" disabled={document.status === "Verified"} onClick={onVerify}>{document.status === "Verified" ? "Verified" : "Verify"}</button></div>;
}

function Info({ title, rows }: { title: string; rows: [string, ReactNode][] }) {
  return <section className="information"><p>{title}</p><dl>{rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>;
}

function SectionHeading({ eyebrow, title, action }: { eyebrow: string; title: string; action?: ReactNode }) {
  return <div className="sectionHeading"><div><p>{eyebrow}</p><h2>{title}</h2></div>{action}</div>;
}
