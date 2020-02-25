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
      timeElem.text('с ' + subscriptionData.startTime + ' до ' + subscriptionData.endTime);
    } else {
      textElem.text('Посещение не ограничено по времени');
      timeElem.remove();
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

    window.items.makeText($subscriptionParam.TITLE, subscriptionData.title);
    makeTime(subscriptionData, $subscriptionParam.TEXT, $subscriptionParam.TIME);
    window.items.makeText($subscriptionParam.PRICE, subscriptionData.price);
    window.items.makeHref($subscriptionParam.ORDER_LINK, subscriptionData.orderLink);

    return $($subscriptionCard)[0];
  };

  var onItemHover = function (evt) {
    if ($(evt.currentTarget).hasClass('subscription')) {
      $('.subscription').not(this)
        .removeClass('subscription--best')
        .find('.subscription__link').fadeOut(300, function () {
          $(this).hide();
        });
      $(evt.currentTarget).addClass('subscription--best')
        .find('.subscription__link')
        .fadeIn(300, function () {
          $(this).show();
        });
    }
  };

  var setItemsListeners = function () {
    if (screen.width >= window.util.screenWidth.TAB_MIN) {
      $('.subscription').hover(onItemHover);
      $('.subscription').focus(onItemHover);
    }
  };

  var setBestSubscr = function () {
    $('.subscription:eq(1)').addClass('subscription--best');
  };

  var InquiryParam = {
    URL: SUBSCRIPTIONS_URL_ONE_MONTH,
    ON_SUCCESS: {
      makeItems: window.items.makeItems,
      setTheBest: setBestSubscr,
      setItemsListeners: setItemsListeners
    },
    ON_ERROR: window.items.removeSection,
    MAKE_ITEM: makeSubscription,
    SECTION: section,
    LIST_CLASS: 'subscriptions__list',
    MAKE_SLIDER: null,
  };

  var onTimeBtnClick = function (evt) {
    switch (true) {
      case $(evt.target).hasClass('subscriptions__time-btn--one-month') :
        InquiryParam.URL = SUBSCRIPTIONS_URL_ONE_MONTH;
        window.backend.getItems(InquiryParam);
      break;

      case $(evt.target).hasClass('subscriptions__time-btn--six-months') :
        InquiryParam.URL = SUBSCRIPTIONS_URL_SIX_MONTH;
        window.backend.getItems(InquiryParam);
      break;

      case $(evt.target).hasClass('subscriptions__time-btn--year') :
        InquiryParam.URL = SUBSCRIPTIONS_URL_YEAR;
        window.backend.getItems(InquiryParam);
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
