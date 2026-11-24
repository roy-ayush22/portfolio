import type { ReactNode } from "react";
import { interests, projects } from "@/lib/projects";
import { Arrow } from "@/components/site/arrow";
import { ProjectCard } from "@/components/portfolio/project-card";

function SectionHeading({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="section-heading">
      <span className="section-index">{number}</span>
      <h2>{children}</h2>
    </div>
  );
}

export function PortfolioPage() {
  return (
    <div className="portfolio">
      <section className="hero" id="about" aria-labelledby="intro-title">
        <p className="kicker">Hello, I&apos;m</p>
        <h1 id="intro-title">Ayush Roy.</h1>
        <p className="role">
          Software engineer building AI and backend systems.
        </p>
        <p className="bio">
          I turn ideas into useful software, with a focus on intelligent
          products, dependable systems, and thoughtful details.
        </p>
        <a className="resume-link" href="/Ayush_Roy_Resume.pdf" download>
          Download résumé <Arrow />
        </a>
      </section>

      <section
        className="portfolio-section"
        id="projects"
        aria-labelledby="projects-title"
      >
        <SectionHeading number="01">
          <span id="projects-title">Projects</span>
        </SectionHeading>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      <section
        className="portfolio-section"
        id="interests"
        aria-labelledby="interests-title"
      >
        <SectionHeading number="02">
          <span id="interests-title">Interests</span>
        </SectionHeading>
        <ul className="interest-list">
          {interests.map((interest) => (
            <li key={interest}>{interest}</li>
          ))}
        </ul>
      </section>

      <section
        className="portfolio-section contact"
        id="links"
        aria-labelledby="contact-title"
      >
        <SectionHeading number="03">
          <span id="contact-title">Let&apos;s connect</span>
        </SectionHeading>
        <div className="contact-links">
          <a
            href="https://github.com/roy-ayush22"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <Arrow />
          </a>
          <a
            href="https://www.linkedin.com/in/ayushroy22"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <Arrow />
          </a>
          <a href="mailto:ayush30085@gmail.com">
            Email <Arrow />
          </a>
          <a href="https://x.com/mynameislsr" target="_blank" rel="noreferrer">
            X <Arrow />
          </a>
        </div>
      </section>
    </div>
  );
}
