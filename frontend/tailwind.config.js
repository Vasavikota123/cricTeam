// tailwind.config.js
module.exports = {
  content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
      extend: {
          colors: {
              primary: '#1f2937',
              secondary: '#96adcf',
              accent1: '#6e7888',
              accent2: '#3a2129',
              accent3: '#6a4e56'
          }
      },
  },
  plugins: [],
};
