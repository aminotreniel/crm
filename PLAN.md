# Financial CRM — Product, UX, and Delivery Plan

## 1. Product direction

Build a secure, configurable CRM for a finance company: one workspace where relationship managers, advisors, operations, compliance, and leadership can understand a client, act on the next best step, and prove what happened later.

The first release should be a **relationship and workflow CRM**, not a replacement for a core-banking, custody, lending, trading, or accounting system. Those systems remain sources of record; this CRM unifies their relevant data around the client and coordinates people and processes.

### Working assumptions

- The company serves individuals, households, and business entities; the model must support any of them.
- Exact products (wealth, lending, insurance, banking, or a mix), operating countries, record-retention rules, and existing systems are not yet known.
- Compliance rules must therefore be configurable and validated with the company’s compliance/legal team before production use. This plan deliberately avoids hard-coding a jurisdiction’s rules.

## 2. Market research: what leading finance CRMs do

| Product | Primary fit | Patterns worth adopting |
| --- | --- | --- |
| [Salesforce Financial Services Cloud](https://www.salesforce.com/financial-services/cloud/) | Large banks, insurers, wealth firms | Industry data model; unified client context from core systems; financial accounts, goals, lifecycle signals, contextual alerts, referrals, onboarding, and service workflows. Its data model explicitly treats households/groups and multi-party relationships as first-class concepts. [Data-model reference](https://help.salesforce.com/s/articleView?id=sf.fsc_admin_data_model.htm&language=en_US&type=5) |
| [Microsoft Dynamics 365 for Financial Services](https://learn.microsoft.com/en-us/industry/financial-services/dynamics-365-fsi) | Firms standardized on Microsoft 365/Azure | Omnichannel customer journey, enterprise security/compliance, embedded intelligence, and a strong Microsoft 365/Power Platform integration story. |
| [Wealthbox](https://www.wealthbox.com/products/wealthbox-crm/) | Advisory and wealth teams | One client record shared by contacts, email, meetings, tasks, workflows, opportunities, reports, and integrations. It emphasizes automatic logging and a low-friction advisor workflow. |
| [Redtail](https://redtailtechnology.com/crm) | RIAs, broker-dealers, advisor networks | Custom workflows for onboarding/reviews, supervised team activity, audit trails, permissions, templates, and deep integrations with advisor tools. |
| [HubSpot Finance CRM](https://www.hubspot.com/products/crm/finance) | Growth, sales, and service-led financial firms | Fast contact/deal/pipeline experience; full interaction history; reminder/sequence automation; quotes, payments, reporting, and service workflows. |
| [Creatio Banking](https://www.creatio.com/industries/banking) | Process-heavy banks/lenders | A 360° view, personalized engagement, no-code process configuration, onboarding, needs analysis, offer/product management, and workflow automation. |

### The common operating model

1. **Client 360 is the center.** A profile pulls together identity, household/business context, products/accounts, activity history, documents, opportunities, cases, risk/compliance state, and a next action.
2. **Relationships are data, not notes.** Households, spouses, dependants, trustees, beneficial owners, professional advisers, companies, and referrals need typed relationships with effective dates and ownership percentages where relevant.
3. **Every interaction is time-stamped and tied to a record.** Calls, emails, meetings, notes, documents, tasks, decisions, and changes create an auditable chronology.
4. **Processes are guided.** Onboarding, KYC refresh, applications, client reviews, complaints, referrals, and offboarding are templated stages with required evidence, owners, due dates, escalations, and approvals.
5. **Automation reduces coordination work.** Product/life-event signals and overdue steps create tasks, reminders, routing, and approval requests; humans remain responsible for regulated decisions.
6. **The CRM connects rather than duplicates.** Email/calendar, document storage, core systems, identity/risk providers, and BI platforms use secure, traceable integrations.

## 3. Product scope

### MVP: the usable financial CRM core

- Secure sign-in, MFA, organization/team structure, role-based access, record ownership/sharing, and session/device controls.
- People, companies, households, and a relationship graph.
- Client 360 profile: overview, timeline, relationships, financial snapshot, opportunities, cases, documents, tasks, and compliance summary.
- Leads/referrals and configurable sales/service pipelines.
- Activities: tasks, calls, meetings, notes, email/calendar sync stubs, reminders, mentions, and attachments.
- Financial profile: products/accounts, assets/liabilities, goals, risk profile, suitability/KYC facts, and data-source freshness. Store read-only reference values from source systems; do not execute transactions.
- Document checklist, consent capture, versioning, expiry dates, and acknowledgement tracking.
- Workflow templates for client onboarding, periodic review, KYC refresh, referral handoff, and document expiry.
- Team queues, assignment, SLA timers, approvals, saved views, global search, dashboards, and CSV export subject to permissions.
- Immutable audit trail for record changes, exports, views of sensitive information, automation execution, and approvals.

### Phase 2

- Production email/calendar capture, document-provider and identity/KYC screening adapters.
- Core-system/custodian/policy/lending adapters, reconciliation dashboard, and data-quality rules.
- Complaint/case management, knowledge base, client portal, configurable reports, and mobile-responsive task views.
- Relationship intelligence: life-event and data-change alerts, account aggregation, opportunity scoring, and meeting briefs.

### Later, only after policy approval

- AI meeting summaries, record summaries, draft communications, and recommended next actions with source links, human review, audit logs, redaction, and opt-out controls.
- Regulated communications archival, surveillance, e-signature, and transaction/money-movement workflows through approved vendors.

### Explicit non-goals for MVP

- Trading, payment initiation, portfolio accounting, underwriting/pricing engines, general ledger, or calculating investment advice.
- Autonomous compliance decisions, auto-submission to regulators, or automated customer communications without approved templates and human controls.

## 4. UX and visual design strategy

Do not mimic a vendor’s brand or UI. Borrow the proven interaction patterns: Salesforce’s record-focused workspace, Dynamics’ dense data grids and queues, Wealthbox’s activity-centered client context, and HubSpot’s approachable tables/pipelines.

### Layout

- **Desktop-first application shell:** a 248 px collapsible left rail; a slim top bar for organization switcher, global search, notifications, and user menu; content width is fluid.
- **Primary navigation:** Home, Clients, Households, Leads, Opportunities, Work, Workflows, Documents, Reports, Admin. Show only the modules permitted to the user.
- **Client page:** compact identity header and risk/status badges; an “attention strip” for overdue/blocked compliance work; tabs for Overview, Timeline, Relationships, Financials, Pipeline, Documents, Cases, and Audit.
- **Overview:** two-column composition—primary client context/timeline on the left; next actions, workflow status, owner, key figures, alerts, and quick actions on the right.
- **Operational work:** dense, filterable tables with persisted saved views; bulk actions require permission and a confirmation summary. Use a kanban board only where stage flow matters (opportunities/onboarding), never for the entire CRM.
- **Mobile:** prioritize Today, task completion, client lookup, activity logging, and meeting notes. Keep configuration and heavy data management desktop-oriented.

### Design language and tokens

- **Typeface:** `Inter` (self-hosted) for the entire product UI—legible at small data-dense sizes, open-source, and supports tabular numerals. Use `font-variant-numeric: tabular-nums` for money, dates, and metrics. This takes the practical, high-legibility lesson from Microsoft Fluent, whose primary UI type is Segoe UI and whose web type ramp centers on concise 12–16 px body text. [Fluent typography](https://fluent2.microsoft.design/typography)
- **Type scale:** 12/16 labels and metadata; 14/20 body/table cells; 16/24 section labels; 20/28 page titles; 28/36 dashboard headings. Prefer 400/500/600 weights; reserve 700 for exceptions.
- **Color:** neutral slate canvas (`#F8FAFC`), white surfaces, ink (`#0F172A`), primary indigo (`#3857D6`), teal for positive/success (`#0F9F8A`), amber for warning, red for blocked/error. Color never conveys risk/compliance status on its own—pair it with a named badge and icon.
- **Spacing and shape:** 4 px base grid; 8/12/16/24/32 px spacing scale; 8 px cards and controls; 6 px compact table controls. Use quiet borders and restrained shadow; avoid decorative gradients.
- **Components:** accessible buttons, inputs, comboboxes, date ranges, data table, status badge, activity item, timeline, alert, empty state, drawer, modal, command palette, audit event, and document checklist. Use Lucide icons with text labels for irreversible actions.
- **Accessibility:** WCAG 2.2 AA target, keyboard-operable tables/forms, visible focus, reduced motion, 44 px touch targets on mobile, semantic labels, and contrast-tested status colors.

### High-value screens to design first

1. Today dashboard: assigned work, at-risk workflows, upcoming meetings, new leads, and alerts.
2. Client 360: everything needed to prepare for a call without navigation.
3. Onboarding workspace: stage checklist, required evidence, owner, reviewer, and blockers.
4. Opportunity pipeline: stage, amount/AUM potential, probability, next step, source, and compliance readiness.
5. Work queue: fast filtering, assignment, bulk-safe actions, and SLA visibility.
6. Admin workflow builder: form-driven trigger/condition/action editor with a test mode and execution history—not a free-form automation canvas in v1.

## 5. Core data model

Use a canonical party model; never overload a single “contact” table with every entity type.

| Domain | Core entities |
| --- | --- |
| Parties | `person`, `organization`, `household`, `party_identifier`, `address`, `contact_method`, `relationship`, `relationship_role`, `ownership_interest` |
| CRM | `lead`, `referral`, `opportunity`, `pipeline`, `stage`, `activity`, `task`, `meeting`, `note`, `case`, `tag` |
| Finance | `financial_account`, `financial_product`, `asset_liability`, `goal`, `risk_assessment`, `suitability_profile`, `financial_snapshot`, `external_data_source` |
| Compliance | `kyc_profile`, `screening_check`, `consent`, `document`, `document_version`, `document_requirement`, `review`, `approval`, `retention_policy` |
| Workflow | `workflow_template`, `workflow_version`, `workflow_run`, `workflow_step`, `assignment`, `sla`, `automation_rule`, `automation_run`, `notification` |
| Platform | `user`, `team`, `role`, `permission`, `record_share`, `integration_connection`, `outbox_event`, `audit_event` |

Model relationships as directional, typed records with source, confidence, effective dates, and history. Make client/household totals derived and visibly timestamped; raw account-level data retains its external source and freshness state.

## 6. Automation approach

### Event-driven, controlled automation

Every meaningful change emits a domain event through an outbox (for example, `document.expiring`, `kyc.review_due`, `opportunity.stage_changed`, or `financial_snapshot.refreshed`). A durable workflow service consumes approved events, executes idempotent steps, and records inputs, outcome, and actor.

### First automations

| Trigger | Automated action | Human control |
| --- | --- | --- |
| New lead/referral | De-duplicate, score/rout by territory/product, create response task | Owner accepts/reassigns; no external message by default |
| Onboarding started | Generate a role/product-specific checklist and due dates | Reviewer approves all mandatory evidence |
| Document nearing expiry | Notify owner; create renewal task; escalate when overdue | Owner confirms replacement/version |
| KYC/risk review due | Open review workflow, lock completion until required facts/evidence exist | Compliance reviewer signs off |
| Opportunity becomes won | Create handoff/onboarding workflow and internal notification | Manager verifies data before provisioning |
| No client activity | Create a review task based on approved cadence | Advisor decides whether/how to contact |
| Failed integration or stale data | Show data freshness warning and send ops alert | Ops resolves/retries; do not silently overwrite |

### Guardrails

- Version every workflow and keep the version used by each completed run.
- Provide preview/test mode, dry-run logs, retries with idempotency keys, and a kill switch per rule.
- Require dual approval for automation that exports data, changes a compliance state, or sends an external communication.
- Keep automation configuration behind an admin permission and audit every change.

## 7. Recommended technical stack

| Layer | Choice | Why |
| --- | --- | --- |
| Web app | Next.js (App Router), React, TypeScript | Fast, typed application shell and server-rendered data views. |
| Design system | Tailwind CSS, shadcn/ui primitives, Radix UI, Lucide, Inter | Accessible foundations with a custom, ownable visual system. |
| API | NestJS + Fastify, REST/OpenAPI | Explicit domain modules, validated APIs, generated clients, integration-friendly boundaries. |
| Data | PostgreSQL + Prisma migrations | Strong relational integrity for relationship-heavy CRM data and auditable migrations. |
| Search | PostgreSQL full-text/trigram for MVP; OpenSearch later | Keeps MVP simple while supporting fast global client search. |
| Workflows | Temporal | Durable, observable, retry-safe multi-step workflows for onboarding/reviews/approvals. |
| Async/cache | Redis | Rate limits, ephemeral cache, and notification/job coordination. |
| Files | S3-compatible object storage with KMS encryption and malware scanning | Secure documents with versioned metadata outside the database. |
| Identity | OIDC provider (AWS Cognito or Keycloak) with MFA; app RBAC/ABAC | SSO-ready auth and record-level authorization. |
| Integrations | Provider adapter interfaces + encrypted credential vault | Swap email, calendar, KYC, core-system, and document vendors without contaminating core domain logic. |
| Observability | OpenTelemetry, structured logs, Sentry, metrics/dashboarding | Trace user/API/workflow/integration paths and retain operational evidence. |
| Quality | Vitest, React Testing Library, Playwright, Pact/OpenAPI contract tests | Unit, interaction, end-to-end, and integration safety nets. |
| Delivery | Docker, GitHub Actions, Terraform, AWS (ECS/Fargate, RDS, S3, KMS, Secrets Manager) | Repeatable, private-network-capable deployment with managed security primitives. |

Use the latest stable versions when implementation starts; pin exact versions in lockfiles and document upgrade policy. Separate the API, workflow worker, and web app deployments. Keep financial-source adapters read-only until product and compliance approval explicitly expands their authority.

## 8. Security, privacy, and reliability requirements

- Encrypt in transit (TLS) and at rest; encrypt integration secrets with a managed key service; never put client data in logs or analytics by default.
- Enforce least privilege with role plus record/team scope; protect sensitive fields with field-level authorization and reveal/view audit events.
- Write append-only audit events for authentication, record creation/change/deletion, view/export of sensitive data, permission changes, workflow actions, and integration calls. Audit logs must not be editable by application users.
- Support data classification, configurable retention/legal hold, consent/communication preferences, data export/deletion workflows, and region-specific policy configuration.
- Validate uploads, virus-scan documents, use time-bound download URLs, and prevent public buckets.
- Use database constraints, transactions, idempotency keys, outbox delivery, backups, restore tests, and disaster-recovery runbooks.
- Threat-model integrations, exports, impersonation, bulk actions, cross-tenant access, and automation before production.

## 9. Delivery roadmap

### Phase 0 — discovery and foundations (1–2 weeks)

- Confirm business line, jurisdiction(s), regulated activities, existing systems, roles, data classification, retention, SSO, and integration constraints.
- Map five workflows: lead-to-client, onboarding, periodic review/KYC, service request, and offboarding.
- Define success metrics: response SLA, onboarding cycle time, overdue review rate, data completeness, activity capture, and user adoption.
- Produce low-fidelity wireframes and a clickable Client 360/onboarding prototype; gain product/compliance sign-off.

### Phase 1 — platform and relationship CRM (3–5 weeks)

- Set up monorepo, CI, environments, IaC, authentication, authorization, audit events, data model, seed data, design tokens, and component library.
- Deliver clients/households/organizations, relationship graph, activity timeline, tasks, documents, global search, and saved list views.
- Acceptance: a permitted user can create a household, relate members/entities, log activity, attach a scanned document, and see all actions in the audit log.

### Phase 2 — pipeline and guided work (3–4 weeks)

- Add leads, referrals, opportunities, configurable pipeline stages, work queues, SLA states, dashboard, and onboarding workflow templates.
- Acceptance: a new referral is routed, worked, converted to a client/household, then progressed through a visible and auditable onboarding checklist.

### Phase 3 — finance/compliance profile and automations (3–5 weeks)

- Add financial snapshots, KYC/risk/consent, expiry reviews, approvals, Temporal workflow execution, notifications, and workflow administration.
- Acceptance: an expiring document or due review initiates the right workflow, cannot be falsely completed, and leaves a complete execution trail.

### Phase 4 — integrations and hardening (ongoing)

- Implement approved adapters; reconciliation/data freshness; performance/accessibility/security testing; pen test; backup/restore exercise; pilot and training.
- Acceptance: integrations fail safely, stale data is conspicuous, every production-critical workflow is observable, and the pilot users can complete their daily work without spreadsheets.

## 10. Decisions required before build

1. Which finance business is this (wealth advisory, lending, insurance, banking, or mixed), and in which country/countries?
2. What existing sources of truth must integrate first: email/calendar, core banking/lending, portfolio/custody, KYC/AML, documents, accounting, phone, or BI?
3. What roles and supervisory model exist? Who can see, edit, approve, export, or delete each type of client information?
4. What are the mandated retention, consent, communication-archival, KYC/AML, and data-residency rules?
5. Which five workflows create the most manual work today, and who owns each step?

## 11. Research sources

Research completed 23 August 2026. Product claims and design observations above are based on public vendor documentation, not hands-on product access:

- [Salesforce Financial Services Cloud](https://www.salesforce.com/financial-services/cloud/) and its [financial-services data model](https://help.salesforce.com/s/articleView?id=sf.fsc_admin_data_model.htm&language=en_US&type=5)
- [Microsoft Dynamics 365 for Financial Services](https://learn.microsoft.com/en-us/industry/financial-services/dynamics-365-fsi) and [Fluent typography](https://fluent2.microsoft.design/typography)
- [Wealthbox CRM](https://www.wealthbox.com/products/wealthbox-crm/)
- [Redtail CRM](https://redtailtechnology.com/crm)
- [HubSpot CRM for finance](https://www.hubspot.com/products/crm/finance)
- [Creatio Banking](https://www.creatio.com/industries/banking)
