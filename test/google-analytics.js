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

  beforeEach(function() {
    var scripts = document.querySelectorAll('#google-analytics-sdk');

    [ ].slice.apply(scripts).forEach(function(script) {
      script.parentElement.removeChild(script);
    });

    document.cookie = 'urscn=0;expires=Thu, 01 Jan 1970 00:00:01 GMT';
    document.cookie = 'uscn=0;expires=Thu, 01 Jan 1970 00:00:01 GMT';

    delete window._gaq;
  });

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
    factory();

    expect(window._gaq).not.toBeUndefined();
  });

  it('should inject the SDK script only once', function() {
    var scripts;

    factory();
    factory();

    scripts = document.querySelectorAll('#google-analytics-sdk');

    expect(scripts.length).toBe(1);
  });

  it('should push to the global _gaq queue', function() {
    var googleAnalytics = factory();

    googleAnalytics.push('event');

    expect(window._gaq).toContain(['event']);
  });

  it('should push trackEvent to the global _gaq queue', function() {
    var googleAnalytics = factory();

    googleAnalytics.trackEvent('event');

    expect(window._gaq).toContain(['_trackEvent', googleAnalytics.options.category, 'event']);
  });

  it('should identify the user', function() {
    var googleAnalytics;

    document.cookie = 'urscn=o';
    document.cookie = 'uscn=2';

    googleAnalytics = factory();

    expect(window._gaq).toContain(['_setCustomVar', 1, 'User-Defined', 'Assinante', 1]);
    expect(window._gaq).toContain(['_setCustomVar', 4, 'RangeZH', 'Range 26a30', 2]);
  });
});
