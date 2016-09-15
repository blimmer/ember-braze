/* jshint node: true */
'use strict';

var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var path = require('path');

module.exports = {
  name: 'ember-appboy',

  _getEmberAppboyOptions: function() {
    return (this.project.config(process.env.EMBER_ENV) || {}).appboy || {};
  },

  included: function(app) {
    // see: https://github.com/ember-cli/ember-cli/issues/3718
    while (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    this._super.included.apply(this, arguments);

    var vendor = this.treePaths.vendor;
    var options = this._getEmberAppboyOptions();

    if (options.coreOnly) {
      app.import(vendor + '/appboy-web-sdk/appboy.core.min.js');
    } else {
      app.import(vendor + '/appboy-web-sdk/appboy.min.js');
      app.import(vendor + '/appboy-web-sdk/appboy.css');
    }

    app.import(vendor + '/shims/appboy.js');

    if (options.logExitIntent) {
      app.import(vendor + '/ouibounce/ouibounce.min.js');
      app.import(vendor + '/shims/ouibounce.js');
    }

    return app;
  },

  treeForVendor: function(vendorTree) {
    var options = this._getEmberAppboyOptions();
    var trees = [vendorTree];

    var appboyPath = path.dirname(require.resolve('appboy-web-sdk'));

    var appboyIncludes;
    if (options.coreOnly) {
      appboyIncludes = ['appboy.core.min.js'];
    } else {
      appboyIncludes = ['appboy.min.js', 'appboy.css'];
    }

    var appboy = new Funnel(appboyPath, {
      destDir: 'appboy-web-sdk',
      include: appboyIncludes,
    });
    trees.push(appboy);

    if (options.logExitIntent) {
      var ouibouncePath = path.dirname(require.resolve('ouibounce'));
      var ouibounce = new Funnel(ouibouncePath, {
        destDir: 'ouibounce',
        include: ['ouibounce.min.js'],
      });
      trees.push(ouibounce);
    }

    return mergeTrees(trees);
  }
};
