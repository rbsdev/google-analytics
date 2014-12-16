describe('google analytics', function() {
  var factory = function(options) {
    spyOn(GoogleAnalytics.prototype, 'initialize').and.callThrough();
    spyOn(GoogleAnalytics.prototype, 'bindData');
    spyOn(GoogleAnalytics.prototype, 'load');
    spyOn(GoogleAnalytics.prototype, 'push');
    spyOn(GoogleAnalytics.prototype, 'trackEvent').and.callThrough();
    spyOn(GoogleAnalytics.prototype, 'trackUser').and.callThrough();

    return new GoogleAnalytics(options || (options = {
      account: 'account',
      category: 'category'
    }));
  };

  factory.click = function(element) {
    var mouseEvent = document.createEvent('MouseEvent');

    mouseEvent.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);

    element.dispatchEvent(mouseEvent);
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

  it('should initialize and delegate correctly', function() {
    var googleAnalytics = factory();

    expect(googleAnalytics.initialize).toHaveBeenCalled();
    expect(googleAnalytics.bindData).toHaveBeenCalled();
    expect(googleAnalytics.load).toHaveBeenCalled();
    expect(googleAnalytics.trackUser).toHaveBeenCalled();

    expect(googleAnalytics.push).toHaveBeenCalledWith('_setAccount', googleAnalytics.options.account);
    expect(googleAnalytics.push).toHaveBeenCalledWith('_setAllowLinker', googleAnalytics.options.allowLinker);
    expect(googleAnalytics.push).toHaveBeenCalledWith('_setCustomVar', 1, 'User-Defined', 'Free desbloqueado', 1);
    expect(googleAnalytics.push).toHaveBeenCalledWith('_setCustomVar', 4, 'RangeZH', 'Range 0', 2);
    expect(googleAnalytics.push).toHaveBeenCalledWith('_setDomainName', googleAnalytics.options.domainName);
    expect(googleAnalytics.push).toHaveBeenCalledWith('_trackPageview');
  });

  it('should respect autoInit option', function() {
    var googleAnalytics = factory({
      account: 'account',
      autoInit: false,
      category: 'category'
    });

    expect(googleAnalytics.options.autoInit).toBeFalsy();
    expect(googleAnalytics.initialize).not.toHaveBeenCalled();
  });

  it('should respect autoLoad option', function() {
    var googleAnalytics = factory({
      account: 'account',
      autoLoad: false,
      category: 'category'
    });

    expect(googleAnalytics.options.autoLoad).toBeFalsy();
    expect(googleAnalytics.load).not.toHaveBeenCalled();
  });

  it('should respect trackUser option', function() {
    var googleAnalytics = factory({
      account: 'account',
      category: 'category',
      trackUser: false
    });

    expect(googleAnalytics.options.trackUser).toBeFalsy();
    expect(googleAnalytics.trackUser).not.toHaveBeenCalled();
  });

  it('should call the push method when calling the trackEvent method', function() {
    var googleAnalytics = factory();

    googleAnalytics.trackEvent('event');

    expect(googleAnalytics.push).toHaveBeenCalledWith('_trackEvent', googleAnalytics.options.category, 'event');
  });

  it('should watch for clicked elements', function(done) {
    var button = document.createElement('button'),
        googleAnalytics;

    googleAnalytics = factory({
      account: 'account',
      bindDataGlue: /\s*\|\s*/g,
      category: 'category'
    });

    googleAnalytics.bindData.and.callThrough();
    googleAnalytics.bindData();

    button.dataset.ga = 'action | label';
    button.addEventListener('click', function() {
      button.removeEventListener('click', arguments.callee);
      document.body.removeChild(button);

      window.setTimeout(function() {
        expect(googleAnalytics.trackEvent).toHaveBeenCalledWith('action', 'label');
        expect(googleAnalytics.push).toHaveBeenCalledWith('_trackEvent', 'category', 'action', 'label');

        done();
      }, 4);
    });

    document.body.appendChild(button);
    factory.click(button);
  });
});
