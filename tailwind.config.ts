import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      red: {
        50: '#ffe5e5',
        100: '#fbbaba',
        200: '#f58f8f',
        300: '#f06464',
        400: '#eb3939',
        500: '#e60f0f',  // Base Red
        600: '#bf0c0c',
        700: '#990909',
        800: '#730707',
        900: '#4d0404',
      },
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
      lime: {
        50: "#f4fdea",
        100: "#e8fac7",
        200: "#d9f792",
        300: "#c6f311",  // Base color
        400: "#a8dc0a",
        500: "#8db708",
        600: "#769504",
        700: "#5c7202",
        800: "#455201",
        900: "#2e3600",
      },
      'pale-ivory': {
        DEFAULT: '#eeeee4',
        tint: {
          100: '#f6f6f0',
          200: '#f0f0e8',
          300: '#e8e8d0',
        },
        shade: {
          100: '#d8d8c0',
          200: '#c2c2a0',
          300: '#abab80',
        },
      },
      'navy-blue': {
        DEFAULT: '#154c79',
        tint: {
          100: '#d3e0e6',
          200: '#a6c0d0',
          300: '#7a9bb4',
        },
        shade: {
          100: '#003d6a',
          200: '#002d4b',
          300: '#001c2b',
        },
      },
      'white': '#ffffff',
    },
  },
  plugins: [],
};

export default config;