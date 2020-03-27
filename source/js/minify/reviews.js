'use strict';

(function () {
  const REVIEWS_URL = 'https://b-612.github.io/json/yoga/reviews.json';
  const monthMap = {
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

  const section = $('.reviews');
  const $slider = $('.reviews__slider');
  const $reviewCardTemp = $.parseHTML($('#review').html());

  const makeTime = (timeElement, timeData) => {
    let day = timeData.substr(8);
    const month = monthMap[timeData.substr(5, 2)];
    const year = timeData.substr(0, 4);

    if (Number(day[0]) === 0) {
      day = day.substr(1, 1);
    }

    timeElement.attr('datetime', timeData);
    timeElement.text(day + ' ' + month + ' ' + year);
  };

  const makeAuthorImage = (imageElement, imageData) => {
    imageElement.attr('src', 'img/' + imageData + '@1x.jpg');
    imageElement.attr('srcset', 'img/' + imageData + '@2x.jpg 2x');

    $(imageElement.parent())
      .find('source[type="image/webp"]')
      .attr('srcset', 'img/' + imageData + '@1x.webp 1x, img/' + imageData + '@2x.webp 2x');
  };

  window.team.resetSocialCounter();

  var makeReview = (reviewData) => {
    const $reviewCard = $($reviewCardTemp).clone();
    const $ReviewParam = {
      AUTHOR_NAME: $($reviewCard).find('.review__author-name'),
      TIME: $($reviewCard).find('.review__time'),
      AUTHOR_IMAGE: $($reviewCard).find('.review__avatar'),
      LINK_VK: $($reviewCard).find('.review__social-link--vk'),
      LINK_TWITTER: $($reviewCard).find('.review__social-link--twitter'),
      TEXT: $($reviewCard).find('.review__text'),
      DESCRIPTION: $($reviewCard).find('.review__paragraph')
    };

    window.items.makeText($ReviewParam.AUTHOR_NAME, reviewData.authorName);
    makeTime($ReviewParam.TIME, reviewData.time);
    makeAuthorImage($ReviewParam.AUTHOR_IMAGE, reviewData.image);
    $($reviewCard).find('.review__paragraph').remove();
    window.team.makeDescription(reviewData.review, $($ReviewParam.DESCRIPTION)[0]).forEach((current) => {
      $ReviewParam.TEXT.append(current);
    });
    window.team.makeSocial($ReviewParam.LINK_VK, reviewData.vk, 'Вконтакте', 'reviews', reviewData.authorName);
    window.team.makeSocial($ReviewParam.LINK_TWITTER, reviewData.twitter, 'в Твиттер', 'reviews', reviewData.authorName);
    window.team.makeSocial.counter++;

    return $($reviewCard)[0];
  };

  const makePaginationCurrent = (currentSlide) => {
    const $currentPage = $('.reviews__nav-page--current');

    if (screen.width >= window.util.screenWidth.MOB_MID && currentSlide >= 2) {
      $currentPage.text(Math.ceil((currentSlide + 1) / 2));
    } else {
      $currentPage.text(currentSlide + 1);
    }
  };

  const makePaginationAll = () => {
    const $allPages = $('.reviews__nav-page--all');
    const $slides = $('.reviews-slider__item-wrapper:not(.slick-cloned)');

    $allPages.text($slides.length);

    if (screen.width >= window.util.screenWidth.MOB_MID && $slides.length > 1) {
      $allPages.text(Math.ceil($slides.length / 2));
    } else {
      $allPages.text($slides.length);
    }
  };

  const makeReviewsSlider = () => {
    $('.reviews-slider').slick({
      dots: false,
      prevArrow: '<button class="reviews__btn reviews__btn--prev slider-arrow" type="button"><span class="visually-hidden">Предыдущий отзыв</span></button>',
      nextArrow: '<button class="reviews__btn reviews__btn--next slider-arrow" type="button"><span class="visually-hidden">Следующий отзыв</span></button>',
      infinite: true,
      accessibility: true,
      zIndex: 1000,
      speed: 300,
      slidesToShow: 2,
      slidesToScroll: 2,

      responsive: [
        {
          breakpoint: window.util.screenWidth.MOB_MID,
          settings: {
            appendArrows: '.reviews__nav',
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: false,
            draggable: true
          }
        },
        {
          breakpoint: window.util.screenWidth.TAB_MAX + 1,
          settings: {
            appendArrows: '.reviews__nav'
          }
        }
      ]
    });

    window.team.replaceClonedSocials('reviews', $slider, 'review__social-icon');
    makePaginationAll();
  };

  const InquiryParam = {
    URL: REVIEWS_URL,
    ON_SUCCESS: {
      makeItems: window.items.makeItems
    },
    ON_ERROR: window.items.removeSection,
    MAKE_ITEM: makeReview,
    SECTION: section,
    LIST_CLASS: 'reviews-slider',
    MAKE_SLIDER: makeReviewsSlider
  };

  window.backend.getItems(InquiryParam);

  $slider.on('afterChange', (evt, slick, currentSlide) => {
    makePaginationCurrent(currentSlide);
  });

  $(window).resize(function () {
    makePaginationAll();
  });
})();
