import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "../data";
import { projects } from "../projects";

export default function Palette({ open, onClose }) {
  const go = useNavigate();
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const input = useRef(null);

  const items = useMemo(
    () => [
      { label: "Home", hint: "Page", run: () => go("/") },
      { label: "Work", hint: "Page", run: () => go("/work") },
      { label: "About", hint: "Page", run: () => go("/about") },
      { label: "Contact", hint: "Page", run: () => go("/contact") },
      ...projects.map((p) => ({ label: p.title, hint: "Project", run: () => go(`/work/${p.slug}`) })),
      { label: "Copy email", hint: profile.email, run: () => navigator.clipboard?.writeText(profile.email) },
      ...profile.socials.map((s) => ({ label: s.label, hint: "Opens in new tab", run: () => window.open(s.href, "_blank", "noopener") })),
    ],
    [go]
  );
  const list = items.filter((it) => it.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    if (open) {
      setQ("");
      setI(0);
      setTimeout(() => input.current?.focus(), 30);
    }
  }, [open]);

  const choose = (it) => {
    onClose();
    it?.run();
  };

  const onKey = (e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowDown") { e.preventDefault(); setI((n) => Math.min(n + 1, list.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setI((n) => Math.max(n - 1, 0)); }
    if (e.key === "Enter") choose(list[i]);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="pal-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
          <motion.div
            className="pal"
            role="dialog"
            aria-label="Command menu"
            initial={{ y: -16, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <input
              ref={input}
              value={q}
              onChange={(e) => { setQ(e.target.value); setI(0); }}
              onKeyDown={onKey}
              placeholder="Go to a page, project or link"
              aria-label="Search commands"
            />
            <ul>
              {list.map((it, n) => (
                <li key={it.label + it.hint}>
                  <button className={n === i ? "on" : ""} onMouseEnter={() => setI(n)} onClick={() => choose(it)}>
                    <span>{it.label}</span>
                    <small>{it.hint}</small>
                  </button>
                </li>
              ))}
              {!list.length && <li className="empty">Nothing matches “{q}”. Try a project name or “contact”.</li>}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
