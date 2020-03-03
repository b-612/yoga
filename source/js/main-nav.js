'use strict';

(function () {
  var SWIPE_VAL = 40;

  var touch = {
    touchStartX: 0,
    touchEndX: 0,
    touchStartY: 0,
    touchEndY: 0
  };

  var $body = $('body');
  var $pageHeader = $body.find('.page-header');
  var $mainNav = $body.find('.nav');
  var $navList = $mainNav.find('.nav__list');
  var $navToggle = $mainNav.find('.nav__toggle');
  var $headerTop = $body.find('.page-header__top');

  $mainNav.removeClass('nav--no-js');

  var onToggleClick = function () {
    var topHeight = $headerTop.height();

    $headerTop.css('min-height', topHeight);
    $mainNav.toggleClass('nav--opened');
    $body.toggleClass('body-anim-on');
    $navList.toggleClass('nav__list--animation-on');

    if (onToggleClick.isClicked) {
      $headerTop.css('min-height', '');
      $body.toggleClass('body-anim-off');
      $navList.toggleClass('nav__list--animation-off');
      setTimeout(function () {
        $body.removeClass('body-anim-off');
        $navList.removeClass('nav__list--animation-off');
        $body.removeAttr('class');
        onToggleClick.isClicked = false;
      }, 501);
    }

    if (screen.width > window.util.screenWidth.TAB_MAX) {
      if (!onToggleClick.isClicked) {
        $mainNav.animate({
          left: '-7vw'
        }, 500);
      } else {
        $mainNav.animate({
          left: 0
        }, 500);
      }
    }

    if (screen.width <= window.util.screenWidth.TAB_MAX) {
      if (!onToggleClick.isClicked) {
        $body.css({
          overflow: 'hidden',
          position: 'fixed',
          top: 0,
          left: '260px',
          width: '100%'
        });
      } else {
        $body.css({
          overflow: '',
          position: '',
          top: '',
          left: '',
          width: ''
        });
      }
    }
  };

  $navToggle.click(function () {
    onToggleClick();

    if (!onToggleClick.isClicked) {
      onToggleClick.isClicked = true;
    }
  });

  var onSwipe = function (evt) {
    if ($mainNav.hasClass('nav--opened') && touch.touchStartX > touch.touchEndX) {
      onToggleClick();
      onToggleClick.isClicked = false;
    } else if (!$mainNav.hasClass('nav--opened') && touch.touchStartX < touch.touchEndX  && touch.touchStartX <= 40) {
      onToggleClick();
      onToggleClick.isClicked = true;
    }
  };

  $body.on('touchstart', function (evt) {
    touch.touchStartX = evt.touches[0].screenX;
  });

  $body.on('touchend', function (evt) {
    touch.touchEndX = evt.changedTouches[0].screenX;

    if (touch.touchEndX - touch.touchStartX > SWIPE_VAL || touch.touchStartX - touch.touchEndX > SWIPE_VAL) {
      onSwipe(evt);
    }
  });
})();
