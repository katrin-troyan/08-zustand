// components/NoteForm/NoteForm.tsx
"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createNote, type CreateNoteParams } from "@/lib/api";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import css from "./NoteForm.module.css";

const NoteForm = () => {
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      router.push("/notes/filter/all");
    },
  });

  const handleSubmit = (formData: FormData) => {
    const valuesObj = Object.fromEntries(formData);

    const values: CreateNoteParams = {
      title: valuesObj.title as string,
      content: valuesObj.content as string,
      tag: valuesObj.tag ? (valuesObj.tag as string) : undefined,
    };
    mutate(values);
  };

  const handleCancel = () => router.push("/notes/filter/all");

  return (
    <form action={handleSubmit} className={css.form}>
      <label className={css.formGroup}>
        <span>Title</span>
        <input
          name="title"
          type="text"
          defaultValue={draft?.title}
          onChange={handleChange}
          required
          className={css.input}
        />
      </label>

      <label className={css.formGroup}>
        <span>Content</span>
        <textarea
          name="content"
          rows={6}
          defaultValue={draft?.content}
          onChange={handleChange}
          className={css.textarea}
        ></textarea>
      </label>

      <label className={css.formGroup}>
        <span>Tag</span>
        <select
          name="tag"
          defaultValue={draft?.tag}
          onChange={handleChange}
          className={css.select}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </label>

      <div className={css.actions}>
        <button
          type="button"
          onClick={handleCancel}
          className={css.cancelButton}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
