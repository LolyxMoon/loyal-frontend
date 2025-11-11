"use client";

import "katex/dist/katex.min.css";

import type { HTMLAttributes } from "react";
import { memo } from "react";
import { Streamdown } from "streamdown";

import { cn } from "@/lib/utils";

export type ResponseProps = HTMLAttributes<HTMLDivElement> & {
  children: string;
  parseIncompleteMarkdown?: boolean;
  isAnimating?: boolean;
};

export const Response = memo(
  ({
    className,
    children,
    parseIncompleteMarkdown: shouldParseIncompleteMarkdown = true,
    isAnimating = false,
    ...props
  }: ResponseProps) => (
    <div
      className={cn(
        "size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
        className
      )}
      {...props}
    >
      <Streamdown
        controls={{ code: true, table: true, mermaid: true }}
        isAnimating={isAnimating}
        parseIncompleteMarkdown={shouldParseIncompleteMarkdown}
        shikiTheme={["github-light", "github-dark"]}
      >
        {children}
      </Streamdown>
    </div>
  ),
  (prevProps, nextProps) => prevProps.children === nextProps.children
);

Response.displayName = "Response";
