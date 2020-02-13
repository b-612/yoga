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

  var getItems = function (itemParams) {
    $.ajax(itemParams.URL, {
      success: function (resp) {
        itemParams.ON_SUCCESS(resp, itemParams.MAKE_ITEM, itemParams.SECTION, itemParams.LIST_CLASS, itemParams.MAKE_SLIDER);
      },
      error: itemParams.ON_ERROR(itemParams.SECTION)
    })
  };

  window.backend = {
    getItems: getItems
  };
})();
