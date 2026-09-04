import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db, appPath } from "../../lib/firebase";
import { initialBusinesses } from "./data";
import type { Business } from "./types";

/**
 * Reads fall back to the bundled portfolio.
 *
 * This is a client demo: an empty collection, a cold network, or someone having
 * emptied the shared database must never show an empty CRM in front of a
 * client. Firestore is the source of truth when it has something to say, and
 * the committed data is the floor.
 */
export async function getBusinesses(): Promise<Business[]> {
  try {
    const snap = await getDocs(collection(db, appPath("businesses")));
    if (snap.empty) return initialBusinesses;
    return snap.docs.map((d) => d.data() as Business);
  } catch (err) {
    console.warn("[fincrm] business read failed, serving bundled portfolio:", err);
    return initialBusinesses;
  }
}

/**
 * Persists a single business after an in-app edit — a stage move, a verified
 * document, a completed task, an accepted offer.
 *
 * Fire-and-forget on purpose: the UI has already applied the change optimistically
 * and a failed write must never make the demo feel broken.
 */
export async function saveBusiness(business: Business): Promise<void> {
  try {
    await setDoc(doc(db, appPath("businesses", business.id)), { ...business }, { merge: true });
  } catch (err) {
    console.warn(`[fincrm] write failed for business "${business.id}":`, err);
  }
}
