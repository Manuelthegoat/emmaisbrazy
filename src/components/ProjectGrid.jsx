import { Link } from "react-router-dom";
import { Media } from "./Cover";

export default function ProjectGrid({ items, variant = "default" }) {
  if (variant === "archive") {
    return (
      <div className="pgrid work-project-grid">
        {items.map((project) => (
          <Link key={project.slug} to={`/work/${project.slug}`} className="pcard work-project-card" data-cursor="Open">
            <span className="work-project-meta">
              <span className={`work-project-status${project.status === "Live" ? " is-live" : ""}`}><i />{project.status || "In progress"}</span>
              <span>{project.year}</span>
            </span>
            <span className={`pcard-media work-project-media${project.media?.[0]?.type === "image" ? " pcard-media-image" : ""}`}>
              <Media project={project} item={project.media?.[0]} />
            </span>
            <span className="pcard-info work-project-info">
              <span className="pcard-title">{project.title}</span>
              <span className="work-project-arrow" aria-hidden="true">↗</span>
            </span>
            <span className="pcard-sub work-project-kind">{project.kind} · {project.role}</span>
            <span className="pcard-blurb work-project-blurb">{project.blurb}</span>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="pgrid">
      {items.map((project, index) => (
        <Link key={project.slug} to={`/work/${project.slug}`} className={`pcard ${index % 3 === 0 ? "wide" : ""}`} data-cursor="Open">
          <span className={`pcard-media${project.media?.[0]?.type === "image" ? " pcard-media-image" : ""}`}><Media project={project} item={project.media?.[0]} /></span>
          <span className="pcard-info">
            <span className="pcard-title">{project.title}</span>
            <span className="pcard-sub">{project.kind}, {project.year}</span>
          </span>
          <span className="pcard-blurb">{project.blurb}</span>
        </Link>
      ))}
    </div>
  );
}
