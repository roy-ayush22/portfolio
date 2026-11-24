import Link from "next/link";

const items = [
  { href: "#about", label: "about" },
  { href: "#projects", label: "projects" },
  { href: "#interests", label: "interests" },
  { href: "#links", label: "links" },
];

export function Navbar() {
  return (
    <header className="site-header">
      <Link href="/" className="wordmark">
        Home
      </Link>
      <nav aria-label="Main navigation">
        {items.map(({ href, label }) => (
          <a key={href} href={href}>
            {label}
          </a>
        ))}
        {/*<Link href="/blog">blog</Link>*/}
      </nav>
    </header>
  );
}
