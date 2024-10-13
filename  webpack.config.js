const path = require('path');

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // Alias @ vers le dossier src
    },
  },
};
