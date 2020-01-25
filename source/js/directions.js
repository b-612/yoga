'use strict';

(function () {
  var IMG_FORMATS = ['jpg', 'webp'];
  var DIRECTIONS_URL = 'https://b-612.github.io/json/yoga/directions.json';

  var section = $('.directions');
  var $directionCardTemp = $.parseHTML($('#direction').html());

  var makeScheduleItems = function (DOMElem, dataSchedule, scheduleList) {
    $(scheduleList)[0].textContent = '';

    dataSchedule.forEach(function (it) {
      var days = it.days.join(', ');

      var scheduleItem = DOMElem.clone();
      $(scheduleItem)[0].textContent = days + ' – с ' + it.startTime + ' до ' + it.endTime;
      scheduleList.append(scheduleItem);
    });
  };

  var makeDirection = function (directionData) {
    var $directionCard = $($directionCardTemp).clone();
    var $directionParam = {
      TITLE: $($directionCard).find('.direction__title'),
      SCHEDULE_LIST: $($directionCard).find('.direction__schedule'),
      SCHEDULE_ITEM: $($directionCard).find('.direction__schedule-item'),
      TEACHER_NAME: $($directionCard).find('.direction__teacher-name'),
      IMAGE: $($directionCard).find('.direction__image'),
      LINK: $($directionCard).find('.direction__link')
    };

    window.items.setImgAttr($directionParam.IMAGE, directionData.image, directionData.title);
    $directionParam.LINK.before(window.items.makeItemImage($directionParam.IMAGE, directionData.image, window.util.deviceVersion, IMG_FORMATS));
    window.items.makeElemOrAttr($directionParam.TITLE, [directionData.title], ['textContent']);
    makeScheduleItems($directionParam.SCHEDULE_ITEM, directionData.schedule, $directionParam.SCHEDULE_LIST);
    window.items.makeElemOrAttr($directionParam.TEACHER_NAME, [directionData.teacher], ['textContent']);
    window.items.makeElemOrAttr($directionParam.LINK, [directionData.link], ['href']);

    return $($directionCard)[0];
  };

  var makeDirections = function (itemsData) {
    var fragment = window.util.fragment;

    $.each(itemsData, function () {
      fragment.append(makeDirection(this));
    });

    section.find('.directions__list').append(fragment);
  };



  var doNothing = function () {

  };

  window.backend.getItems(DIRECTIONS_URL, makeDirections, doNothing);
})();
