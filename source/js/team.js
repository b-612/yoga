'use strict';

(function () {
  $('.members-slider').slick({
    dots: false,
    prevArrow: '<button class="members-slider__btn members-slider__btn--prev slider-arrow" type="button"><span class="visually-hidden">Предыдущий участник</span></button>',
    nextArrow: '<button class="members-slider__btn members-slider__btn--next slider-arrow" type="button"><span class="visually-hidden">Следующий участник</span></button>',
    infinite: true,
    accessibility: true,
    zIndex: 1000,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
            {
              breakpoint: window.util.screenWidth.MOB_MAX,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: false
              }
            },
            {
              breakpoint: window.util.screenWidth.MOB_MID,
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
