describe('google analytics', function() {
  it('should throw an error when account is missing', function() {
    var wrapper = function() {
      new GoogleAnalytics({
        category: 'category'
      });
    };

    expect(wrapper).toThrow();
  });

  it('should throw an error when category is missing', function() {
    var wrapper = function() {
      new GoogleAnalytics({
        account: 'account'
      });
    };

    expect(wrapper).toThrow();
  });

  it('should not throw an error with required options present', function() {
    var wrapper = function() {
      new GoogleAnalytics({
        account: 'account',
        category: 'category'
      });
    };

    expect(wrapper).not.toThrow();
  });

  it('should inject the SDK script', function() {
    var scripts;

    new GoogleAnalytics({
      account: 'account',
      category: 'category'
    });

    scripts = document.querySelectorAll('#google-analytics-sdk');

    expect(scripts.length).toBe(1);
  });
});
