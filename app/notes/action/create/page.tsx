import type { Metadata } from "next";

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import CreateNoteClient from "./CreateNote.client";

export const metadata: Metadata = {
  title: "Create a new note — NoteHub",
  description: "Start writing a new note in your personal NoteHub workspace.",
  openGraph: {
    title: "Create a new note — NoteHub",
    description: "Quickly add new notes in your NoteHub account.",
    url: "https://notehub.com/notes/action/create",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Create new note page - NoteHub",
      },
    ],
    type: "website",
  },
};

const NoteDetails = async () => {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateNoteClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
