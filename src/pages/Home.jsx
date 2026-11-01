import { Link } from "react-router-dom";
import { motion } from "motion/react";
import Field from "../components/Field";
import ProjectGrid from "../components/ProjectGrid";
import Marquee from "../components/Marquee";
import { profile } from "../data";
import { projects } from "../projects";

function SocialIcon({ name }) {
  const shared = { viewBox: "0 0 24 24", "aria-hidden": true, focusable: "false" };
  if (name.toLowerCase() === "github") return <svg {...shared}><path fill="currentColor" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.67-3.75-1.32-3.75-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.29-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.15 3.05-1.15.61 1.54.23 2.67.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.23-5.1 5.51.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" /></svg>;
  if (name.toLowerCase() === "x") return <svg {...shared}><path fill="currentColor" d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.36L5.6 22H2.48l7.25-8.29L1.8 2h6.4l4.43 6.75L18.9 2Zm-1.1 17.9h1.73L7.27 4H5.41L17.8 19.9Z" /></svg>;
  if (name.toLowerCase() === "linkedin") return <svg {...shared}><path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 10H5.67v8h2.67v-8ZM7 5.9a1.55 1.55 0 1 0 0 3.1 1.55 1.55 0 0 0 0-3.1ZM18.34 13.42c0-2.41-1.29-3.53-3.01-3.53a2.6 2.6 0 0 0-2.34 1.29V10h-2.67v8h2.67v-4.2c0-1.1.21-2.17 1.58-2.17 1.35 0 1.36 1.26 1.36 2.24V18h2.67v-4.58Z" /></svg>;
  return <svg {...shared}><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

export default function Home() {
  const words = Object.values(profile.skills).flat();
  const socials = profile.socials.filter((social) => {
    try { return new URL(social.href).pathname !== "/"; }
    catch { return false; }
  });
  return (
    <>
      <section className="hero home-hero">
        <Field />
        <div className="hero-inner wrap">
          <motion.div className="hero-row intro-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }}>
            <h1 className="intro-copy"><span className="intro-lead">Hey there, I’m <span className="name-font intro-handle">Emmanuel</span>.</span><span className="intro-detail">I’m known as <span className="name-font intro-handle">emmaisbrazy</span> on the internet, and I’m a software engineer in Nigeria. I like building useful things and solving problems, especially when the result feels good enough that people want to keep using it. I work across web, mobile, backend, and blockchain with React, Next.js, Vite, React Native, Express, Supabase, Solidity, and Rust.</span></h1>
          </motion.div>
        </div>
      </section>

      <section className="section wrap home-projects" id="work">
        <div className="sec-head">
          <div>
            <p className="projects-kicker">A FEW THINGS I’VE MADE</p>
            <h2>Side projects</h2>
          </div>
          <Link to="/work" className="ulink">View all projects ↗</Link>
        </div>
        <ProjectGrid items={projects.slice(0, 3)} />
      </section>

      {socials.length > 0 && (
        <section className="section wrap home-socials" aria-labelledby="find-online-title">
          <div className="socials-heading">
            <p className="projects-kicker">LET’S CONNECT</p>
            <h2 id="find-online-title">Find me online</h2>
          </div>
          <div className="social-cards">
            {socials.map((social) => (
              <a className="social-card" key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={`Visit my ${social.label} profile`}>
                <span className="social-icon"><SocialIcon name={social.label} /></span>
                <span className="social-name">{social.label}</span>
                <span className="social-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </section>
      )}

      <Marquee words={words} />

      <section className="section wrap split">
        <h2>Built to be used, not just looked at.</h2>
        <div>
          <p className="lead">{profile.bio[0]}</p>
          <Link to="/about" className="ulink">More about me</Link>
        </div>
      </section>
    </>
  );
}
