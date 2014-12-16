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
  default: `true`

* autoInit
  <br>
  automatically set the basic configuration
  <br>
  type: boolean
  <br>
  default: `true`

* autoLoad:
  <br>
  automatically inject the SDK
  <br>
  type: boolean
  <br>
  default: `true`

* bindData:
  <br>
  watch for data-ga attribute in clicked elements
  <br>
  type: boolean
  <br>
  default: `true`

* bindDataGlue:
  <br>
  the string used to separate arguments in data-ga attribute
  <br>
  type: RegExp
  <br>
  default: `/\s*,\s*/g`

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
  default: `clicrbs.com.br`

* [trackPageview](https://developers.google.com/analytics/devguides/collection/gajs/methods/gaJSApiBasicConfiguration#_gat.GA_Tracker_._trackPageview)
  <br>
  type: boolean
  <br>
  default: `true`

* trackUser
  <br>
  sets two custom vars with the user range and type
  <br>
  type: boolean
  <br>
  default: `true`

### bindData option

By default, any clicked element that has data-attribute on it will automatically fire an `_trackEvent`.
To disable this behavior, just set the `bindData` option to `false`.

```html
<!-- by default, arguments are comma separeted -->
<!-- you can change that with the bindDataGlue option -->
<a href="#top" data-ga="anchor click, back to top">Go back to the top</a>
<!-- _gaq.push(['_trackEvent', 'category', 'anchor click', 'back to top']); -->

<button data-ga="button click, join with us">Join with us</button>
<!-- _gaq.push(['_trackEvent', 'category', 'button click', 'join with us']); -->
```

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
