import axios from "axios";
import { type Note } from "@/types/note";

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteParams {
  title: string;
  content: string;
  tag?: string;
}

export interface NoteListResponse {
  notes: Note[];
  total: number;
}

export type Tag = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] =
  `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchNotes = async (
  params: FetchNotesParams = { page: 1, perPage: 12 }
): Promise<FetchNotesResponse> => {
  await delay(500);
  const res = await axios.get<FetchNotesResponse>("/notes", { params });
  return res.data;
};

export const createNote = async (data: CreateNoteParams): Promise<Note> => {
  const res = await axios.post<Note>("/notes", data);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await axios.delete<Note>(`/notes/${id}`);
  return res.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
};
