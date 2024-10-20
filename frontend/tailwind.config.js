const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./signup/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lavenderWeb: '#d9d0de',
        puce: '#bc8da0',
        chinaRose: '#a04668',
        raspberryRose: '#ab4967',
        night: '#0c1713',
        emerald: '#0CCE6B',
        background: '#d9d0de',  // Lavender Web
        foreground: '#0c1713',  // Night
        primaryColour: 'var(--primary-colour)',  // China Rose
        secondaryColour: 'var(--secondary-colour)',  // Puce
        accent: '#558c8c',
        neutral: '#2f2f2f',
        info: '#4b88a2',
        success: '#0cce6b',  // Emerald
        warning: '#f8f32b',
        error: '#c93d3d',
      },
      backgroundImage: {
        primaryColour: 'var(--primary-colour)',  // China Rose
        secondaryColour: 'var(--secondary-colour)',  // Puce
        'primary-secondary-gradient': 'radial-gradient(var(--primary-colour), var(--secondary-colour))',
        'seconday-primary-gradient': 'radial-gradient(var(--secondary-colour),var(--primary-colour))',
      },
    },
  },
  plugins: [],
});

