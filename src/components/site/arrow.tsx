import type { SVGProps } from "react";

export function Arrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M3 13 13 3M6 3h7v7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
