"use client";
import React, { useContext, useRef, useState } from "react";
import { useNotes } from "@/context/NoteContext";

function NoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { createNote } = useNotes();
  const titleRef = useRef<HTMLInputElement>(null)

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await createNote({
          title,
          content,
        });
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
      <button
        className="px-5 py-2 text-white bg-blue-600 rounded-md
      hover:bg-blue-700"
      >
        Save
      </button>
    </form>
  );
}

export default NoteForm;
