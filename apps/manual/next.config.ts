import type { NextConfig } from "next";

const config: NextConfig = {
  // Site estático: o manual não precisa de servidor.
  output: "export",
  images: { unoptimized: true },
  transpilePackages: ["@encibra/marca"],
};

export default config;
