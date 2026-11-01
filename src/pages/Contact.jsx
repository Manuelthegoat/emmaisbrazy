import { profile } from "../data";

const socialIcons = {
  Email: <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m4 7 8 6 8-6" /></svg>,
  GitHub: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4.5 1.5-4.5-2.5-6.5-3m13 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 19.5 4.77 5.07 5.07 0 0 0 19.41 1S18.23.65 15.5 2.48a13.38 13.38 0 0 0-7 0C5.77.65 4.59 1 4.59 1a5.07 5.07 0 0 0-.09 3.77A5.44 5.44 0 0 0 3 8.53c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 8.5 18.15V22" /></svg>,
  X: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.43L5.55 22H2.4l7.25-8.29L1.8 2h6.4l4.42 6.96L18.9 2Zm-1.1 18h1.73L7.27 3.9H5.42L17.8 20Z" /></svg>,
};

const reach = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  ...profile.socials.map((social) => ({ label: social.label === "X" ? "X / TWITTER" : social.label, value: social.href.replace(/^https?:\/\//, ""), href: social.href })),
];

export default function Contact() {
  return (
    <section className="wrap page-top contact-page">
      <h1 className="page-title">Let’s talk.</h1>
      <p className="contact-intro">Email is the quickest way to reach me. I’m happy to talk about a role, a project, or an interesting problem.</p>

      <section className="contact-reach" aria-labelledby="contact-reach-title">
        <div className="contact-reach-heading">
          <h2 id="contact-reach-title">REACH</h2>
          <span aria-hidden="true" />
        </div>
        <div className="contact-links">
          {reach.map((item) => (
            <a className="contact-link" href={item.href} key={item.label} target={item.label === "Email" ? undefined : "_blank"} rel={item.label === "Email" ? undefined : "noreferrer"}>
              <span className="contact-link-icon">{socialIcons[item.label === "X / TWITTER" ? "X" : item.label]}</span>
              <span className="contact-link-label">{item.label}</span>
              <span className="contact-link-value">{item.value}</span>
              <span className="contact-link-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>
    </section>
  );
}
