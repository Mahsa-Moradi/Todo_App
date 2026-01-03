// src/app/todos/components/TodoItem.tsx
"use client";

type Todo = { id: string; title: string; done: boolean };

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
}: {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <li className="item">
      <div className="left">
        <div
          className={`circle ${todo.done ? "circleDone" : ""}`}
          onClick={onToggle}
          title="Toggle"
          role="button"
        >
          {todo.done ? "✓" : ""}
        </div>

        <div style={{ minWidth: 0 }}>
          <div className={`title ${todo.done ? "titleDone" : ""}`}>{todo.title}</div>
        </div>

        <span className="pill">{todo.done ? "Done" : "Active"}</span>
      </div>

      <div className="row" style={{ gap: 10 }}>
        <button className="btn btnGhost" onClick={onToggle}>
          {todo.done ? "Undo" : "Done"}
        </button>
        <button className="btn btnDanger" onClick={onDelete} title="Delete">
          🗑
        </button>
      </div>
    </li>
  );
}
