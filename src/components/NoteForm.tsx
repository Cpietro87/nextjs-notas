"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNotes } from "@/context/NoteContext";

function NoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { createNote, selectedNote, setSelectedNote, updateNote } = useNotes();
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedNote) {
      setTitle(selectedNote.title);
      setContent(selectedNote.content || "");
    }
  }, [selectedNote]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (selectedNote) {
          await updateNote(selectedNote.id, {
            title,
            content
          })
          setSelectedNote(null)
        } else {
          await createNote({
            title,
            content,
          });
        }
        setTitle("");
        setContent("");

        titleRef.current?.focus();
      }}
    >
      <input
        type="text"
        name="title"
        autoFocus
        placeholder="Title"
        className="w-full px-4 py-2 text-black bg-white rounded-md 
        focus:online-none focus:ring-2 focus:ring-blue-600 my-2"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        ref={titleRef}
      />
      <textarea
        name="title"
        placeholder="Content"
        className="w-full px-4 py-2 text-black bg-white rounded-md 
        focus:online-none focus:ring-2 focus:ring-blue-600 my-2"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      ></textarea>
      <div className="flex justify-end gap-x-2">
        <button
          className="px-5 py-2 text-white bg-blue-600 
          rounded-md hover:bg-blue-700"
          type="submit"
        >
          {selectedNote ? "Update" : "Create"}
        </button>
        {selectedNote && (
          <button
            className="px-5 py-2 text-white bg-red-600 
          rounded-md hover:bg-blue-700"
            type="button"
            onClick={() => {
              setSelectedNote(null);
              setTitle("");
              setContent("");
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default NoteForm;
