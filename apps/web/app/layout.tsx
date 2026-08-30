import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cortada Financial CRM",
  description: "Client relationships, guided work, and an auditable activity record.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
