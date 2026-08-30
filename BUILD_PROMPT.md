# Build Prompt — Financial CRM

Use this prompt with a coding agent after reviewing `PLAN.md`.

---

You are the lead engineer building the Financial CRM described in `PLAN.md` in this repository. Read that file completely before changing code; it is the product and architecture authority for this project.

## Objective

Create a production-minded, desktop-first CRM for a finance company. Deliver the MVP in deliberate vertical slices: secure identity and audit foundation; party/household/relationship CRM; activities/documents/search; pipelines and work queues; then guided onboarding and compliance-review workflows. The CRM coordinates financial-client work; it must not execute transactions, calculate advice, or make autonomous compliance decisions.

## Build rules

1. Start by inspecting the repository and write a concise implementation checklist mapped to the phases in `PLAN.md`. Do not silently broaden scope.
2. Use the plan’s stack: Next.js + TypeScript web app; NestJS/Fastify API; PostgreSQL/Prisma; Temporal; Redis; S3-compatible documents; OIDC/MFA-ready identity; OpenTelemetry; Docker, CI, and IaC. Use current stable versions and lock them.
3. Create a monorepo with clear boundaries: `apps/web`, `apps/api`, `apps/worker`, `packages/ui`, `packages/contracts`, `packages/config`, and `infra`. If the repository already has a sound structure, extend it rather than replacing it.
4. Make the canonical party model real from the beginning. Support people, organizations, households, typed/effective-dated relationships, ownership interests, record ownership, and data-source freshness. Do not reduce relationships to unstructured notes.
5. Make auditability a foundational feature: append-only audit events for login, data changes, sensitive views/exports, approval actions, permissions, automation configuration/runs, and integrations. Application users cannot edit audit events.
6. Enforce authorization in the API, never solely in the UI. Implement roles plus record/team scope; use field-level policy checks for sensitive values. Seed realistic roles: advisor, operations, compliance reviewer, manager, administrator, and read-only auditor.
7. Treat document upload as hostile input: authorize first, validate size/type, malware-scan asynchronously, encrypt storage, serve through expiring URLs, store versioned metadata, and audit download/view actions.
8. Implement workflow execution through versioned templates and durable Temporal workflows. Every run must identify the template version, initiator, actions, timestamps, result, and error. Add idempotency and a per-rule kill switch.
9. Build the visual design from the plan’s own design system—do not clone Salesforce, Microsoft, Wealthbox, HubSpot, or any other vendor. Use self-hosted Inter, tabular numerals, neutral slate/indigo/teal tokens, WCAG 2.2 AA, keyboard support, and dense but calm financial-data layouts.
10. Ship these screens first: Today dashboard, searchable Client list, Client 360, Household relationships, activity logging, document checklist, opportunity pipeline, work queue, and onboarding workspace. Use responsive behavior, but optimize configuration/heavy grids for desktop.
11. For each external system, define a typed adapter interface and a sandbox/mock adapter before adding a real vendor connection. Financial-source integrations are read-only unless a later written requirement authorizes more.
12. Never log raw PII, document contents, access tokens, or secrets. Provide `.env.example`, secret names, local-development mocks, and sample synthetic data only.
13. Add tests as features land: unit tests for domain/authorization/workflow logic, API integration tests, component accessibility tests, and Playwright critical-path tests. Add formatting, type-checking, linting, migrations, and test commands to CI.
14. At each milestone, run the relevant checks and report: files changed, key design decisions, test commands/results, remaining risks, and the next smallest coherent step.

## First implementation milestone

Implement Phase 1 foundations and the relationship CRM slice:

- monorepo and local Docker development environment;
- authenticated application shell with seeded roles and permission middleware;
- database migrations and synthetic seed data;
- party/household/organization/relationship API and UI;
- Client list with safe search/filtering and a Client 360 record page;
- task/activity timeline;
- append-only audit event pipeline plus an auditor-facing filtered audit view;
- shared design tokens/components and accessible empty/loading/error states;
- tests covering authorization, relationship integrity, and audit emission.

Do not fake completion with static-only screens. If an external provider is unavailable, build a clearly labeled mock adapter and preserve the production interface. Pause and request a decision when a missing jurisdiction, compliance policy, or external system choice would materially alter behavior. Otherwise, make well-documented, reversible engineering assumptions and proceed.

Before calling the milestone complete, demonstrate a seeded advisor creating a household, adding a family member and a related business, logging a client activity, and showing the resulting audit events; demonstrate that a read-only auditor cannot edit CRM data and that an unauthorized user cannot access another team’s restricted record.
