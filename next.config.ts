import type { NextConfig } from "next";

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

export default config;
