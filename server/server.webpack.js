var Fs = require('fs');

var nodeModules = {};
Fs.readdirSync('../node_modules').forEach(function (module) {
  if (module !== '.bin') nodeModules[module] = 'commonjs ' + module
});

module.exports = {
  devtool: "source-map",
  output: {
    filename: "server.js",
  },
  externals: nodeModules,
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader', options: { useCache: true } },
    ]
  }
};
