(function() {
  function vendorModule() {
    'use strict';

    return { 'default': window.ouibounce };
  }

  define('ouibounce', [], vendorModule);
})();
