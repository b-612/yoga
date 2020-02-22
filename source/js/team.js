'use strict';

(function () {
  var TEAM_MEMBERS_URL = 'https://b-612.github.io/json/yoga/team.json';

  var section = $('.team');
  var $slider = $('.members-slider');
  var $teamCardTemp = $.parseHTML($('#team-member').html());

  var makeDescription = function (descriptionData, element) {
    var description = [];

    descriptionData.forEach(function (current) {
      var nextElem = $(element).clone();
      nextElem.text(current);
      description.push(nextElem);
    });

    return Array.from(description);
  };

  var makeAvatar = function (imageElement, imageData) {
    imageElement.attr('src', 'img/' + imageData + '-mob@1x.jpg');
    imageElement.attr('srcset', 'img/' + imageData + '-mob@2x.jpg 2x');

    $(imageElement.parent())
      .find('source[media="(min-width: 768px)"][type != "image/webp"]')
      .attr('srcset', 'img/' + imageData + '-tablet@1x.jpg 1x, img/' + imageData + '-tablet@2x.jpg 2x');

    $(imageElement.parent())
      .find('source[media="(min-width: 1300px)"][type != "image/webp"]')
      .attr('srcset', 'img/' + imageData + '-desktop@1x.jpg 1x, img/' + imageData + '-desktop@2x.jpg 2x');

    $(imageElement.parent())
      .find('source[type="image/webp"][media != "(min-width: 768px)"][media != "(min-width: 1300px)"]')
      .attr('srcset', 'img/' + imageData + '-mob@1x.webp 1x, img/' + imageData + '-mob@2x.webp 2x');

    $(imageElement.parent())
      .find('source[media="(min-width: 768px)"][type = "image/webp"]')
      .attr('srcset', 'img/' + imageData + '-tablet@1x.webp 1x, img/' + imageData + '-tablet@2x.webp 2x');

    $(imageElement.parent())
      .find('source[media="(min-width: 1300px)"][type = "image/webp"]')
      .attr('srcset', 'img/' + imageData + '-desktop@1x.webp 1x, img/' + imageData + '-desktop@2x.webp 2x');
  };

  var makeSocial = function (socialElem, socialData, socialName, sectionName, authorName) {
    var socialItem = socialElem.parent();
    var svg = socialElem.find('svg');
    var title = svg.find('title');

    socialElem.remove();
    socialElem.attr('href', socialData);

    svg.attr('aria-labelledby', sectionName + 'heading-' + socialElem.find('use').attr('xlink:href').split('#')[1] + '-user-' + makeSocial.counter);

    title.text(authorName + ' ' + socialName);

    socialElem.find('title')
      .attr('id', sectionName + 'heading-' + socialElem.find('use').attr('xlink:href').split('#')[1] + '-user-' + makeSocial.counter);

    socialItem .append(socialElem);

    window.setTimeout(function () {
      var elemClone = socialElem.clone();
      socialItem.empty();
      socialItem .append(elemClone);
    }, 0);

  };

  var resetSocialCounter = function () {
    makeSocial.counter = 1;
  };

  resetSocialCounter();

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

    window.items.makeText($memberParam.MEMBER_NAME, teamMemberData.name);
    window.items.makeText($memberParam.MEMBER_PRACTICE, teamMemberData.practice);
    makeAvatar($memberParam.MEMBER_IMAGE, teamMemberData.image);
    makeSocial($memberParam.LINK_VK, teamMemberData.vk, 'Вконтакте', 'team', teamMemberData.name);
    makeSocial($memberParam.LINK_TWITTER, teamMemberData.twitter, 'в Твиттер', 'team', teamMemberData.name);
    makeSocial.counter++;
    window.items.makeText($memberParam.EXPERIENCE_TIME, teamMemberData.experienceTime);
    $($memberCard).find('.team-member__description').remove();

    makeDescription(teamMemberData.description, $memberParam.DESCRIPTION[0])
      .forEach(function (current) {
        $memberCard.append(current);
    });

    return $($memberCard)[0];
  };

  var replaceClonedSocials = function (sectionName, slider, socialIconClass) {
    var $oldAttr = sectionName + 'heading';

    slider.find('.slick-cloned')
      .find('.' + socialIconClass)
      .each(function (i) {
        $(this).attr('aria-labelledby', $oldAttr +  '-' + i);
        $(this).find('title').attr('id', $oldAttr +  '-' + i);
      })
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

    window.setTimeout(function () {
      replaceClonedSocials('team', $slider, 'team-member__social-icon');
    }, 0);
  };

  var InquiryParam = {
    URL: TEAM_MEMBERS_URL,
    ON_SUCCESS: {
      makeItems: window.items.makeItems
    },
    ON_ERROR: window.items.removeSection,
    MAKE_ITEM: makeTeamMember,
    SECTION: section,
    LIST_CLASS: 'members-slider',
    MAKE_SLIDER: makeTeamSlider
  };

  window.backend.getItems(InquiryParam);

  window.team = {
    makeDescription: makeDescription,
    makeSocial: makeSocial,
    resetSocialCounter: resetSocialCounter,
    replaceClonedSocials: replaceClonedSocials
  }
})();
