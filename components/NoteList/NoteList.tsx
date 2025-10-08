import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, deleteNote, type FetchNotesParams } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import css from "./NoteList.module.css";
import NotFound from "@/components/NotFound/NotFound";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

interface NoteListProps {
  currentPage: number;
  search: string;
  tag?: string;
}

const NoteList = ({ currentPage, search, tag }: NoteListProps) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notes", currentPage, search, tag],
    queryFn: () => {
      const params: FetchNotesParams = { page: currentPage, perPage: 12 };
      if (search.trim().length >= 3) {
        params.search = search.trim();
      }
      if (tag) {
        params.tag = tag;
      }
      return fetchNotes(params);
    },
  });

  const { mutate: removeNote, isPending: isDeleting } = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <ErrorMessage />;
  if (!data || data.notes.length === 0) {
    return <NotFound />;
  }

  return (
    <>
      <ul className={css.list}>
        {data.notes.map((note) => (
          <li key={note.id} className={css.listItem}>
            <h2
              className={css.title}
              onClick={() => router.push(`/notes/${note.id}`)}
            >
              {note.title}
            </h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <Link href={`/notes/${note.id}`} className={css.link}>
                View details
              </Link>
              <button
                className={css.button}
                onClick={() => removeNote(note.id)}
                disabled={isDeleting}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
export default NoteList;
