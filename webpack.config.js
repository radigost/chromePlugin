
const path = require('path');

module.exports = {
  entry: './src/popup.js',
  output: {
    filename: 'popup.js',
    path: path.resolve(__dirname, '')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc:true
          }
        }
      }
    ]
  }
};