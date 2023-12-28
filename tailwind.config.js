// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'dark-text': '#E5E7EB',
        'dark-bg': '#121212',
        'comment': '#758575DD',
        'highlight' : {
          '1': '#B07D48',
          '2': '#80A665',
          '3': '#CB7676'
        }
      }
    },
  },
  plugins: [],
};
