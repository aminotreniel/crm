# CRM Architecture

## Current implementation

The web application uses the Next App Router. The route page is a server component that renders one client feature boundary for the interactive funding CRM.

```text
apps/web
  app
    page.tsx                     Route composition
    layout.tsx                   Document metadata and global styles
  features/funding
    FundingCRM.tsx               Interactive application controller
    types.ts                     Funding domain contracts
    data.ts                      Demo portfolio and navigation data
    components
      FundingShell.tsx           Grouped navigation and global search
      OperationalViews.tsx       Dashboard, pipeline, work, documents, partners, reports
      BusinessWorkspace.tsx      Borrower record and funding workflow
      Primitives.tsx             Shared badges, metrics, and page headers
```

## Data ownership

The current demo keeps business state in the FundingCRM client controller. The only component allowed to modify a business record is that controller. Child components receive data and explicit callback contracts.

For production, Firestore should become the system of record for businesses, contacts, applications, documents, offers, tasks, and audit events. Cloud Storage should store private documents. Authentication and security rules should enforce advisor, operations, underwriter, compliance, partner, and auditor permissions at the data boundary.

## Core workflow

Lead intake → Pre qualification → Application → Documents → Underwriting → Offer → Funding → Funded

Custom automations should run asynchronously through n8n or Cloud Functions. Every workflow must record a request identifier, prevent duplicate messages or submissions, and make failures visible to the operations queue.

## Delivery path

1. Replace demo data with repository functions that read Firestore.
2. Add authenticated commands for stage changes, document verification, offer acceptance, and task completion.
3. Record immutable activity events server side for every command.
4. Add n8n flows for intake routing, evidence reminders, partner submissions, offer follow up, and compliance expiry alerts.
