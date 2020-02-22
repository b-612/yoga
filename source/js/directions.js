'use strict';

(function () {
  var IMG_FORMATS = ['jpg', 'webp'];
  var DIRECTIONS_URL = 'https://b-612.github.io/json/yoga/directions.json';

  var section = $('.directions');
  var $directionCardTemp = $.parseHTML($('#direction').html());

  var makeScheduleItems = function (DOMElem, dataSchedule, scheduleList) {
    $(scheduleList).empty();

    dataSchedule.forEach(function (it) {
      var days = it.days.join(', ');

      var scheduleItem = DOMElem.clone();
      scheduleItem.text(days + ' – с ' + it.startTime + ' до ' + it.endTime);
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
    window.items.makeText($directionParam.TITLE, directionData.title);
    makeScheduleItems($directionParam.SCHEDULE_ITEM, directionData.schedule, $directionParam.SCHEDULE_LIST);
    window.items.makeText($directionParam.TEACHER_NAME, directionData.teacher);
    window.items.makeHref($directionParam.LINK, directionData.link);

    return $($directionCard)[0];
  };

  // url, onSuccess, onError, makeItem, section, listClass, makeSlider

  var InquiryParam = {
    URL: DIRECTIONS_URL,
    ON_SUCCESS: {
      makeItems: window.items.makeItems
    },
    ON_ERROR: window.items.removeSection,
    MAKE_ITEM: makeDirection,
    SECTION: section,
    LIST_CLASS: 'directions__list',
    MAKE_SLIDER: null
  };

  window.backend.getItems(InquiryParam);
})();
