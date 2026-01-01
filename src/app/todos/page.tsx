import TodoClient from "./TodoClient";

export default function TodosPage() {
  return (
    <main style={{ padding: 24, maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>Todo App</h1>
      <TodoClient />
    </main>
  );
}
