import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harbor Financial CRM",
  description: "A commercial-funding CRM concept for guided, high-context capital operations.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
