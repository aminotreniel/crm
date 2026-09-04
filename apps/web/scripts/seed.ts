/**
 * Seeds the funding CRM demo portfolio into the shared Firestore project.
 *
 *   npm run seed
 *
 * Idempotent: each business is written at a deterministic path with `set`, so
 * rerunning restores the portfolio to a known-good state. Because the demo runs
 * with open write rules, this is the repair tool if a visitor writes junk.
 *
 * Uses the client SDK rather than firebase-admin — the rules are open, so no
 * service-account key is needed and nothing secret has to exist anywhere.
 */
import { initializeApp } from "firebase/app";
import { getFirestore, doc, writeBatch, serverTimestamp } from "firebase/firestore";
import { initialBusinesses } from "../features/funding/data";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyCxucNZL7FHZO7fS2pzshnB5veACKZaJ1I",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "alldb-a1804.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "alldb-a1804",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "alldb-a1804.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "397138423193",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:397138423193:web:88a338e16f85761112b708",
};

const APP_ID = "fincrm";
const db = getFirestore(initializeApp(firebaseConfig));

/** Capital partners shown in the partners view — seeded so the collection is
 *  never empty even though the current UI renders a static list. */
const partners = [
  { id: "cortada-direct", name: "Cortada Direct", products: "Working capital, term loans", ticket: "$50k – $2M", decision: "Same day", appetite: "Broad" },
  { id: "atlas-capital", name: "Atlas Capital", products: "Term loans", ticket: "$100k – $5M", decision: "2 business days", appetite: "Prime only" },
  { id: "harbor-line", name: "Harbor Line Funding", products: "Lines of credit", ticket: "$25k – $750k", decision: "24 hours", appetite: "Moderate risk" },
  { id: "meridian-equipment", name: "Meridian Equipment Finance", products: "Equipment finance", ticket: "$75k – $3M", decision: "3 business days", appetite: "Asset backed" },
];

async function main() {
  const batch = writeBatch(db);

  batch.set(doc(db, `apps/${APP_ID}`), {
    name: "Cortada Funding CRM",
    description: "Commercial funding CRM prototype. UI demo backed by Firestore.",
    repo: "aminotreniel/crm",
    seededAt: new Date().toISOString(),
    lastSeedAt: serverTimestamp(),
  });

  for (const business of initialBusinesses) {
    batch.set(doc(db, `apps/${APP_ID}/businesses/${business.id}`), { ...business });
  }
  for (const partner of partners) {
    batch.set(doc(db, `apps/${APP_ID}/partners/${partner.id}`), { ...partner, seeded: true });
  }

  await batch.commit();
  console.log(`Done. ${initialBusinesses.length} businesses, ${partners.length} capital partners into apps/${APP_ID}.`);
}

main().then(() => process.exit(0)).catch((err) => { console.error("Seed failed:", err); process.exit(1); });
