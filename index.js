/* jshint node: true */
'use strict';

var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var path = require('path');

module.exports = {
  name: 'ember-appboy',

  included: function(app) {
    // see: https://github.com/ember-cli/ember-cli/issues/3718
    while (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    this._super.included.apply(this, arguments);

    var vendor = this.treePaths.vendor;
    var options = (this.project.config(process.env.EMBER_ENV) || {}).appboy || {};

    if (options.coreOnly) {
      app.import(vendor + '/appboy-web-sdk/appboy.core.min.js');
    } else {
      app.import(vendor + '/appboy-web-sdk/appboy.min.js');
      app.import(vendor + '/appboy-web-sdk/appboy.css');
    }

    app.import(vendor + '/shims/appboy.js');

    return app;
  },

  treeForVendor: function(vendorTree) {
    var appboyPath = path.dirname(require.resolve('appboy-web-sdk'));
    var appboy = new Funnel(appboyPath, {
      destDir: 'appboy-web-sdk',
      include: ['**/*.js', '**/*.css'],
    });

    return mergeTrees([vendorTree, appboy]);
  }
};
