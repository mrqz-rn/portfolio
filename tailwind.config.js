/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}", // For Next.js App Router
    ],
    theme: {
      extend: {
        colors: {
          primary: "#6366F1", // Custom primary color
          secondary: "#EC4899", // Custom secondary color
        },
      },
    },
    darkMode: "class", // Enables dark mode using a class
    plugins: [],
  };
  