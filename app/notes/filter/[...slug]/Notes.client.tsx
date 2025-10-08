"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./Notes.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";

type Props = {
  tag?: string;
};

const NotesClient = ({ tag }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={setSearchTerm} />
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          tag={tag}
        />
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      <NoteList
        currentPage={currentPage}
        search={debouncedSearchTerm}
        tag={tag}
      />

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default NotesClient;
