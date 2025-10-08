import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || [];
  const tag = slug[0] === "all" || !slug.length ? undefined : slug[0];

  return {
    title: tag ? `Notes filtered by: ${tag}` : "All Notes — NoteHub",
    description: tag
      ? `Browse all notes with the "${tag}" tag.`
      : "Explore all available notes in NoteHub.",
    openGraph: {
      title: tag ? `Notes filtered by: ${tag}` : "All Notes — NoteHub",
      description: tag
        ? `View notes filtered by the "${tag}" tag in NoteHub.`
        : "Discover and organize your notes in NoteHub.",
      url: `https://notehub.com/notes/filter/${tag || "all"}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: tag ? `Notes filtered by ${tag}` : "All Notes",
        },
      ],
      type: "article",
    },
  };
}

export default async function NotesFilteredPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || [];
  const tag = slug[0] === "all" || !slug.length ? undefined : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
