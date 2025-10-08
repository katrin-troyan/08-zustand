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
