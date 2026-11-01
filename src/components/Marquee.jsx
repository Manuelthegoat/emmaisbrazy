export default function Marquee({ words }) {
  const row = [...words, ...words];
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {row.map((w, i) => <span key={i}>{w}</span>)}
      </div>
    </div>
  );
}
