!function() {
  var extend,
      GoogleAnalytics;

  extend = function(options) {
    var defaults = {
      account: null,
      allowHash: false,
      allowLinker: true,
      autoLoad: true,
      category: null,
      trackPageview: true
    };

    for (option in defaults) {
      if (defaults.hasOwnProperty(option) && !options.hasOwnProperty(option)) {
        options[option] = defaults[option];
      }
    }

    return options;
  };

  GoogleAnalytics = function(options) {
    if (typeof options != 'object' || (typeof options == 'object' && options instanceof Array)) {
      options = { };
    }

    this.options = extend(options);

    if (!this.options.account) {
      throw new Error('missing account information in Google Analytics');

      return;
    }

    if (!this.options.category) {
      throw new Error('missing category information in Google Analytics');

      return;
    }

    this.initialize();

    if (this.options.autoLoad) {
      this.load()
    }
  };

  GoogleAnalytics.prototype = {
    initialize: function() {
      window._gaq = window._gaq || [ ];

      this.push(['_setAccount', this.account]);
      this.push(['_setAccount', this.account]);
      this.push(['_setAllowHash', this.allowHash]);
      this.push(['_setAllowLinker', this.allowLinker]);

      if (this.trackPageview) {
        this.push(['_trackPageview']);
      }
    },

    load: function() {
      var id = 'google-analytics-sdk',
          script;

      if (document.querySelector('#' + id)) {
        return;
      }

      script = document.createElement('script');
      script.id = id;
      script.async = true;
      script.src = 'https://ssl.google-analytics.com/ga.js';

      document.body.appendChild(script);
    },

    push: function() {
      var data = [ ].slice(arguments);

      window._gaq.push.apply(window, arguments);
    },

    trackEvent: function() {
      var data = [ ].slice(arguments);

      this.push(['_trackEvent', this.options.category].concat(data));
    }
  };

  window.GoogleAnalytics = GoogleAnalytics;
}();
