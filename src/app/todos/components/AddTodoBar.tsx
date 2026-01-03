// src/app/todos/components/AddTodoBar.tsx
"use client";

import React from "react";

export default function AddTodoBar({
  title,
  setTitle,
  onSubmit,
}: {
  title: string;
  setTitle: (v: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <>
      <div style={{ color: "rgba(255,255,255,.55)", fontWeight: 600, marginBottom: 8 }}>
        AddTodoBar
      </div>

      <form onSubmit={onSubmit} className="row">
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo..."
        />
        <button className="btn btnPrimary" type="submit">
          Add
        </button>
      </form>
    </>
  );
}
