import { Link, useParams } from "react-router-dom";
import ParallaxMedia from "../components/ParallaxMedia";
import { projects } from "../projects";
import NotFound from "./NotFound";

export default function Project() {
  const { slug } = useParams();
  const i = projects.findIndex((p) => p.slug === slug);
  if (i < 0) return <NotFound />;
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const gallery = p.media?.length > 1 ? p.media.slice(1) : [1, 2, 3].map((variant) => ({ variant }));

  return (
    <article className="wrap page-top">
      <Link to="/work" className="ulink back">Back to work</Link>
      <h1 className="pd-title">{p.title}</h1>
      <p className="lead pd-blurb">{p.blurb}</p>

      <dl className="pd-meta">
        <div><dt>Role</dt><dd>{p.role}</dd></div>
        <div><dt>Client</dt><dd>{p.client}</dd></div>
        <div><dt>Year</dt><dd>{p.year}</dd></div>
        <div><dt>Status</dt><dd>{p.status}</dd></div>
        <div><dt>Stack</dt><dd>{p.stack.join(", ")}</dd></div>
        <div>
          <dt>Links</dt>
          <dd>
            {p.links.live && <a className="ulink" href={p.links.live} target="_blank" rel="noreferrer">Live site</a>}
            {p.links.github && <a className="ulink" href={p.links.github} target="_blank" rel="noreferrer">Source</a>}
            {!p.links.live && !p.links.github && "Not public"}
          </dd>
        </div>
      </dl>

      <ParallaxMedia project={p} item={p.media?.[0] || { variant: 0 }} />

      {p.caseStudy ? (
        <>
          <div className="pd-text">
            <section><h2>Overview</h2><p>{p.overview}</p></section>
            <section><h2>The problem</h2><p>{p.challenge}</p></section>
            <section><h2>What I built</h2><p>{p.solution}</p></section>
          </div>
          <ul className="pd-highlights">
            {p.highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
          <div className="pd-gallery">
            {gallery.map((m, n) => (
              <ParallaxMedia key={n} project={p} item={m} ratio={n % 3 === 0 ? "16 / 9" : "4 / 3"} />
            ))}
          </div>
        </>
      ) : (
        <div className="wip">
          <h2>Case study in progress</h2>
          <p>I'm still writing this one up. If you want the story now, <Link to="/contact" className="ulink">send me a message</Link>.</p>
        </div>
      )}

      <Link to={`/work/${next.slug}`} className="next" data-cursor="Next">
        <span>Next project</span>
        <strong>{next.title}</strong>
      </Link>
    </article>
  );
}
