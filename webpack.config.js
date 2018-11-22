const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production' || true;

module.exports = {
  entry: {
    background: './src/js/background.js',
    popup: './src/js/popup.js',
    content: './src/js/content.js',
    index: './src/index.js'
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  optimization: {
    minimizer: [
      // new UglifyJsPlugin({
      //     sourceMap: true,
      //     test: /\.js($|\?)/i,
      //     parallel: true
      // })
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/manifest.json', to: './', force: true },
      { from: './src/*.html', to: './', force: true, flatten: true },
      { from: './src/images/*', to: './', force: true, flatten: true }
    ], {})
  ],
  watch: true
};
