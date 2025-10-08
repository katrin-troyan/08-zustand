"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./Notes.module.css";
import Link from "next/link";

type Props = {
  tag?: string;
};

const NotesClient = ({ tag }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={setSearchTerm} />
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          tag={tag}
        />
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      <NoteList
        currentPage={currentPage}
        search={debouncedSearchTerm}
        tag={tag}
      />
    </div>
  );
};

export default NotesClient;
