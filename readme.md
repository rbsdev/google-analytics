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
  <br>
  type: string
  <br>
  *required*

* [allowLinker](https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiDomainDirectory#_gat.GA_Tracker_._setAllowLinker)
  <br>
  type: boolean
  <br>
  default: true

* autoInit
  <br>
  automatically set the basic configuration
  <br>
  type: boolean
  <br>
  default: true

* autoLoad:
  <br>
  automatically inject the SDK
  <br>
  type: boolean
  <br>
  default: true

* category
  <br>
  the category to use with further trackEvent calls
  <br>
  type: string
  <br>
  *required*

* [domainName](https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiDomainDirectory#_gat.GA_Tracker_._setDomainName)
  <br>
  type: string
  <br>
  default: clicrbs.com.br

* [trackPageview](https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiBasicConfiguration#_gat.GA_Tracker_._trackPageview)
  <br>
  type: boolean
  <br>
  default: true

* trackUser
  <br>
  sets two custom vars with the user range and type
  <br>
  type: boolean
  <br>
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
