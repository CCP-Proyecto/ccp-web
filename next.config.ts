import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

import "./src/env";

const config: NextConfig = {
  output: "standalone",
  experimental: {
    reactCompiler: true,
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["warn", "error"],
          }
        : false,
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(config);
