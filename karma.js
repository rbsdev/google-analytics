module.exports = function(config) {
  config.set({
    autoWatch: false,
    basePath: '',
    browsers: [
      'PhantomJS'
    ],
    colors: true,
    files: [
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
