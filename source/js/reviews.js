'use strict';

(function () {
  var REVIEWS_URL = 'https://b-612.github.io/json/yoga/reviews.json';
  var monthMap = {
    '01': 'января',
    '02': 'февраля',
    '03': 'марта',
    '04': 'апреля',
    '05': 'мая',
    '06': 'июня',
    '07': 'июля',
    '08': 'августа',
    '09': 'сентября',
    '10': 'октября',
    '11': 'ноября',
    '12': 'декабря'
  };

  var section = $('.reviews');
  var $slider = $('.reviews__slider');
  var $reviewCardTemp = $.parseHTML($('#review').html());

  var makeTime = function (timeElement, timeData) {
    var day = timeData.substr(8);
    var month = monthMap[timeData.substr(5, 2)];
    var year = timeData.substr(0, 4);

    if (Number(day[0]) === 0) {
      day = day.substr(1, 1);
    }

    timeElement.attr('datetime', timeData);
    timeElement.text(day + ' ' + month + ' ' + year);
  };

  var makeAuthorImage = function (imageElement, imageData) {
    imageElement.attr('src', 'img/' + imageData + '@1x.jpg');
    imageElement.attr('srcset', 'img/' + imageData + '@2x.jpg 2x');

    $(imageElement.parent())
      .find('source[type="image/webp"]')
      .attr('srcset', 'img/' + imageData + '@1x.webp 1x, img/' + imageData + '@2x.webp 2x');
  };

  window.team.resetSocialCounter();

  var makeReview = function (reviewData) {
    var $reviewCard = $($reviewCardTemp).clone();
    var $reviewParam = {
      AUTHOR_NAME: $($reviewCard).find('.review__author-name'),
      TIME: $($reviewCard).find('.review__time'),
      AUTHOR_IMAGE: $($reviewCard).find('.review__avatar'),
      LINK_VK: $($reviewCard).find('.review__social-link--vk'),
      LINK_TWITTER: $($reviewCard).find('.review__social-link--twitter'),
      TEXT: $($reviewCard).find('.review__text'),
      DESCRIPTION: $($reviewCard).find('.review__paragraph')
    };

    window.items.makeText($reviewParam.AUTHOR_NAME, reviewData.authorName);
    makeTime($reviewParam.TIME, reviewData.time);
    makeAuthorImage($reviewParam.AUTHOR_IMAGE, reviewData.image);
    $($reviewCard).find('.review__paragraph').remove();
    window.team.makeDescription(reviewData.review, $($reviewParam.DESCRIPTION)[0]).forEach(function (current) {
      $reviewParam.TEXT.append(current);
    });
    window.team.makeSocial($reviewParam.LINK_VK, reviewData.vk, 'Вконтакте', 'reviews', reviewData.authorName);
    window.team.makeSocial($reviewParam.LINK_TWITTER, reviewData.twitter, 'в Твиттер', 'reviews', reviewData.authorName);
    window.team.makeSocial.counter++;

    return $($reviewCard)[0];
  };

  var makePaginationCurrent = function (currentSlide) {
    var $currentPage = $('.reviews__nav-page--current');

    if (screen.width >= 610 && currentSlide >= 2) {
      $currentPage.text(Math.ceil((currentSlide + 1) / 2));
    } else {
      $currentPage.text(currentSlide + 1);
    }
  };

  var makePaginationAll = function () {
    var $allPages = $('.reviews__nav-page--all');
    var $slides = $('.reviews-slider__item-wrapper:not(.slick-cloned)');

    $allPages.text($slides.length);

    if (screen.width >= 610 && $slides.length > 1) {
      $allPages.text(Math.ceil($slides.length / 2));
    } else {
      $allPages.text($slides.length);
    }
  };

  var makeReviewsSlider = function () {
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

    window.team.replaceClonedSocials('reviews', $slider, 'review__social-icon');
    makePaginationAll();
  };

  var InquiryParam = {
    URL: REVIEWS_URL,
    ON_SUCCESS: window.items.makeItems,
    ON_ERROR: window.items.removeSection,
    MAKE_ITEM: makeReview,
    SECTION: section,
    LIST_CLASS: 'reviews-slider',
    MAKE_SLIDER: makeReviewsSlider
  };

  window.backend.getItems(InquiryParam);

  $slider.on('afterChange', function(event, slick, currentSlide) {
    makePaginationCurrent(currentSlide);
  });

  $(window).resize(function () {
    makePaginationAll();
  });
})();
