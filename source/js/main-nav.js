'use strict';

(function () {
  var $body = $('body');
  var mainNav = $body.find('.nav');
  var navList = mainNav.find('.nav__list');
  var navToggle = mainNav.find('.nav__toggle');
  var headerTop = $body.find('.page-header__top');

  mainNav.removeClass('nav--no-js');

  var onToggleClick = function () {
    var topHeight = headerTop.height();

    headerTop.css('min-height', topHeight);
    mainNav.toggleClass('nav--opened');
    $body.toggleClass('body-anim-on').css('overflow-x', 'hidden');
    navList.toggleClass('nav__list--animation-on')
      .fadeIn(500, function () {
        $(this).css('display', 'block');
    });

    if (onToggleClick.isClicked) {
      headerTop.css('min-height', '');
      $body.toggleClass('body-anim-off')
        .css('overflow-x', '')
        .removeAttr('style');
      navList.toggleClass('nav__list--animation-off')
        .fadeOut(500, function () {
          $(this).css('display', '');
      });
      setTimeout(function () {
        $body.removeClass('body-anim-off');
        navList.removeClass('nav__list--animation-off');
        $body.removeAttr('class');
        onToggleClick.isClicked = false;
      }, 501);
    }

    if (screen.width > window.util.screenWidth.TAB_MAX) {
      if (!onToggleClick.isClicked) {
        mainNav.animate({
          left: '-7vw'
        }, 500);
      } else {
        mainNav.animate({
          left: 0
        }, 500);
      }
    }

    if (screen.width <= window.util.screenWidth.TAB_MAX) {
      var howScroll = $(window).scrollTop();

      if (!onToggleClick.isClicked) {
        $body.off('scroll').css({
          overflow: 'hidden',
          position: 'fixed',
          top: '-' + howScroll + 'px',
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

  navToggle.click(function () {
    onToggleClick();

    if (!onToggleClick.isClicked) {
      onToggleClick.isClicked = true;
    }
  });
})();
