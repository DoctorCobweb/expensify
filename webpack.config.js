const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env-test' });
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env-development' });
}

module.exports = (env) => {
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('styles.css');


  return {
    entry: "./src/app.js",
    output: {
      // has to be an ABSOLUTE PATH here.
      // need to use path.join because paths and folders are written/handled
      // differently for different operating systems
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/, // the s? means 's' or 'no s'
        use: CSSExtract.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
        // use: [
        //   'style-loader', // dump css contents into DOM in a syle tage. inlining
        //   'css-loader', // read in css files
        //   'sass-loader'
        // ]
      }]
    },
    plugins: [
      CSSExtract,

      // this lets us pass in an object to clientside.
      // use JSON.stringify to put the values into double quotes ie strings
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
      })
    ],

    // helps with getting correct line nums
    // devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    devtool: isProduction ? 'source-map' : 'inline-source-map',

    devServer: {
      contentBase: path.join(__dirname, 'public'),
      port: 8181,
      historyApiFallback: true,
      publicPath: '/dist/'
    }
  }
};
