import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: ["src/app/**/{page,layout,loading,error,not-found}.tsx"],
  project: ["src/**/*.{ts,tsx}"],
};

export default config;
