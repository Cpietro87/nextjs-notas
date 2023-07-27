"use client";
import { createContext, useContext, useState } from "react";
import { CreateNote, UpdateNote } from "@/interfaces/Note";
import { Note } from "@prisma/client";

export const NoteContext = createContext<{
  notes: Note[];
  loadNotes: () => Promise<void>;
  createNote: (note: CreateNote) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void;
  updateNote: (id: number, note: UpdateNote) => Promise<void>;
}>({
  notes: [],
  loadNotes: async () => {},
  createNote: async (note: CreateNote) => {},
  deleteNote: async (id: number) => {},
  selectedNote: null,
  setSelectedNote: (note: Note | null) => {},
  updateNote: async (id: number, note: UpdateNote) => {},
});

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNote must be used within a NoteProvide");
  }
  return context;
};

export const NoteProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  async function loadNotes() {
    const res = await fetch("/api/notes");
    const data = await res.json(); // conviento res en en un formato json
    setNotes(data);
  }
  async function createNote(note: CreateNote) {
    const res = await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const newNote = await res.json();
    setNotes([...notes, newNote]);
  }

  async function deleteNote(id: number) {
    const res = await fetch("/api/notes/" + id, {
      method: "DELETE",
    });
    const data = await res.json();
    setNotes(notes.filter((note) => note.id !== id));
  }

  async function updateNote(id: number, note: UpdateNote) {
    const res = await fetch("/api/notes/" + id, {
      method: "PUT",
      body: JSON.stringify(note),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setNotes(notes.map((note) => (note.id === id ? data : note)));
  }

  return (
    <NoteContext.Provider
      value={{
        notes,
        loadNotes,
        createNote,
        deleteNote,
        selectedNote,
        setSelectedNote,
        updateNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
