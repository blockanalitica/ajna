/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      'purple': '#AC4BD2',
      'card-gray': '#121217',
      /* primary color */
      'primary-1': '#ebefff',
      'primary-2': '#d7e0fe',
      'primary-3': '#d7e0fe',
      'primary-4': '#5f81fc',
      'primary-5': '#3861fb',
      'primary-6': '#0f42fa',
      'primary-7': '#0433dc',
      'primary-8': '#0325a0',
      /* gray */
      'gray-1': '#f9fbfd',
      'gray-2': '#e7e8ee',
      'gray-3': '#dbdde6',
      'gray-4': '#cfd2de',
      'gray-5': '#c3c6d5',
      'gray-6': '#b7bbcd',
      'gray-7': '#abb0c4',
      'gray-8': '#9fa5bc',
      'gray-9': '#9399b4',
      'gray-10': '#878eab',
      'gray-11': '#7b83a3',
      'gray-12': '#6f779b',
      'gray-13': '#646d90',
      'gray-14': '#5c6484',
      'gray-15': '#545b78',
      'gray-16': '#4b526c',
      'gray-17': '#434960',
      'gray-18': '#3b4054',
      'gray-19': '#323748',
      'gray-20': '#2a2d3c',
      'gray-21': '#222531',
      'gray-22': '#191b24',
      'gray-23': '#111218',
      'gray-24': '#08090c',
    },
  },
  plugins: [],
}
