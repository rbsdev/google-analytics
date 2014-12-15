describe('google analytics', function() {
  var factory = function(options) {
    options || (options = {
      account: 'account',
      category: 'category'
    });

    return new GoogleAnalytics(options);
  };

  factory.with = function(options) {
    return factory.bind(window, options);
  };

  it('should throw an error when account is missing', function() {
    expect(factory.with({
      category: 'category'
    })).toThrow();
  });

  it('should throw an error when category is missing', function() {
    expect(factory.with({
      account: 'account'
    })).toThrow();
  });

  it('should not throw an error with required options present', function() {
    expect(factory).not.toThrow();
  });

  it('should declare the global _gaq queue', function() {
    delete window._gaq;

    factory();

    expect(window._gaq).not.toBeUndefined();
  });

  it('should inject the SDK script only once', function() {
    var scripts = document.querySelectorAll('#google-analytics-sdk');

    [ ].slice.apply(document.querySelectorAll('script')).forEach(function(script, index, scripts) {
      script.parentElement.removeChild(script);
    });

    factory();
    factory();

    scripts = document.querySelectorAll('#google-analytics-sdk');

    expect(scripts.length).toBe(1);
  });
});
