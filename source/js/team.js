'use strict';

(function () {
  var TEAM_MEMBERS_URL = 'https://b-612.github.io/json/yoga/team.json';

  var $section = $('.team');
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

  var makeSocial = function (socialElem, socialData, sectionName) {
    var socialItem = socialElem.parent();

    socialElem.remove();
    socialElem.attr('href', socialData);

    socialElem.find('svg')
      .attr('aria-labelledby', sectionName + 'heading-' + socialElem.find('use').attr('xlink:href').split('#')[1] + '-user-' + makeSocial.counter);

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
    makeSocial($memberParam.LINK_VK, teamMemberData.vk, 'team');
    makeSocial($memberParam.LINK_TWITTER, teamMemberData.twitter, 'team');
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
        $(this).attr('aria-labelledby', $oldAttr +  '#' + i);
        $(this).find('title').attr('id', $oldAttr +  '#' + i);
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

    replaceClonedSocials('team', $slider, 'team-member__social-icon');
  };

  window.backend.getItems(TEAM_MEMBERS_URL, window.items.makeItems, window.items.removeSection($section), makeTeamMember, $section, 'members-slider', makeTeamSlider);

  window.team = {
    makeDescription: makeDescription,
    makeSocial: makeSocial,
    resetSocialCounter: resetSocialCounter,
    replaceClonedSocials: replaceClonedSocials
  }
})();
