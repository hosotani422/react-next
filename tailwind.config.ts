import type { Config } from "tailwindcss";
import tailwind from "./src/styles/tailwind";

const config: Config = {
  content: [
    `./src/pages/**/*.tsx`,
    `./src/components/**/*.tsx`,
    `./src/stores/**/*.ts`,
  ],
  darkMode: `class`,
  presets: [tailwind],
};
export default config;
