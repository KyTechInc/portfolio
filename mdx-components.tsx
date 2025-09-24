import { mdxComponents } from "@prose-ui/next";
import type { MDXComponents } from "mdx/types";
import { Video } from "./components/ui/video";
import { Code } from "./components/code-editor";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...mdxComponents,
    Video: (props: React.ComponentProps<typeof Video>) => (
      <Video {...props} />
    ),
    Code: (props: React.ComponentProps<typeof Code>) => (
      <Code {...props} themes={{ dark: 'aurora-x', light: 'min-light' }} />
    ),
  };
}