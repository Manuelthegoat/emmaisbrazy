import { Link } from "react-router-dom";
import { profile } from "../data";

const currently = [
  { label: "Learning", detail: "Computer science, problem-solving, and new ways to build reliable software." },
  { label: "Building", detail: "Web, mobile, and onchain products with React, Next.js, Vite, React Native, Express, Supabase, Solidity, and Rust." },
];

const contextFor = (title) => {
  if (title.toLowerCase().includes("freelance")) return "Independent";
  if (title.toLowerCase().includes("open-source")) return "Community";
  return "Education";
};

const toolMarks = {
  React: [["react", "61DAFB"]],
  "Next.js": [["nextdotjs", "FFFFFF"]],
  Vite: [["vite", "646CFF"]],
  JavaScript: [["javascript", "F7DF1E"]],
  "HTML & CSS": [["html5", "E34F26"], ["css", "663399"]],
  Motion: [["framer", "0055FF"]],
  "React Native": [["react", "61DAFB"]],
  Expo: [["expo", "FFFFFF"]],
  Express: [["express", "FFFFFF"]],
  Supabase: [["supabase", "3FCF8E"]],
  Solidity: [["solidity", "363636"]],
  Rust: [["rust", "CE412B"]],
  Git: [["git", "F05032"]],
  Figma: [["figma", "F24E1E"]],
};

export default function About() {
  return (
    <section className="wrap page-top about-page">
      <p className="about-kicker">ABOUT</p>
      <h1 className="page-title about-title">A little about me</h1>

      <section className="about-bio" aria-labelledby="about-bio-title">
        <h2 id="about-bio-title">Bio</h2>
        <div className="about-bio-copy">
          <p>I’m Emmanuel, a software engineer and computer science student in Nigeria. Online, I go by <span className="name-font">emmaisbrazy</span>.</p>
          <p>I build across web, mobile, backend, and blockchain with React, Next.js, Vite, React Native, Express, Supabase, Solidity, and Rust.</p>
          <p>I like taking a rough idea and turning it into a product people can use, from the interface and API to the data, deployment, and all the details in between. Have a look at <Link to="/work" className="ulink">my projects</Link>, or <a href={`mailto:${profile.email}`} className="ulink">get in touch</a>.</p>
        </div>
      </section>

      <section className="about-current" aria-labelledby="about-current-title">
        <div className="about-section-heading">
          <p className="about-kicker">RIGHT NOW</p>
          <h2 id="about-current-title">Currently</h2>
        </div>
        <div className="currently-grid">
          {currently.map((item, index) => (
            <article className={`currently-card currently-card-${index + 1}`} key={item.label}>
              <span className="currently-index">0{index + 1}</span>
              <h3>{item.label}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-tools" aria-labelledby="about-tools-title">
        <div className="tools-section-heading">
          <h2 id="about-tools-title">TOOLS</h2>
          <span aria-hidden="true" />
        </div>
        <div className="tool-list">
          {Object.values(profile.skills).flat().map((tool) => {
            const marks = toolMarks[tool] || [];
            return (
              <span className="tool-chip" key={tool}>
                <span className="tool-marks" aria-hidden="true">
                  {marks.map(([slug, color]) => (
                    <img key={slug} src={`https://cdn.simpleicons.org/${slug}/${color}`} alt="" loading="lazy" />
                  ))}
                </span>
                <span>{tool}</span>
              </span>
            );
          })}
        </div>
      </section>

      <section className="about-work" aria-labelledby="about-work-title">
        <div className="work-section-heading">
          <h2 id="about-work-title">WORK</h2>
          <span aria-hidden="true" />
        </div>
        <div className="work-cards">
          {profile.experience.map((item, index) => {
            const organization = item.company || contextFor(item.title);
            const mark = item.mark || organization.slice(0, 2).toUpperCase();
            return (
              <article className={`work-card work-card-${index + 1}`} key={`${organization}-${item.when}`}>
                <div className="work-card-meta">
                  <span>{item.when}</span>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="work-card-brand" aria-hidden="true">
                    {item.logo ? <img src={item.logo} alt="" /> : <span>{mark}</span>}
                </div>
                <div className="work-card-content">
                  <h3>{organization}</h3>
                  <p className="work-role">{item.role || item.title}</p>
                  <p>{item.note}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </section>
  );
}
