import Image from "next/image";
import type { Project } from "@/lib/projects";
import { Arrow } from "@/components/site/arrow";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-screenshot">
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(max-width: 700px) 100vw, 30vw"
          />
        ) : (
          <span>Screenshot coming soon</span>
        )}
      </div>
      <p className="project-eyebrow">{project.label}</p>
      <h3>{project.title}</h3>
      <p className="project-description">{project.description}</p>
      <ul className="stack-list">
        {project.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="project-links">
        <a href={project.github} target="_blank" rel="noreferrer">
          GitHub <Arrow />
        </a>
        {project.preview ? (
          <a href={project.preview} target="_blank" rel="noreferrer">
            Live preview <Arrow />
          </a>
        ) : (
          <span aria-disabled="true">
            Live preview <Arrow />
          </span>
        )}
      </div>
    </article>
  );
}
