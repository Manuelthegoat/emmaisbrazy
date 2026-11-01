import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { Media } from "./Cover";

// Big-type index. Hovering a row dims the rest and a preview card follows the
// cursor, tilting with its speed. On touch screens each row shows a thumbnail.
export default function ProjectList({ items }) {
  const [active, setActive] = useState(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rot = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 170, damping: 22 });
  const sy = useSpring(y, { stiffness: 170, damping: 22 });
  const sr = useSpring(rot, { stiffness: 140, damping: 14 });
  const last = useRef(0);
  const timer = useRef();

  const onMove = (e) => {
    x.set(e.clientX);
    y.set(e.clientY);
    rot.set(Math.max(-10, Math.min(10, (e.clientX - last.current) * 0.5)));
    last.current = e.clientX;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => rot.set(0), 90);
  };

  return (
    <div className="plist" onMouseMove={onMove} onMouseLeave={() => setActive(null)}>
      {items.map((p) => (
        <Link
          key={p.slug}
          to={`/work/${p.slug}`}
          className="prow"
          data-cursor="Open"
          onMouseEnter={() => setActive(p)}
          onFocus={() => setActive(p)}
          onBlur={() => setActive(null)}
        >
          <span className="prow-thumb"><Media project={p} item={p.media?.[0]} /></span>
          <span className="prow-main">
            <span className="prow-title">{p.title}</span>
            {!p.caseStudy && <span className="prow-wip">Case study in progress</span>}
          </span>
          <span className="prow-meta">{p.kind}<br />{p.role}</span>
          <span className="prow-year">{p.year}</span>
        </Link>
      ))}

      <motion.div className="peek" style={{ x: sx, y: sy }} aria-hidden>
        <AnimatePresence mode="popLayout">
          {active && (
            <motion.div
              key={active.slug}
              className="peek-card"
              style={{ rotate: sr }}
              initial={{ clipPath: "inset(0 0 100% 0)", scale: 0.92 }}
              animate={{ clipPath: "inset(0 0 0% 0)", scale: 1 }}
              exit={{ clipPath: "inset(100% 0 0 0)", scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            >
              <Media project={active} item={active.media?.[0]} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
