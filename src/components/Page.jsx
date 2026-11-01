import { useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { toTop } from "../lib/scroll";
import Footer from "./Footer";

const ease = [0.76, 0, 0.24, 1];

// Wraps every route: a curtain drops over the old page, then lifts off the new one.
// The first load plays the same lift as the intro.
export default function Page({ children }) {
  const reduce = useReducedMotion();
  useEffect(() => { toTop(); }, []);
  return (
    <>
      <motion.main
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5, delay: reduce ? 0 : 0.4 } }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
        {children}
        <Footer />
      </motion.main>
      {!reduce && (
        <motion.div
          className="curtain"
          style={{ originY: 0 }}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0, transition: { duration: 0.8, ease, delay: 0.05 } }}
          exit={{ scaleY: 1, transition: { duration: 0.6, ease } }}
        />
      )}
    </>
  );
}
