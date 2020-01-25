'use strict';

(function () {
  var deviceVersion = {
    'mob': '320px',
    'tab': '768px',
    'desk': '1160px'
  };

  var fragment = document.createDocumentFragment();

  window.util = {
    deviceVersion: deviceVersion,
    fragment: fragment
  };
})();
