import React from "react";
import { Note } from "@prisma/client";
import { useNotes } from "@/context/NoteContext";

function NotedCard({ note }: { note: Note }) {
  const { deleteNote, setSelectedNote } = useNotes();
  return (
    <div key={note.id} className="bg-slate-400 p-4 m-2 flex justify-between">
      <div>
        <h1 className="text-2xl font-bold">{note.title}</h1>
        <p>{note.content}</p>
      </div>
      <div className="flex gap-x-2">
        <button
           onClick={async () => {
            if (confirm("Are you sure you want to delete this note?")) {
              await deleteNote(Number(note.id));
            }
          }}
        >
          Delete
        </button>
        <button onClick={() => {
          setSelectedNote(note)
        }}
        >Edit</button>
      </div>
    </div>
  );
}

export default NotedCard;
