"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";

import { initialBusinesses } from "./data";
import { BusinessWorkspace } from "./components/BusinessWorkspace";
import { FundingShell } from "./components/FundingShell";
import { CapitalPartners, Dashboard, DocumentExceptions, Pipeline, Reports, WorkQueue } from "./components/OperationalViews";
import type { Business, Stage, View } from "./types";

type ModalKind = "new" | "note" | null;
type Theme = "light" | "dark";

function themeForCurrentTime(): Theme {
  return new Date().getHours() >= 18 ? "dark" : "light";
}

export default function FundingCRM() {
  const [businesses, setBusinesses] = useState<Business[]>(initialBusinesses);
  const [selectedId, setSelectedId] = useState("sf");
  const [view, setView] = useState<View>("dashboard");
  const [tab, setTab] = useState<"Overview" | "Application" | "Underwriting" | "Offers" | "Documents" | "Activity and audit">("Overview");
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState<ModalKind>(null);
  const [auditOnly, setAuditOnly] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
  const [hasManualTheme, setHasManualTheme] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("cortadaTheme");

    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
      setHasManualTheme(true);
      return;
    }

    const updateAutomaticTheme = () => setTheme(themeForCurrentTime());
    updateAutomaticTheme();
    const timer = window.setInterval(updateAutomaticTheme, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem("cortadaTheme", nextTheme);
    setTheme(nextTheme);
    setHasManualTheme(true);
  }
  const selected = businesses.find((business) => business.id === selectedId) ?? businesses[0];
  const filteredBusinesses = useMemo(() => businesses.filter((business) => `${business.name} ${business.contact} ${business.industry}`.toLowerCase().includes(query.toLowerCase())), [businesses, query]);
  const openTasks = businesses.flatMap((business) => business.tasks.filter((task) => !task.done).map((task) => ({ ...task, business: business.name, businessId: business.id })));
  const documentExceptions = businesses.flatMap((business) => business.documents.filter((document) => document.status !== "Verified").map((document) => ({ ...document, business: business.name, businessId: business.id })));

  function addEvent(action: string, context: string) {
    return { id: crypto.randomUUID(), at: "Just now", actor: "Leah Morgan", action, context };
  }

  function updateBusiness(id: string, update: (business: Business) => Business) {
    setBusinesses((current) => current.map((business) => business.id === id ? update(business) : business));
  }

  function openBusiness(id: string) {
    setSelectedId(id);
    setView("businesses");
    setTab("Overview");
  }

  function moveStage(id: string, stage: Stage) {
    updateBusiness(id, (business) => ({ ...business, stage, audits: [addEvent(`Application moved to ${stage}`, "Application workflow"), ...business.audits] }));
  }

  function verifyDocument(id: string, documentId: string) {
    updateBusiness(id, (business) => ({ ...business, documents: business.documents.map((document) => document.id === documentId ? { ...document, status: "Verified", updated: "Just now", owner: "Leah Morgan" } : document), audits: [addEvent("Document marked verified", "Document review"), ...business.audits] }));
  }

  function completeTask(id: string, taskId: string) {
    updateBusiness(id, (business) => ({ ...business, tasks: business.tasks.map((task) => task.id === taskId ? { ...task, done: true } : task), audits: [addEvent("Task completed", "Work queue"), ...business.audits] }));
  }

  function acceptOffer(id: string, offerId: string) {
    updateBusiness(id, (business) => ({ ...business, stage: "Funding", offers: business.offers.map((offer) => ({ ...offer, selected: offer.id === offerId })), audits: [addEvent("Offer accepted and funding checklist opened", "Offer acceptance"), ...business.audits] }));
  }

  function createApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name"));
    const contact = String(form.get("contact"));
    const initials = name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();
    const business: Business = { id: crypto.randomUUID(), initials, name, industry: String(form.get("industry")), location: "Pending", owner: "Leah Morgan", contact, phone: "Pending", stage: "Pre qualified", requested: String(form.get("requested")), product: "To be matched", revenue: "Pending", timeInBusiness: "Pending", risk: "Low", score: "Pre qualification pending", decisionDue: "12 hour review target", owners: [{ name: contact, share: "Pending", role: "Authorized representative", initials: contact.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase() }], documents: [], offers: [], tasks: [{ id: crypto.randomUUID(), title: "Contact lead and begin qualification", due: "Today", type: "SLA", done: false }], audits: [addEvent("Application created manually", "Lead intake")], notes: ["New application created from CRM."] };
    setBusinesses((current) => [business, ...current]);
    setSelectedId(business.id);
    setView("businesses");
    setTab("Overview");
    setModal(null);
  }

  function saveNote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = String(new FormData(event.currentTarget).get("message"));
    updateBusiness(selected.id, (business) => ({ ...business, notes: [message, ...business.notes], audits: [addEvent("Adviser note logged", "Client communication"), ...business.audits] }));
    setModal(null);
  }

  const content = view === "dashboard" ? <Dashboard businesses={businesses} tasks={openTasks} onOpen={openBusiness} /> : view === "pipeline" ? <Pipeline businesses={businesses} onOpen={openBusiness} onMove={moveStage} /> : view === "work" ? <WorkQueue tasks={openTasks} onOpen={openBusiness} onComplete={completeTask} /> : view === "documents" ? <DocumentExceptions docs={documentExceptions} onOpen={(id) => { openBusiness(id); setTab("Documents"); }} /> : view === "partners" ? <CapitalPartners /> : view === "reports" ? <Reports businesses={businesses} /> : <BusinessWorkspace business={selected} list={filteredBusinesses} tab={tab} auditOnly={auditOnly} onTabChange={setTab} onSelectBusiness={openBusiness} onMove={moveStage} onVerify={verifyDocument} onComplete={completeTask} onAccept={acceptOffer} onLogNote={() => setModal("note")} onAuditOnlyChange={setAuditOnly} />;

  return <FundingShell theme={theme} hasManualTheme={hasManualTheme} view={view} query={query} onViewChange={setView} onQueryChange={setQuery} onToggleTheme={toggleTheme} onCreate={() => setModal("new")}>{content}{modal && <FundingModal kind={modal} business={selected} onClose={() => setModal(null)} onCreate={createApplication} onSaveNote={saveNote} />}</FundingShell>;
}

