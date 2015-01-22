(function() {
  var extend,
      GoogleAnalytics;

  extend = function(options) {
    var defaults = {
      account: null,
      allowLinker: true,
      autoInit: true,
      autoLoad: true,
      bindData: true,
      bindDataGlue: /\s*,\s*/g,
      category: null,
      domainName: 'clicrbs.com.br',
      trackPageview: true,
      trackUser: true
    };

    for (var option in defaults) {
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
    }

    if (!this.options.category) {
      throw new Error('missing category information in Google Analytics');
    }

    if (this.options.autoInit) {
      this.initialize();
    }

    if (this.options.autoLoad) {
      this.load();
    }
  };

  GoogleAnalytics.prototype = {
    initialize: function() {
      window._gaq = window._gaq || [ ];

      this.push('_setAccount', this.options.account);
      this.push('_setAllowLinker', this.options.allowLinker);

      if (this.options.domainName) {
        this.push('_setDomainName', this.options.domainName);
      }

      if (this.options.trackPageview) {
        this.push('_trackPageview');
      }

      if (this.options.bindData) {
        this.bindData();
      }

      if (this.options.trackUser) {
        this.trackUser();
      }
    },

    bindData: function() {
      document.body.addEventListener('click', function(event) {
        var element = event.target,
            data;

        do {
          data = element.dataset.ga;
          element = element.parentElement;
        } while (element && data === undefined);

        if (data) {
          data = data.split(this.options.bindDataGlue);
          this.trackEvent.apply(this, data);
        }
      }.bind(this));
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
      var data = [ ].slice.apply(arguments);

      window._gaq.push(data);
    },

    trackEvent: function() {
      var data = [ ].slice.apply(arguments);

      this.push.apply(this, ['_trackEvent', this.options.category].concat(data));
    },

    trackUser: function() {
      var getCookieByName,
          kind,
          kinds,
          range,
          ranges;

      getCookieByName = function(name) {
        return document.cookie.replace(new RegExp('(?:(?:^|.*;\\s*)' + name + '\\s*\\=\\s*([^;]*).*$)|^.*$'), "$1");
      };

      kinds = {
        '0': 'Free desbloqueado',
        '1': 'Funcionario RBS',
        '2': 'Assinante',
        '3': 'Free bloqueado',
        '4': 'Assinante Promocional'
      };

      ranges = {
        '0': '0',
        'a': '1',
        'b': '2',
        'c': '3',
        'd': '4',
        'e': '5',
        'f': '6',
        'g': '7',
        'h': '8',
        'i': '9',
        'j': '10',
        'l': '11a15',
        'm': '16a20',
        'n': '21a25',
        'o': '26a30',
        'p': '31a35',
        'q': '36a40',
        'r': '41a45',
        's': '46a50',
        'z': '51M'
      };

      kind = getCookieByName('uscn') || '0';
      kind = kinds[kind];

      range = getCookieByName('urscn') || '0';
      range = ranges[range];

      this.push('_setCustomVar', 1, 'User-Defined', kind, 1);
      this.push('_setCustomVar', 4, 'RangeZH', "Range " + range, 2);
    }
  };

  window.GoogleAnalytics = GoogleAnalytics;
}());
