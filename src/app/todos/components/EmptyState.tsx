// src/app/todos/components/EmptyState.tsx
export default function EmptyState() {
    return (
      <div className="empty">
        <div className="emptyIcon">✓</div>
        <div style={{ fontWeight: 600, marginBottom: 6 }}>No tasks yet.</div>
        <div style={{ opacity: 0.8 }}>Add some!</div>
      </div>
    );
  }
  