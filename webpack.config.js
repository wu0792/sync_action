const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production' || true;

module.exports = {
  entry: {
    background: './src/js/background.js',
    content: './src/js/content.js'
  },
  mode: isProd ? 'production' : 'development',
  output: {
    path: path.join(__dirname, "build"),
    filename: '[name].js',
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/manifest.json', to: './', force: true },
      { from: './src/*.html', to: './', force: true, flatten: true },
      { from: './src/images/*', to: './', force: true, flatten: true }
    ], {})
  ]
};
