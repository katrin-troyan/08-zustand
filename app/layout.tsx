import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "NoteHub - your hub for notes",
  description:
    "NoteHub is a convenient application for creating, saving, and organizing your notes.",
  openGraph: {
    title: "NoteHub - your hub for notes",
    description:
      "Organize your thoughts and tasks with the convenient NoteHub app.",
    url: "https://notehub.com",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub Open Graph Image",
      },
    ],
    type: "website",
  },
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <div className="layout">
            <Header />
            <main className="content">
              {children} {modal}
            </main>
            <Footer />
          </div>
        </TanStackProvider>
      </body>
    </html>
  );
}
