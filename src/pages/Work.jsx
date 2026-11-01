import { useMemo, useState } from "react";
import ProjectGrid from "../components/ProjectGrid";
import { projects } from "../projects";

const kinds = ["All", ...new Set(projects.map((project) => project.kind))];

export default function Work() {
  const [kind, setKind] = useState("All");
  const [query, setQuery] = useState("");
  const items = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesKind = kind === "All" || project.kind === kind;
      const matchesQuery = !normalizedQuery || [project.title, project.kind, project.blurb, project.stack?.join(" ")]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
      return matchesKind && matchesQuery;
    });
  }, [kind, query]);

  return (
    <section className="section wrap page-top work-page">
      <p className="work-eyebrow">SELECTED PROJECTS</p>
      <h1 className="page-title">Work</h1>
      <label className="work-search">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects" aria-label="Search projects" />
        {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search">×</button>}
      </label>
      <div className="work-filters" role="tablist" aria-label="Filter projects by type">
        {kinds.map((item) => (
          <button key={item} role="tab" aria-selected={kind === item} className={kind === item ? "on" : ""} onClick={() => setKind(item)}>{item}</button>
        ))}
      </div>
      {items.length === 0 ? <p className="empty-note">No matching projects yet.</p> : <ProjectGrid items={items} variant="archive" />}
    </section>
  );
}
