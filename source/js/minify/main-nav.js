'use strict';

(function () {
  const $body = $('body');
  const mainNav = $body.find('.nav');
  const navList = mainNav.find('.nav__list');
  const navToggle = mainNav.find('.nav__toggle');
  const headerTop = $body.find('.page-header__top');
  const $navItems = $('.nav__link');

  mainNav.removeClass('nav--no-js');

  const onToggleClick = () => {
    const NAV_TIMEOUT = 500;
    const NAV_OPENED_MARGIN = 20;

    const topHeight = headerTop.height();

    headerTop.css('min-height', topHeight);
    mainNav.toggleClass('nav--opened');
    $body.toggleClass('body-anim-on').css('overflow-x', 'hidden');
    navList.toggleClass('nav__list--animation-on')
      .fadeIn(NAV_TIMEOUT, function () {
        $(this).css('display', 'block');
    });

    if (onToggleClick.isClicked) {
      headerTop.css('min-height', '');
      $body.toggleClass('body-anim-off')
        .css('overflow-x', '')
        .removeAttr('style');
      navList.toggleClass('nav__list--animation-off')
        .fadeOut(NAV_TIMEOUT, function () {
          $(this).css('display', '');
      });

      setTimeout(function () {
        $body.removeClass('body-anim-off');
        navList.removeClass('nav__list--animation-off');
        $body.removeAttr('class');
        onToggleClick.isClicked = false;
      }, NAV_TIMEOUT);
    }

    if (screen.width > window.util.screenWidth.TAB_MIN) {
      if (!onToggleClick.isClicked) {
        mainNav.animate({
          left: -(mainNav.offset().left - $('body').offset().left - NAV_OPENED_MARGIN) + 'px'
        }, NAV_TIMEOUT);
      } else {
        mainNav.animate({
          left: 0
        }, NAV_TIMEOUT);
      }
    }

    if (screen.width <= window.util.screenWidth.TAB_MAX) {
      const howScroll = $(window).scrollTop();

      if (!onToggleClick.isClicked) {
        $body.off('scroll').css({
          overflow: 'hidden',
          position: 'fixed',
          top: `-${howScroll}px`,
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

  const onNavLinkClick = (evt) => {
    const SCROLL_DURATION = 700;
    const OFFSET_TOP_PLUS = -20;

    evt.preventDefault();
    onToggleClick();
    const $title = $(`.${$(evt.target).attr('id')}`).find('.section-title');
    $('html, body').animate({
      scrollTop: $title.offset().top + OFFSET_TOP_PLUS + 'px'
    }, SCROLL_DURATION);

    $title.attr('tabindex', '0')
      .focus().blur(function () {
        $(this).removeAttr('tabindex');
    });
  };

  $navItems.click(onNavLinkClick);

  navToggle.click(() => {
    onToggleClick();

    if (!onToggleClick.isClicked) {
      onToggleClick.isClicked = true;
    }
  });
})();
