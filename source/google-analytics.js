!function() {
  var GoogleAnalytics;

  GoogleAnalytics = function(options) {
    var defaults = {
      account: null,
      allowHash: false,
      allowLinker: true,
      autoLoad: true,
      category: null,
      trackPageview: true
    };

    if (typeof options != 'object' || (typeof options == 'object' && options instanceof Array)) {
      options = { };
    }

    if (!options.account) {
      throw new Error('missing account information in Google Analytics');

      return;
    }

    if (!options.category) {
      throw new Error('missing category information in Google Analytics');

      return;
    }

    for (option in defaults) {
      if (defaults.hasOwnProperty(option) && !options.hasOwnProperty(option)) {
        options[option] = defaults[option];
      }
    }

    options.autoLoad ? this.load() : null;
  };

  GoogleAnalytics.prototype = {
    load: function() {
      var script = document.createElement('script');

      script.async = true;
      script.src = 'https://ssl.google-analytics.com/ga.js';

      document.body.appendChild(script);
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = GoogleAnalytics;

    return;
  }

  window.GoogleAnalytics = GoogleAnalytics;
}();