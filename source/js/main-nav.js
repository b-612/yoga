'use strict';

(function () {
  var SWIPE_VAL = 20;

  var touchX = {
    touchStartX: 0,
    touchEndX: 0
  };

  var $body = $('body');
  var $mainNav = $body.find('.nav');
  var $navList = $mainNav.find('.nav__list');
  var $navToggle = $mainNav.find('.nav__toggle');

  $mainNav.removeClass('nav--no-js');

  var onToggleClick = function () {
    $mainNav.toggleClass('nav--opened');
    $body.toggleClass('body-anim-on');
    $body.attr('style', 'overflow-x: hidden');
    $navList.toggleClass('nav__list--animation-on');

    if (onToggleClick.isClicked) {
      $body.toggleClass('body-anim-off');
      $navList.toggleClass('nav__list--animation-off');
      window.setTimeout(function () {
        $body.removeClass('body-anim-off');
        $navList.removeClass('nav__list--animation-off');
        $body.removeAttr('style');
        $body.removeAttr('class');
        onToggleClick.isClicked = false;
      }, 501);
    }
  };

  $navToggle.click(function () {
    onToggleClick();

    if (!onToggleClick.isClicked) {
      onToggleClick.isClicked = true;
    }
  });

  var onSwipe = function (evt) {
    if ($mainNav.hasClass('nav--opened') && touchX.touchStartX > touchX.touchEndX) {
      onToggleClick();
      onToggleClick.isClicked = false;
    } else if (!$mainNav.hasClass('nav--opened') && touchX.touchStartX < touchX.touchEndX  && touchX.touchStartX <= 40) {
      onToggleClick();
      onToggleClick.isClicked = true;
    }
  };

  $body.on('touchstart', function (evt) {
    touchX.touchStartX = evt.touches[0].screenX;
  });

  $body.on('touchend', function (evt) {
    touchX.touchEndX = evt.changedTouches[0].screenX;

    if (touchX.touchEndX - touchX.touchStartX > SWIPE_VAL || touchX.touchStartX - touchX.touchEndX > SWIPE_VAL) {
      onSwipe(evt);
    }
  });
})();
