'use strict';

(function () {
  var SUBSCRIPTIONS_URL_ONE_MONTH = 'https://b-612.github.io/json/yoga/subscriptionOneMonth.json';
  var SUBSCRIPTIONS_URL_SIX_MONTH = 'https://b-612.github.io/json/yoga/subscriptionSixMonths.json';
  var SUBSCRIPTIONS_URL_YEAR = 'https://b-612.github.io/json/yoga/subscriptionYear.json';

  var section = $('.subscriptions');
  var $subscriptionCardTemp = $.parseHTML($('#subscription').html());
  var $subscriptionBtn = $('.subscriptions__time-btn');

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

  var onTimeBtnClick = function (evt) {
    switch (true) {
      case $(evt.target).hasClass('subscriptions__time-btn--one-month') :
        window.backend.getItems(SUBSCRIPTIONS_URL_ONE_MONTH, window.items.makeItems, window.items.removeSection(section), makeSubscription, section, 'subscriptions__list');
      break;

      case $(evt.target).hasClass('subscriptions__time-btn--six-months') :
        window.backend.getItems(SUBSCRIPTIONS_URL_SIX_MONTH, window.items.makeItems, window.items.removeSection(section), makeSubscription, section, 'subscriptions__list');
        break;

      case $(evt.target).hasClass('subscriptions__time-btn--year') :
        window.backend.getItems(SUBSCRIPTIONS_URL_YEAR, window.items.makeItems, window.items.removeSection(section), makeSubscription, section, 'subscriptions__list');
        break;
    }

    window.subscriptions.onTimeBtnClickCounter++;
  };

  var setBtnsListeners = function () {
    $subscriptionBtn.click(function (evt) {
      evt.preventDefault();
      $subscriptionBtn.removeClass('subscriptions__time-btn--current');
      $(evt.target).addClass('subscriptions__time-btn--current');
      onTimeBtnClick(evt);
    });
  };

  setBtnsListeners();

  window.subscriptions = {
    onTimeBtnClickCounter: 0
  };

  $subscriptionBtn[0].click();
})();
