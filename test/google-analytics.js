describe('google analytics', function() {
  var GoogleAnalytics = require('../source/google-analytics.js');

  describe('instance', function() {
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

    it('should work with required options present', function() {
      var wrapper = function() {
        new GoogleAnalytics({
          account: 'account',
          category: 'category'
        });
      };

      spyOn(GoogleAnalytics.prototype, 'load');
      expect(wrapper).not.toThrow();
    });
  });
});
