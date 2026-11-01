// Generated artwork used until you add real images/video to a project.
// `variant` shifts the gradients so gallery pieces don't look identical.
export default function Cover({ project, variant = 0, titled = true }) {
  const h = project.hue;
  const style = {
    "--h": h,
    "--h2": (h + 70) % 360,
    "--x": `${20 + ((variant * 31) % 60)}%`,
    "--y": `${15 + ((variant * 47) % 60)}%`,
  };
  return (
    <div className="cover" style={style}>
      {titled && <span className="cover-title">{project.title}</span>}
    </div>
  );
}

export function Media({ project, item }) {
  if (item?.type === "video")
    return <video className="media" src={item.src} autoPlay muted loop playsInline />;
  if (item?.src)
    return <img className="media" src={item.src} alt={item.alt || project.title} loading="lazy" />;
  return <Cover project={project} variant={item?.variant ?? 0} />;
}
