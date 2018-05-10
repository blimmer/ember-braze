# ember-braze (formerly ember-appboy)
[![Build Status](https://travis-ci.org/blimmer/ember-braze.svg?branch=master)](https://travis-ci.org/blimmer/ember-braze)
[![Ember Observer Score](https://emberobserver.com/badges/ember-braze.svg)](https://emberobserver.com/addons/ember-braze)
[![Code Climate](https://codeclimate.com/github/blimmer/ember-braze/badges/gpa.svg)](https://codeclimate.com/github/blimmer/ember-braze)

ember-braze exposes the [appboy-web-sdk](https://github.com/Appboy/appboy-web-sdk)
to your Ember app (a.k.a braze-web-sdk).

Installation
------------------------------------------------------------------------------

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
```
ember install my-addon
```


Usage
------------------------------------------------------------------------------

[Longer description of how to use the addon in apps.]


Contributing
------------------------------------------------------------------------------

### Installation

* `git clone <repository-url>`
* `cd my-addon`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
