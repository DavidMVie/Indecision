const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

process.env.NODE_ENV = process.env.NODE_ENV  || 'development'

if(process.env.NODE_ENV === 'test') {
  require('dotenv').config({path: '.env.test'})
}else if(process.env.NODE_ENV === 'development') {
  require('dotenv').config({path:'.env.development'})
}

module.exports = (env) => {
  const isProduction = env === 'production';
  console.log('is in Production', isProduction);

  return {
    plugins: [
      new MiniCssExtractPlugin({filename: 'styles.css'})
    ],
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /.\js$/,
          exclude: /node_modules/,
          use: [
            'babel-loader'
          ]
        },
        {
          test: /\.s?css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        }
      ]
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      publicPath: '/dist/',
      historyApiFallback: true
    }
  }
}