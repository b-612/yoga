'use strict';

(function () {
  var screenWidth = {
    MOB_MIN: 320,
    MOB_MID: 610,
    MOB_MAX: 768,
    TAB_MIN: 768,
    TAB_MAX: 1159,
    DESK_MIN: 1160,
    DESK_MAX: 1920
  };

  var deviceVersion = {
    'mob': '320px',
    'tab': '768px',
    'desk': '1160px'
  };

  var fragment = document.createDocumentFragment();

  window.util = {
    screenWidth: screenWidth,
    deviceVersion: deviceVersion,
    fragment: fragment
  };
})();
