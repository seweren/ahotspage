module.exports = {
  devtool: "source-map",
  output: {
    filename: "index.js",
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader', options: { useCache: true } }
    ]
  }
};
