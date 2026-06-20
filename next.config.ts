import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  /* Brand marks are inline SVGs served straight from /public/brand. */
  // MDX lessons live under content/<locale>/programme/**. Enabling `.mdx`
  // (and `.md`) as page extensions lets @next/mdx compile them when imported.
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
};

const withMDX = createMDX({
  options: {
    // remark-frontmatter recognizes the YAML `---` block as frontmatter rather
    // than a thematic break, so the compiled body drops it. The same frontmatter
    // is read independently by the content loaders via gray-matter (Task 3).
    // Plugins are passed by name (string form) to stay Turbopack-compatible —
    // Turbopack can't receive JS function plugins across the Rust boundary.
    remarkPlugins: ["remark-frontmatter"],
  },
});

export default withMDX(nextConfig);
