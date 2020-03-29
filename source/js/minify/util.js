'use strict';

(function () {
  const screenWidth = {
    MOB_MIN: 320,
    MOB_SUBSCR_MIN: 590,
    MOB_MID: 610,
    MOB_MAX: 768,
    TAB_MIN: 768,
    TAB_MAX: 1159,
    DESK_MIN: 1160,
    BODY_MAX: 1920
  };

  var deviceVersion = {
    'mob': '320px',
    'tab': '768px',
    'desk': '1160px'
  };

  var fragment = document.createDocumentFragment();

  const debounce = (cb, interval) => {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, interval);
    };
  };

  window.util = {
    screenWidth: screenWidth,
    deviceVersion: deviceVersion,
    fragment: fragment,
    debounce: debounce
  };
})();
