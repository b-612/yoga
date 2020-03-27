'use strict';

(function () {
  const IMG_FORMATS = ['jpg', 'webp'];
  const DIRECTIONS_URL = 'https://b-612.github.io/json/yoga/directions.json';

  const $section = $('.directions');
  const $directionCardTemp = $.parseHTML($('#direction').html());

  const makeScheduleItems = (DOMElem, dataSchedule, scheduleList) => {
    $(scheduleList).empty();

    dataSchedule.forEach((it) => {
      const days = it.days.join(', ');

      const scheduleItem = DOMElem.clone();
      scheduleItem.text(days + ' – с ' + it.startTime + ' до ' + it.endTime);
      scheduleList.append(scheduleItem);
    });
  };

  const makeDirection = (directionData) => {
    const $directionCard = $($directionCardTemp).clone();
    const $DirectionParam = {
      TITLE: $($directionCard).find('.direction__title'),
      SCHEDULE_LIST: $($directionCard).find('.direction__schedule'),
      SCHEDULE_ITEM: $($directionCard).find('.direction__schedule-item'),
      TEACHER_NAME: $($directionCard).find('.direction__teacher-name'),
      IMAGE: $($directionCard).find('.direction__image'),
      LINK: $($directionCard).find('.direction__link')
    };

    window.items.setImgAttr($DirectionParam.IMAGE, directionData.image, directionData.title);
    $DirectionParam.LINK.before(window.items.makeItemImage($DirectionParam.IMAGE, directionData.image, window.util.deviceVersion, IMG_FORMATS));
    window.items.makeText($DirectionParam.TITLE, directionData.title);
    makeScheduleItems($DirectionParam.SCHEDULE_ITEM, directionData.schedule, $DirectionParam.SCHEDULE_LIST);
    window.items.makeText($DirectionParam.TEACHER_NAME, directionData.teacher);
    window.items.makeHref($DirectionParam.LINK, directionData.link);

    return $($directionCard)[0];
  };

  // url, onSuccess, onError, makeItem, section, listClass, makeSlider

  const InquiryParam = {
    URL: DIRECTIONS_URL,
    ON_SUCCESS: {
      makeItems: window.items.makeItems
    },
    ON_ERROR: window.items.removeSection,
    MAKE_ITEM: makeDirection,
    SECTION: $section,
    LIST_CLASS: 'directions__list',
    MAKE_SLIDER: null
  };

  window.backend.getItems(InquiryParam);
})();
