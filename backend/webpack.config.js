// this file is needed for bundle app with node_modules into one file
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const webpack = require('webpack');
module.exports = config => {

  /*const ignorePlugin = new webpack.IgnorePlugin({
    checkResource(resource) {
      const lazyImports = [
        '@nestjs/microservices',
        // ADD THIS
        '@nestjs/microservices/microservices-module',
        '@nestjs/websockets',
        // AND THIS
        '@nestjs/websockets/socket-module',
        '@nestjs/platform-express',
        'cache-manager',
        'class-validator',
        'class-transformer',
      ];

      if (!lazyImports.includes(resource)) {
        return false;
      }
      try {
        require.resolve(resource);
      } catch (err) {
        return true;
      }
      return false;
    },
  });

  config.plugins = config.plugins.concat(ignorePlugin);*/
  return {
    ...config,
    // externals: [],
  }
};
