const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors : {
        darkblue: "#0a1930",
        lightblue: "#1f93ff",
      
        colorgrey: "#eee",
        
      
        colorpurple: "#9d0191",
        colororange: "#ff7722",
      
        colorprimary: "#007bff",
        colorsuccess: "#28a745",
        // colordanger: orangered,

      },
    
      screens: {
      'xs': '100%', // Extra small (default)
          'sm': '540px', // Small (≥576px)
          'md': '740px', // Medium (≥768px)
          // 'td': '770px', // Medium (≥768px)
          'lg': '960px', // Large (≥992px)
          'xl': '1140px', // X-Large (≥1200px)
          '2xl': '1320px', // XX-Large (≥1400px)
      },
     
     
      
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};