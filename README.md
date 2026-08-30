# Harbor Financial CRM

The commercial-funding CRM interface is underway. It is an interactive, local demo slice for the Cortada workflow—not a production system yet.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

The current UI lets you search borrower businesses, work a commercial-funding pipeline, create a pre-qualification application, advance application stages, log activities, complete tasks, verify document metadata, record offer acceptance, and inspect workflow/audit records. Changes are held in browser memory for the active session and deliberately labelled **SYNTHETIC DATA**.

## What is in place

- Next.js + TypeScript web workspace
- A designed, responsive Cortada capital-operations workspace
- Borrower Business 360 with owners/guarantors, funding request, documents, underwriting, offers, activities, and audit history
- Dashboard, funding pipeline, operations queue, document-exception queue, capital-partner view, and reporting view
- Controlled application-stage actions, document verification, task completion, adviser notes, and offer acceptance
- Sample synthetic commercial-funding data only
- PostgreSQL local-development service definition

## Next build slice

Replace the demo store with the NestJS API, PostgreSQL/Prisma migrations, OIDC authentication, record-level authorization, encrypted document storage, consent capture, and append-only audit events. See `PLAN.md` and `BUILD_PROMPT.md` for the governing product and implementation direction.

## Safety note

Do not use this prototype to hold real client data. It has not yet implemented production authentication, authorization, encryption, retention, audit immutability, document scanning, or compliance controls.
