'use strict';

(function () {
  var requestParam = {
    GET_REQUEST: 'GET',
    GET_DATA_TYPE: 'json',

    POST_REQUEST: 'POST',

    REQUEST_TIMEOUT: 5000
  };

  $.ajaxSetup({
    type: requestParam.GET_REQUEST,
    timeout: requestParam.REQUEST_TIMEOUT,
    dataType: requestParam.GET_DATA_TYPE
  });

  var getItems = function (url, onSuccess, onError) {
    $.ajax(url, {
      success: onSuccess,
      error: onError
    })
  };

  window.backend = {
    getItems: getItems
  };
})();
