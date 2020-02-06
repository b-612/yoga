'use strict';

(function () {
  $('.reviews-slider').slick({
    dots: false,
    prevArrow: '<button class="reviews__btn reviews__btn--prev slider-arrow" type="button"><span class="visually-hidden">Предыдущий отзыв</span></button>',
    nextArrow: '<button class="reviews__btn reviews__btn--next slider-arrow" type="button"><span class="visually-hidden">Следующий отзыв</span></button>',
    infinite: true,
    accessibility: true,
    zIndex: 1000,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendArrows: '.reviews__nav',

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
