module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    enabled: true,
    content: ["./src/**/*.js", "./src/**/*.jsx"],
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
