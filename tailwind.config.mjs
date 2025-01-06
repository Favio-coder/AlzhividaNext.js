/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
    //Variables globales (Declara colores, estilos y más para usarlo en tus componentes)
      colors: {
        colorHover: "#5f17bf",
        colorFondo: "#e7d7fd",
        colorLoginForm: "#161616",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
