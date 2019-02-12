const path = require('path');

module.exports = (env, argv) => {
  let production = argv.mode === 'production'

  return {
    entry: {
      'js/admin': path.resolve(__dirname, 'app/admin.js'),
      'js/shortcode': path.resolve(__dirname, 'app/shortcode.js'),
      'js/widget': path.resolve(__dirname, 'app/widget.js'),
    },

    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'assets'),
    },

    devtool: production ? '' : 'source-map',

    resolve: {
      extensions: [".js", ".jsx", ".json"],
    },

    module: {
      rules: [{
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.(png|jpg|gif)$/i,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }]
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.scss$/,
          use: [
            "style-loader", // creates style nodes from JS strings
            "css-loader", // translates CSS into CommonJS
            "sass-loader" // compiles Sass to CSS, using Node Sass by default
          ]
        }
      ],
    },
  };
}