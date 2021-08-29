const slsw = require('serverless-webpack');

module.exports = {
  mode: 'production',
  entry: slsw.lib.entries,
  // output: set by the plugin
  target: 'node',
  externals: [
    /aws-sdk/, // Available on AWS Lambda
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
