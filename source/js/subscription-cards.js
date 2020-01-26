'use strict';

(function () {
  var SUBSCRIPTIONS_URL = 'https://b-612.github.io/json/yoga/subscription-cards.json';

  var section = $('.subscriptions');
  var $subscriptionCardTemp = $.parseHTML($('#subscription').html());

  var makeTime = function (subscriptionData, textElem, timeElem) {
    if (subscriptionData.isTimeLimit) {
      $(timeElem)[0].textContent = 'с ' + subscriptionData.startTime + ' до ' + subscriptionData.endTime;
    } else {
      $(textElem)[0].textContent = 'Посещение не ограничено по времени';
      $(timeElem)[0].remove();
    }
  };

  var makeSubscription = function (subscriptionData) {
    var $subscriptionCard = $($subscriptionCardTemp).clone();
    var $subscriptionParam = {
      TITLE: $($subscriptionCard).find('.subscription__title'),
      TEXT: $($subscriptionCard).find('.subscription__description'),
      TIME: $($subscriptionCard).find('.subscription__time'),
      PRICE: $($subscriptionCard).find('.subscription__price-number'),
      ORDER_LINK: $($subscriptionCard).find('.subscription__link')
    };

    window.items.makeElemOrAttr($($subscriptionParam.TITLE)[0], [subscriptionData.title], ['textContent']);
    makeTime(subscriptionData, $subscriptionParam.TEXT, $subscriptionParam.TIME);
    window.items.makeElemOrAttr($($subscriptionParam.PRICE)[0], [subscriptionData.price], ['textContent']);
    window.items.makeElemOrAttr($($subscriptionParam.ORDER_LINK)[0], [subscriptionData.orderLink], ['href']);

    return $($subscriptionCard)[0];
  };

  window.backend.getItems(SUBSCRIPTIONS_URL, window.items.makeItems, window.items.removeSection(section), makeSubscription, section, 'subscriptions__list');
})();
