import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { profile } from "../data";

export default function Nav({ onPalette }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("emma-theme") || "light"; }
    catch { return "light"; }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("emma-theme", theme); } catch {}
  }, [theme]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [menuOpen]);

  return (
    <>
    <button className={`mobile-menu-toggle${menuOpen ? " is-open" : ""}`} type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={menuOpen} aria-controls="site-navigation">
      <span /><span />
    </button>
    {menuOpen && <button className="nav-backdrop" type="button" onClick={() => setMenuOpen(false)} aria-label="Close navigation menu" />}
    <header className={`nav${menuOpen ? " nav-open" : ""}`} id="site-navigation">
      <Link to="/" className="nav-logo" aria-label="Emma home" onClick={() => setMenuOpen(false)}><span className="nav-wordmark">emmaiabrazy.</span></Link>
      <nav className="nav-links" aria-label="Main">
        <NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
        <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
        <NavLink to="/work" onClick={() => setMenuOpen(false)}>Projects</NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
        <a href={profile.resume} target="_blank" rel="noreferrer">Resume ↗</a>
      </nav>
      <div className="nav-right">
        <button className="theme-toggle" type="button" onClick={() => setTheme((current) => current === "light" ? "dark" : "light")} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
          <span className="theme-icon" aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span>
          <span className="theme-label">{theme === "light" ? "Dark mode" : "Light mode"}</span>
        </button>
      </div>
      <div className="nav-bottom"><span>© 2026 Emma</span></div>
    </header>
    </>
  );
}
