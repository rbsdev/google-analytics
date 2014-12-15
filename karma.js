module.exports = function(config) {
  config.set({
    autoWatch: false,
    basePath: '',
    browsers: [
      'PhantomJS'
    ],
    colors: true,
    files: [
      'node_modules/polyfill-function-prototype-bind/bind.js',
      'build/*.js',
      'test/*.js'
    ],
    frameworks: [
      'jasmine'
    ],
    logLevel: config.LOG_WARN,
    port: 9876,
    reporters: [
      'progress'
    ],
    singleRun: true
  });
};
