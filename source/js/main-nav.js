'use strict';

(function () {
  var $body = $('body');
  var $mainNav = $body.find('.nav');
  var $navList = $mainNav.find('.nav__list');
  var $navToggle = $mainNav.find('.nav__toggle');

  $mainNav.removeClass('nav--no-js');

  var onToggleClick = function () {
    $mainNav.toggleClass('nav--opened');
    $body.toggleClass('body-anim-on');
    $navList.toggleClass('nav__list--animation-on');

    if (onToggleClick.isClicked) {
      $body.toggleClass('body-anim-off');
      $navList.toggleClass('nav__list--animation-off');
      window.setTimeout(function () {
        $body.removeClass('body-anim-off');
        $navList.removeClass('nav__list--animation-off');
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
})();
