const path = require('path');

module.exports = {
  entry: './scripts/app.js',
  output: {
    path: path.resolve(__dirname, 'dist/assets'),
    filename: 'bundle.js'
  }
};

