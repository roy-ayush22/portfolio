import {
  createElement,
  type AnchorHTMLAttributes,
  type ComponentProps,
  type ReactNode,
} from "react";
import Link from "next/link";
import Image, { type ImageProps } from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";

type TableData = { headers: string[]; rows: string[][] };

function Table({ data }: { data: TableData }) {
  return (
    <table>
      <thead><tr>{data.headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
      <tbody>
        {data.rows.map((row, rowIndex) => (
          <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>
        ))}
      </tbody>
    </table>
  );
}

function CustomLink({ href = "", ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href.startsWith("/")) return <Link href={href} {...props} />;
  if (href.startsWith("#")) return <a href={href} {...props} />;
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props: ImageProps) {
  return <Image {...props} className={`rounded-image ${props.className ?? ""}`} />;
}

function Code({ children, ...props }: ComponentProps<"code">) {
  const html = highlight(String(children ?? ""));
  return <code {...props} dangerouslySetInnerHTML={{ __html: html }} />;
}

function slugify(value: ReactNode): string {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w-]+/g, "")
    .replace(/-+/g, "-");
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
  const Heading = ({ children }: { children?: ReactNode }) => {
    const id = slugify(children);
    return createElement(`h${level}`, { id }, children);
  };
  Heading.displayName = `Heading${level}`;
  return Heading;
}

const components = {
  h1: createHeading(1), h2: createHeading(2), h3: createHeading(3),
  h4: createHeading(4), h5: createHeading(5), h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
};

export function CustomMDX({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />;
}
