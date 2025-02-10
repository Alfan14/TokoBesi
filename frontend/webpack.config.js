module.exports = {
    resolve: {
      fallback: {
        "fs": false,
        "child_process": false,
        "os": require.resolve("os-browserify/browser"),
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "path": require.resolve("path-browserify"),
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            use: ['source-map-loader'],
            enforce: 'pre'
          }
        ]
      }
    },
  };
  