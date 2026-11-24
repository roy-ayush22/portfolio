export type Project = {
  title: string;
  label: string;
  description: string;
  stack: string[];
  github: string;
  image?: { src: string; alt: string };
  preview?: string;
};

export const projects: Project[] = [
  {
    title: "EE Assistant",
    label: "RAG assistant",
    description:
      "AI assistant for electrical engineering questions, grounded in relevant source material.",
    stack: ["FastAPI", "React", "Qwen API"],
    github: "https://github.com/roy-ayush22/rag-assistant",
    image: { src: "/rag-ss.png", alt: "EE Assistant application screenshot" },
    preview: "https://motor-rag-assistant.vercel.app/"
  },
  {
    title: "Echo",
    label: "Real-time messaging",
    description:
      "A real-time messaging app built with WebSockets and a TypeScript backend.",
    stack: ["WebSocket", "TypeScript", "Node.js"],
    github: "https://github.com/roy-ayush22/echo",
  },
  {
    title: "Portfolio",
    label: "",
    description: "",
    stack: ["TypeScript", "Node.js", "Next.js"],
    github: "https://github.com/roy-ayush22",
    image: { src: "/portfolio-ss.png", alt: "portfolio website screenshot" },
  },
];

export const interests = ["AI / ML", "Python", "Go", "Web3"];
