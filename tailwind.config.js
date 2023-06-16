/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: ["grid-cols-3", "grid-cols-4", "grid-cols-5"],
  theme: {
    extend: {
      lineHeight: {
        20: "5rem",
      },
      maxWidth: {
        80: "80rem",
      },
      gridTemplateColumns: {
        "first-big": "3fr repeat(3, minmax(0, 1fr))",
        "table-5-small": ".2fr repeat(4, 1.5fr)",
        "table-5": ".2fr 3fr repeat(3, 1.5fr)",
        "table-6": ".2fr 3fr 2fr repeat(3, 1fr)",
        "table-7": ".2fr 3fr 1fr 1fr repeat(3, 1fr)",
        "table-8": ".1fr 1.5fr .7fr .7fr .7fr repeat(3, .8fr)",

        "table-pools": ".1fr 1.3fr repeat(6, .7fr) .5fr",
        "table-tokens": ".2fr 3fr repeat(3, 1.5fr)",
        "table-search-results": "1fr .5fr",
        "table-pool-events": "1.5fr 1fr 1fr 1fr 1fr",
      },
    },
    colors: {
      /* basic colors */
      white: "#FFFFFF",
      black: "#000000",
      transparent: "transparent",
      /* purple */
      "purple-1": "#F7EFFB",
      "purple-2": "#D2C8EF",
      "purple-3": "#AB9DCF",
      "purple-4": "#CA8DE2",
      "purple-5": "#BB6BDA",
      "purple-6": "#B45CD6",
      "purple-7": "#AC4BD2",
      "purple-8": "#A43BCE",
      "purple-from": "#B5189F",
      "purple-to": "#3C0080",
      /* green */
      "green-1": "#ECFEF8",
      "green-2": "#D9FCF2",
      "green-3": "#A0F8DE",
      "green-4": "#79F6D0",
      "green-5": "#53F3C3",
      "green-6": "#2DF0B6",
      "green-7": "#65D47C",
      "green-8": "#2A9340",
      /* yellow */
      "yellow-1": "#FFFAEB",
      "yellow-2": "#FFF5D6",
      "yellow-3": "#FFECAD",
      "yellow-4": "#FFE285",
      "yellow-5": "#FFD95C",
      "yellow-6": "#FFD447",
      "yellow-7": "#FFCF33",
      "yellow-8": "#F6C361",
      /* red  */
      "red-1": "#FFEBEC",
      "red-2": "#FFD6DA",
      "red-3": "#E6B3CA",
      "red-4": "#FF858F",
      "red-5": "#FF6370",
      "red-6": "#FF5C69",
      "red-7": "#FF4757",
      "red-8": "#FF3344",
      /* primary color  */
      "primary-1": "#EBF4FF",
      "primary-2": "#D6E9FF",
      "primary-3": "#8FBBF9",
      "primary-4": "#489DFE",
      "primary-5": "#0177FB",
      "primary-6": "#0169DF",
      "primary-7": "#015FCB",
      "primary-8": "#0156B7",
      /* other Ajna colors */
      "ajna-red": "#E6B3CA",
      "ajna-lavender": "#AB9DCF",
      "ajna-ajna": "#AB9DCF",
      "ajna-navy": "#AB9DCF",
      "ajna-yellow": "#F6C361",
      "ajna-lavender-light": "#D2C8EF",
      "ajna-plum": "#B5179E",
      "ajna-green": "#2A9340",
      "ajna-teal": "#37FCFB",
      "ajna-aqua": "#8AC7DB",
      "ajna-spectrum-from": "#8AFAB6",
      "ajna-spectrum-via": "#642DD2",
      "ajna-spectrum-to": "#F8D19D",
      /* gray */
      "gray-1": "#F3F4F6",
      "gray-2": "#E8E8ED",
      "gray-3": "#DCDDE5",
      "gray-4": "#D0D1DC",
      "gray-5": "#C5C6D3",
      "gray-6": "#B9BACA",
      "gray-7": "#AEAFC2",
      "gray-8": "#A2A3B9",
      "gray-9": "#9698B0",
      "gray-10": "#8B8CA7",
      "gray-11": "#7F819F",
      "gray-12": "#737596",
      "gray-13": "#696B8C",
      "gray-14": "#606280",
      "gray-15": "#585974",
      "gray-16": "#4F5069",
      "gray-17": "#46475D",
      "gray-18": "#3B3C4E",
      "gray-19": "#353546",
      "gray-20": "#2C2D3A",
      "gray-21": "#23242F",
      "gray-22": "#1A1B23",
      "gray-23": "#121217",
      "gray-24": "#09090C",
      "gray-25": "#2D2D2D",
      "gray-dark": "#1C1C1C",
    },
    fontFamily: {
      rubik: ["Rubik_Regular", "Inter", "sans-serif"],
      syncopate: ["Syncopate_Bold", "monospace"],
    },
  },
  plugins: [],
};
