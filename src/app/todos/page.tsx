// src/app/todos/page.tsx
import TodoClient from "./TodoClient";

export default function TodosPage() {
  return (
    <div className="shell">
      <div className="glow">
        <div className="card">
          <TodoClient />
        </div>
      </div>
    </div>
  );
}
