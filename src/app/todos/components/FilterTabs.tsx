// src/app/todos/components/FilterTabs.tsx
"use client";

export type Filter = "all" | "active" | "done";

export default function FilterTabs({
  value,
  onChange,
}: {
  value: Filter;
  onChange: (v: Filter) => void;
}) {
  return (
    <div className="tabs">
      <button className={`tab ${value === "all" ? "tabActive" : ""}`} onClick={() => onChange("all")}>
        All
      </button>
      <button className={`tab ${value === "active" ? "tabActive" : ""}`} onClick={() => onChange("active")}>
        Active
      </button>
      <button className={`tab ${value === "done" ? "tabActive" : ""}`} onClick={() => onChange("done")}>
        Done
      </button>
    </div>
  );
}
