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

  it('should not throw an error with required options present', function() {
    var wrapper = function() {
      new GoogleAnalytics({
        account: 'account',
        category: 'category'
      });
    };

    expect(wrapper).not.toThrow();
  });
});
