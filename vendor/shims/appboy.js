(function() {
  function vendorModule() {
    'use strict';

    return { 'default': window.appboy };
  }

  define('appboy', [], vendorModule);
})();
