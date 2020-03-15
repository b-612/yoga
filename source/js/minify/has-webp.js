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

  hasWebP().then(
  function() {
    $.noop();
  },

  function() {
    var elemsWithWebp = [
      $('.page-header'),
      $('.directions'),
      $('.subscriptions'),
      $('.team'),
      $('.page-footer')
    ];

    elemsWithWebp.each(function () {
      this.removeClass('webp').addClass('no-webp');
    });
  });

  window.has = {
    hasWebP: hasWebP
  }
})();
