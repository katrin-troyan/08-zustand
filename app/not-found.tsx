import { Metadata } from "next";
import Link from "next/link";
import css from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page Not Found — NoteHub",
  description:
    "Sorry, the page you are looking for does not exist or may have been removed.",
  openGraph: {
    title: "Page Not Found — NoteHub",
    description:
      "404 — The page you are trying to reach does not exist. Check the URL or return to the NoteHub homepage.",
    url: "https://notehub.com/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub 404 Page",
      },
    ],
    type: "website",
  },
};

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <p>
        Go back to <Link href="/">homepage</Link>
      </p>
    </div>
  );
}
