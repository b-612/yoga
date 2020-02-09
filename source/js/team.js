'use strict';

(function () {
  var TEAM_MEMBERS_URL = 'https://b-612.github.io/json/yoga/team.json';

  var $section = $('.team');
  var $teamCardTemp = $.parseHTML($('#team-member').html());

  var makeDescription = function (descriptionData, element) {
    var description = [];

    descriptionData.forEach(function (current) {
      var nextElem = $(element).clone();
      nextElem.text(current);
      description.push(nextElem);
    });

    return description;
  };

  var makeAvatar = function (imageElement, imageData) {
    imageElement.attr('src', 'img/' + imageData + '-mob@1x.jpg');
    imageElement.attr('srcset', 'img/' + imageData + '-mob@2x.jpg 2x');
    $(imageElement.parent()).find('source[media="(min-width: 768px)"][type != "image/webp"]').attr('srcset', 'img/' + imageData + '-tablet@1x.jpg 1x, img/' + imageData + '-tablet@2x.jpg 2x');
    $(imageElement.parent()).find('source[media="(min-width: 1300px)"][type != "image/webp"]').attr('srcset', 'img/' + imageData + '-desktop@1x.jpg 1x, img/' + imageData + '-desktop@2x.jpg 2x');
    $(imageElement.parent()).find('source[type="image/webp"][media != "(min-width: 768px)"][media != "(min-width: 1300px)"]').attr('srcset', 'img/' + imageData + '-mob@1x.webp 1x, img/' + imageData + '-mob@2x.webp 2x');
    $(imageElement.parent()).find('source[media="(min-width: 768px)"][type = "image/webp"]').attr('srcset', 'img/' + imageData + '-tablet@1x.webp 1x, img/' + imageData + '-tablet@2x.webp 2x');
    $(imageElement.parent()).find('source[media="(min-width: 1300px)"][type = "image/webp"]').attr('srcset', 'img/' + imageData + '-desktop@1x.webp 1x, img/' + imageData + '-desktop@2x.webp 2x');
  };

  var makeTeamMember = function (teamMemberData) {
    var $memberCard = $($teamCardTemp).clone();
    var $memberParam = {
      MEMBER_NAME: $($memberCard).find('.team-member__name'),
      MEMBER_PRACTICE: $($memberCard).find('.team-member__practice'),
      MEMBER_IMAGE: $($memberCard).find('.team-member__avatar'),
      LINK_VK: $($memberCard).find('.team-member__social-link--vk'),
      LINK_TWITTER: $($memberCard).find('.team-member__social-link--twitter'),
      EXPERIENCE_TIME: $($memberCard).find('.team-member__experience-time'),
      DESCRIPTION: $($memberCard).find('.team-member__description')
    };

    window.items.makeElemOrAttr($($memberParam.MEMBER_NAME)[0], [teamMemberData.name], ['textContent']);
    window.items.makeElemOrAttr($($memberParam.MEMBER_PRACTICE)[0], [teamMemberData.practice], ['textContent']);
    makeAvatar($memberParam.MEMBER_IMAGE, teamMemberData.image);
    window.items.makeElemOrAttr($($memberParam.LINK_VK)[0], [teamMemberData.vk], ['href']);
    window.items.makeElemOrAttr($($memberParam.LINK_TWITTER)[0], [teamMemberData.twitter], ['href']);
    window.items.makeElemOrAttr($($memberParam.EXPERIENCE_TIME)[0], [teamMemberData.experienceTime], ['textContent']);
    $($memberCard).find('.team-member__description').remove();

    makeDescription(teamMemberData.description, $($memberParam.DESCRIPTION)[0]).forEach(function (current) {
        $memberCard.append(current);
    });

    return $($memberCard)[0];
  };

  var makeTeamSlider = function () {
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
  };

  window.backend.getItems(TEAM_MEMBERS_URL, window.items.makeItems, window.items.removeSection($section), makeTeamMember, $section, 'members-slider', makeTeamSlider);
})();
