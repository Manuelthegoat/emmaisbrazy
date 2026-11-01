import { useEffect, useState } from "react";

const CHARS = "!<>-_\\/[]{}=+*^?#01";
const rand = () => CHARS[Math.floor(Math.random() * CHARS.length)];

// Decodes text from noise. A hidden ghost copy reserves the final width so
// nothing jumps while characters cycle.
export default function Scramble({ text, delay = 0 }) {
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [out, setOut] = useState(() => (reduce ? text : text.replace(/\S/g, rand)));

  useEffect(() => {
    if (reduce) return;
    let raf;
    const start = () => {
      let frame = 0;
      const tick = () => {
        setOut(
          text
            .split("")
            .map((ch, i) => (ch === " " ? " " : frame >= i * 2 + 8 ? ch : rand()))
            .join("")
        );
        frame++;
        if (frame < text.length * 2 + 10) raf = requestAnimationFrame(tick);
        else setOut(text);
      };
      tick();
    };
    const t = setTimeout(start, delay);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [text, delay, reduce]);

  return (
    <span className="scramble" aria-label={text}>
      <span className="scramble-ghost" aria-hidden>{text}</span>
      <span className="scramble-live" aria-hidden>{out}</span>
    </span>
  );
}
