'use strict';

(function () {
  $('.members-slider').slick({
    dots: false,
    prevArrow: '<button class="members-slider__btn members-slider__btn--prev" type="button"><span class="visually-hidden">Предыдущий слайд</span></button>',
    nextArrow: '<button class="members-slider__btn members-slider__btn--next" type="button"><span class="visually-hidden">Следующий слайд</span></button>',
    infinite: true,
    accessibility: true,
    zIndex: 1000,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
            {
              breakpoint: window.util.screenWidth.TAB_MIN,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: false
              }
            },
            {
              breakpoint: window.util.screenWidth.MOB_MAX,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: false,
                draggable: true
            }
      }
    ]
  });
})();