function FundingModal({ kind, business, onClose, onCreate, onSaveNote }: { kind: Exclude<ModalKind, null>; business: Business; onClose: () => void; onCreate: (event: FormEvent<HTMLFormElement>) => void; onSaveNote: (event: FormEvent<HTMLFormElement>) => void }) {
  return <div className="modalBackdrop"><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle"><button className="close" onClick={onClose} aria-label="Close">×</button>{kind === "new" ? <><p>Capital intake</p><h2 id="modalTitle">Create application</h2><form onSubmit={onCreate}><label>Business legal name<input name="name" autoFocus required placeholder="Example Northline Studio" /></label><label>Primary contact<input name="contact" required placeholder="Full name" /></label><div className="formRow"><label>Industry<select name="industry"><option>Construction</option><option>Trucking and logistics</option><option>Healthcare</option><option>Manufacturing</option><option>Professional services</option><option>Other</option></select></label><label>Funding request<select name="requested"><option>$25K to $50K</option><option>$50K to $100K</option><option>$100K to $250K</option><option>$250K to $500K</option><option>$500K to $1M</option><option>$1M plus</option></select></label></div><p className="formNote">Starts a qualification record and a 12 hour adviser task. No credit authorization is created here.</p><div className="modalActions"><button type="button" className="secondary" onClick={onClose}>Cancel</button><button className="primary">Create application</button></div></form></> : <><p>{business.name}</p><h2 id="modalTitle">Log adviser activity</h2><form onSubmit={onSaveNote}><label>Internal summary<textarea name="message" autoFocus required placeholder="Capture a factual client update, outcome, or next step." /></label><p className="formNote">Saved as an auditable internal note. Do not enter sensitive credentials or account numbers.</p><div className="modalActions"><button type="button" className="secondary" onClick={onClose}>Cancel</button><button className="primary">Save activity</button></div></form></>}</section></div>;
}
