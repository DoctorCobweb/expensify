const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
      CSSExtract
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
