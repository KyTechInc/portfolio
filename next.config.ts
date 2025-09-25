import createMDX from '@next/mdx'
import type { NextConfig } from "next";
import { remarkPlugins } from "@prose-ui/core";

const nextConfig: NextConfig = {
  experimental: {
    mdxRs: true,
    browserDebugInfoInTerminal: true,
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: remarkPlugins(),
  },
})


export default withMDX(nextConfig);
