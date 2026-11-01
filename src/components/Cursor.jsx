import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

// Hover anything with data-cursor="Label" to grow the cursor and show the label.
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 42, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 520, damping: 42, mass: 0.35 });
  const [label, setLabel] = useState("");
  const [link, setLink] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target.closest?.("[data-cursor], a, button, input, textarea");
      setLabel(t?.dataset?.cursor || "");
      setLink(!!t && !t.dataset?.cursor);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  const size = label ? 88 : link ? 34 : 10;
  return (
    <motion.div className="cursor" style={{ x: sx, y: sy }} aria-hidden>
      <motion.div
        className="cursor-body"
        animate={{ width: size, height: size, opacity: link && !label ? 0.5 : 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
      >
        {label && <span>{label}</span>}
      </motion.div>
    </motion.div>
  );
}
