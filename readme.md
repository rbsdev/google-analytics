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

* account
  type: string
  *required*

* [allowLinker](https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiDomainDirectory#_gat.GA_Tracker_._setAllowLinker)
  type: boolean
  default: true

* autoInit
  automatically set the basic configuration
  type: boolean
  default: true

* autoLoad:
  automatically inject the SDK
  type: boolean
  default: true

* category
  the category to use with further trackEvent calls
  type: string
  *required*

* [domainName](https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiDomainDirectory#_gat.GA_Tracker_._setDomainName)
  type: string
  default: clicrbs.com.br

* [trackPageview](https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiBasicConfiguration#_gat.GA_Tracker_._trackPageview)
  type: boolean
  default: true

* trackUser
  sets two custom vars with the user range and type
  type: boolean
  default: true

## Develop

```shell
# run tests
npm run test

# make build
npm run build

# watch for changes
npm run watch

# bump version
bower version patch # major | minor | patch
git push --follow-tags
```
