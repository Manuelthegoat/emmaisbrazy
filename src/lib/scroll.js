import Lenis from "lenis";

let lenis = null;

export function startScroll() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  lenis = new Lenis({ lerp: 0.1 });
  let id;
  const raf = (t) => {
    lenis.raf(t);
    id = requestAnimationFrame(raf);
  };
  id = requestAnimationFrame(raf);
  return () => {
    cancelAnimationFrame(id);
    lenis.destroy();
    lenis = null;
  };
}

export const toTop = () =>
  lenis ? lenis.scrollTo(0, { immediate: true }) : window.scrollTo(0, 0);
