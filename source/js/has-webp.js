'use strict';

(function () {
  var hasWebP = function () {
    var rv = $.Deferred();
    var img = new Image();
    img.onload = function() { rv.resolve(); };
    img.onerror = function() { rv.reject(); };
    img.src = 'img/test-webp.webp';
    return rv.promise();
  };

  hasWebP().then(function() {
  },
  function() {
    $('.page-header').removeClass('webp').addClass('no-webp');
    $('.directions').removeClass('webp').addClass('no-webp');
    $('.subscriptions').removeClass('webp').addClass('no-webp');
    $('.team').removeClass('webp').addClass('no-webp');
  });
})();
