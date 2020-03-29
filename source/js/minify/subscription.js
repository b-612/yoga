'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 200;
  const SUBSCRIPTIONS_URL_ONE_MONTH = 'https://b-612.github.io/json/yoga/subscriptionOneMonth.json';
  const SUBSCRIPTIONS_URL_SIX_MONTH = 'https://b-612.github.io/json/yoga/subscriptionSixMonths.json';
  const SUBSCRIPTIONS_URL_YEAR = 'https://b-612.github.io/json/yoga/subscriptionYear.json';

  const $section = $('.subscriptions');
  const $subscriptionCardTemp = $.parseHTML($('#subscription').html());
  const $subscriptionBtn = $('.subscriptions__time-btn');

  const makeTime = (subscriptionData, textElem, timeElem) => {
    if (subscriptionData.isTimeLimit) {
      timeElem.text('с ' + subscriptionData.startTime + ' до ' + subscriptionData.endTime);
    } else {
      textElem.text('Посещение не ограничено по времени');
      timeElem.remove();
    }
  };

  const makeSubscription = (subscriptionData) => {
    const $subscriptionCard = $($subscriptionCardTemp).clone();
    const $subscriptionParam = {
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

  const onItemHover = window.util.debounce(function (evt) {
    const ANIMATION_TIME = 300;

    if ($(evt.currentTarget).hasClass('subscription')) {
      $('.subscription').not($(evt.currentTarget))
        .removeClass('subscription--best')
        .find('.subscription__link').hide();
      $(evt.currentTarget).addClass('subscription--best')
        .find('.subscription__link')
        .slideDown(ANIMATION_TIME, function () {
          $(this).show();
        });
    }
  }, DEBOUNCE_INTERVAL);

  const setItemsListeners = () => {
    if (screen.width >= window.util.screenWidth.TAB_MIN) {
      $('.subscription').on('mouseenter', onItemHover).focus(onItemHover);
    }
  };

  const setStartBest = () => {
    $('.subscription:eq(1)').addClass('subscription--best');

    if (screen.width >= window.util.screenWidth.TAB_MIN) {
      $('.subscription')
        .not('.subscription:eq(1)')
        .find('.subscription__link')
        .hide();
    }
  };

  const InquiryParam = {
    URL: SUBSCRIPTIONS_URL_ONE_MONTH,
    ON_SUCCESS: {
      makeItems: window.items.makeItems,
      setTheBest: setStartBest,
      setItemsListeners: setItemsListeners,
      setListHeight: () => {
        const startHeight = $('.subscriptions__list').height();
        $('.subscriptions__list').css('min-height', startHeight);
      }
    },
    ON_ERROR: window.items.removeSection,
    MAKE_ITEM: makeSubscription,
    SECTION: $section,
    LIST_CLASS: 'subscriptions__list',
    MAKE_SLIDER: null,
  };

  const onTimeBtnClick = (evt) => {
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

  const setBtnsListeners = () => {
    $subscriptionBtn.click((evt) => {
      evt.preventDefault();
      $subscriptionBtn.removeClass('subscriptions__time-btn--current');
      $(evt.target).addClass('subscriptions__time-btn--current');
      onTimeBtnClick(evt);
    });
  };

  const resizeSubscr = () => {
    $('.subscriptions__list').css('min-height', '');
    $subscriptionBtn[0].click();
  };

  setBtnsListeners();

  window.subscriptions = {
    onTimeBtnClickCounter: 0,
    resizeSubscr: resizeSubscr
  };

  $subscriptionBtn[0].click();
})();
