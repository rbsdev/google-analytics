# Google Analytics

## Install

```shell
bower install git@github.com:rbsdev/google-analytics.git --save
```

## Usage

```javascript
var googleAnalytics = new GoogleAnalytics({
  account: 'UA-XXXXX-X',
  category: 'project name'
});

googleAnalytics.trackEvent('button click', 'join');
// _gaq.push(['_trackEvent', 'project name', 'button click', 'join']);

googleAnalytics.push('_setCustomVar', 'custom key', 'custom value');
// _gaq.push(['_setCustomVar', 'custom key', 'custom value']);
```

Options

* account: *required*,
* [allowLinker](https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiDomainDirectory#_gat.GA_Tracker_._setAllowLinker): true  as default
* autoInit: true as default, automatically set the basic configuration
* autoLoad: true as default, automatically inject the SDK
* category: *required*, the category to use with further trackEvent calls
* [trackPageview](https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiBasicConfiguration#_gat.GA_Tracker_._trackPageview): true as default
* trackUser: true as default, sets two custom vars with the user range and type

## Develop

```shell
# run tests
npm run test

# make build
npm run build

# watch for changes
npm run watch

# bump version
bower version [major | minor | patch]
```
