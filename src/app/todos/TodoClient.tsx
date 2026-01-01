"use client";

import { useEffect, useState } from "react";

type Todo = {
  id: string;
  title: string;
  done: boolean;
  createdAt: string;
};

export default function TodoClient() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/todos")
      .then((r) => r.json())
      .then((data) => setTodos(data))
      .finally(() => setLoading(false));
  }, []);

  async function addTodo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: t }),
    });

    const created = (await res.json()) as Todo;
    setTodos((prev) => [created, ...prev]);
    setTitle("");
  }

  async function toggleDone(todo: Todo) {
    const res = await fetch(`/api/todos/${todo.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !todo.done }),
    });

    const updated = (await res.json()) as Todo;
    setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
  }

  async function removeTodo(id: string) {
    await fetch(`/api/todos/${id}`, { method: "DELETE" });
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  if (loading) return <p>Loading...</p>;

  return (
    <section>
      <form onSubmit={addTodo} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo..."
          style={{ flex: 1, padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
        />
        <button type="submit" style={{ padding: "10px 16px", borderRadius: 10 }}>
          Add
        </button>
      </form>

      {todos.length === 0 ? (
        <p>No tasks yet. Add some!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {todos.map((t) => (
            <li
              key={t.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <span
                onClick={() => toggleDone(t)}
                style={{
                  cursor: "pointer",
                  textDecoration: t.done ? "line-through" : "none",
                }}
                title="Toggle done"
              >
                {t.title}
              </span>

              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => toggleDone(t)}>{t.done ? "Undo" : "Done"}</button>
                <button onClick={() => removeTodo(t.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
