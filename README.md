# ember-braze (formerly ember-appboy)
[![Build Status](https://travis-ci.org/blimmer/ember-braze.svg?branch=master)](https://travis-ci.org/blimmer/ember-braze)
[![Ember Observer Score](https://emberobserver.com/badges/ember-braze.svg)](https://emberobserver.com/addons/ember-braze)
[![Code Climate](https://codeclimate.com/github/blimmer/ember-braze/badges/gpa.svg)](https://codeclimate.com/github/blimmer/ember-braze)

ember-braze exposes the [appboy-web-sdk](https://github.com/Appboy/appboy-web-sdk)
to your Ember app (a.k.a braze-web-sdk).

## Installation

```bash
ember install ember-braze
```

## Usage
Please check out the [interactive docs](https://blimmer.github.io/ember-braze)
for usage information.

## Rename
Appboy changed their name to Braze in 2017. The former addon (ember-appboy)
was deprecated and users asked to use ember-braze instead. Within the code,
all references to the SDK still use `appboy`, because a rename in their SDK
has not yet happened. This addon will follow their lead. When their code
references `braze` instead of `appboy`, we will change that on our end. Semantic
versioning will be followed to try to prevent thrash to end users.

## Legal
This addon is in no way affiliated with Braze. It is developed by
[Ben Limmer](https://benlimmer.com) and is simply a wrapper around the
appboy-web-sdk to make integration with Ember apps simple.

## Developing

* `git clone <repository-url>` this repository
* `cd ember-braze`
* `yarn install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `yarn test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
