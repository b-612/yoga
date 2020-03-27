'use strict';

(function () {
  const requestParam = {
    GET_REQUEST: 'GET',
    GET_DATA_TYPE: 'json',

    POST_REQUEST: 'POST',

    REQUEST_TIMEOUT: 5000
  };

  $.ajaxSetup({
    method: requestParam.GET_REQUEST,
    timeout: requestParam.REQUEST_TIMEOUT,
    dataType: requestParam.GET_DATA_TYPE
  });

  const getItems = (itemParams) => {
    $.ajax(itemParams.URL, {
      success: (resp) => {
        if (!itemParams.ON_SUCCESS.setTheBest) {
          itemParams.ON_SUCCESS.makeItems(resp, itemParams.MAKE_ITEM, itemParams.SECTION, itemParams.LIST_CLASS, itemParams.MAKE_SLIDER);
        }

        if (itemParams.ON_SUCCESS.setTheBest) {
          itemParams.ON_SUCCESS.makeItems(resp, itemParams.MAKE_ITEM, itemParams.SECTION, itemParams.LIST_CLASS, itemParams.MAKE_SLIDER, itemParams.ON_SUCCESS.setTheBest, itemParams.ON_SUCCESS.setItemsListeners);
          itemParams.ON_SUCCESS.setTheBest();
          itemParams.ON_SUCCESS.setListHeight();
        }

        if (itemParams.ON_SUCCESS.setItemsListeners) {
          itemParams.ON_SUCCESS.setItemsListeners();
        }
      },

      error: itemParams.ON_ERROR(itemParams.SECTION)
    })
  };

  window.backend = {
    getItems: getItems
  };
})();
