// src/app/todos/TodoClient.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import AddTodoBar from "./components/AddTodoBar";
import EmptyState from "./components/EmptyState";
import FilterTabs, { Filter } from "./components/FilterTabs";
import TodoItem from "./components/TodoItem";

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
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    fetch("/api/todos")
      .then((r) => r.json())
      .then((data: Todo[]) => setTodos(data))
      .finally(() => setLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.done);
    if (filter === "done") return todos.filter((t) => t.done);
    return todos;
  }, [todos, filter]);

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

  return (
    <>
      <div className="header">
        <div className="h1">TODO APP</div>
        <div className="count">{todos.length} tasks</div>
      </div>

      <AddTodoBar title={title} setTitle={setTitle} onSubmit={addTodo} />

      <FilterTabs value={filter} onChange={setFilter} />

      <div className="hr" />

      {loading ? (
        <div style={{ color: "rgba(255,255,255,.6)" }}>Loading...</div>
      ) : visibleTodos.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="list">
          {visibleTodos.map((t) => (
            <TodoItem
              key={t.id}
              todo={t}
              onToggle={() => toggleDone(t)}
              onDelete={() => removeTodo(t.id)}
            />
          ))}
        </ul>
      )}
    </>
  );
}
