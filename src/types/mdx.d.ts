declare module "*.mdx" {
  import type { MDXProps } from "mdx/types";
  import type { EssayFrontmatter } from "@/lib/types";

  export const metadata: EssayFrontmatter;

  export default function MDXContent(props: MDXProps): JSX.Element;
}
