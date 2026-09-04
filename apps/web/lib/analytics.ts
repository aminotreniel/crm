"use client";

import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { app } from "./firebase";

/**
 * Firebase Analytics touches `window`, so it can never run during a server
 * render, and it is unsupported in some browsers and privacy modes.
 * `isSupported()` is the documented guard for both. Returns null rather than
 * throwing — analytics failing is never a reason for a demo page to break.
 */
export async function initAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") return null;
  try {
    if (!(await isSupported())) return null;
    return getAnalytics(app);
  } catch {
    return null;
  }
}
