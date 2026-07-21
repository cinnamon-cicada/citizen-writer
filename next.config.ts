import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
  },
});

export default withMDX(nextConfig);
