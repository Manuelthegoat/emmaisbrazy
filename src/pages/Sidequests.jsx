import { sidequests } from "../sidequests";

function SidequestArtwork({ theme }) {
  if (theme === "camera") {
    return (
      <svg className="sidequest-art" viewBox="0 0 520 300" role="img" aria-label="Illustration of a camera framing a scene">
        <rect x="76" y="54" width="368" height="206" rx="20" fill="none" stroke="currentColor" strokeWidth="4" />
        <path d="M76 102h368M140 54v48m240-48v48M76 212h368" fill="none" stroke="currentColor" strokeWidth="2" opacity=".35" />
        <circle cx="260" cy="158" r="58" fill="none" stroke="currentColor" strokeWidth="9" />
        <circle cx="260" cy="158" r="31" fill="currentColor" opacity=".32" />
        <circle cx="397" cy="78" r="9" fill="currentColor" />
        <path d="m194 260 66-64 46 42 36-34 42 56" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" opacity=".58" />
      </svg>
    );
  }

  return (
    <svg className="sidequest-art" viewBox="0 0 520 300" role="img" aria-label="Illustration of a video clapperboard">
      <path d="m112 97 268-36 17 76-268 36z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
      <path d="m112 97 24 73m35-78 24 73m35-78 24 73m35-78 24 73m35-78 24 73" stroke="currentColor" strokeWidth="5" opacity=".55" />
      <rect x="130" y="142" width="270" height="114" rx="8" fill="none" stroke="currentColor" strokeWidth="5" />
      <path d="M160 177h210M160 206h150" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity=".5" />
      <circle cx="352" cy="226" r="12" fill="currentColor" />
    </svg>
  );
}

export default function Sidequests() {
  return (
    <section className="wrap page-top sidequests-page">
      <p className="sidequests-kicker">SIDEQUESTS / 001</p>
      <h1 className="page-title">Life outside the code.</h1>
      <p className="sidequests-intro">I like making things in more than one medium. Here are a couple of creative lanes I’ve been exploring.</p>

      <div className="sidequests-grid">
        {sidequests.map((item) => (
          <article className={`sidequest-card sidequest-${item.theme}`} key={item.number}>
            <div className="sidequest-card-top">
              <span>{item.label}</span>
              <span>{item.number}</span>
            </div>
            <div className="sidequest-visual"><SidequestArtwork theme={item.theme} /></div>
            <div className="sidequest-copy">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <span className="sidequest-detail">{item.detail}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
