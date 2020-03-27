'use strict';

(function () {
  const hasWebP = function () {
    var rv = $.Deferred();
    var img = new Image();
    img.onload = function() { rv.resolve(); };
    img.onerror = function() { rv.reject(); };
    img.src = 'img/test-webp.webp';
    return rv.promise();
  };

hasWebP().then(
  () => {
    $.noop();
  },

  () => {
    const elemsWithWebp = [
      $('.page-header'),
      $('.directions'),
      $('.subscriptions'),
      $('.team'),
      $('.page-footer')
    ];

    elemsWithWebp.forEach((current) => {
      current.removeClass('webp').addClass('no-webp');
    });
  });
})();
