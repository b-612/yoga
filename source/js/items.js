'use strict';

(function () {
  var makeElemOrAttr = function (itemElem, dataElemArr, itemElemOrAttrArr) {
    for (var i = 0; i < dataElemArr.length; i++) {
      if (dataElemArr[i]) {
        itemElem[itemElemOrAttrArr[i]] = dataElemArr[i];
      } else {
        itemElem.remove();
        break;
      }
    }
  };

  var makeText = function (element, data) {
    if (data) {
      element.text(data);
    } else {
      element.remove();
    }
  };

  var makeHref = function (element, data) {
    if (data) {
      element.attr('href', data);
    } else {
      element.remove();
    }
  };

  var makeSources = function (deviceVersions, imageData, imgFormats) {
    if (imageData) {
      var sources = [];

      $.each(deviceVersions, function (i, device) {

        $.each(imgFormats, function (j, format) {
          var source = document.createElement('source');

          if (format === 'webp') {
            if (i !== 'mob') {
              makeElemOrAttr(source, [
                  'image/webp',
                  '(min-width: ' + device + ')',
                  'img/' + imageData + '-' + i + '@1x.' + format + ' 1x, ' +
                  'img/' + imageData + '-' + i + '@2x.' + format + ' 2x'
                ],
                ['type', 'media', 'srcset']);
            } else {
              makeElemOrAttr(source, [
                  'image/webp',
                  'img/' + imageData + '-' + i + '@1x.' + format + ' 1x, ' +
                  'img/' + imageData + '-' + i + '@2x.' + format + ' 2x'
                ],
                ['type', 'srcset']);
            }
          } else {
            if (i !== 'mob') {
              makeElemOrAttr(source, [
                  '(min-width: ' + device + ')',
                  'img/' + imageData + '-' + i + '@1x.' + format + ' 1x, ' +
                  'img/' + imageData + '-' + i + '@2x.' + format + ' 2x'
                ],
                ['media', 'srcset']);
            }
          }

          if (source.attributes.length > 0) {
            sources.unshift(source);
          }
        });
      });

      return sources;
    } else {
      return null;
    }
  };

  var setImgAttr = function (imgElem, imgData, title) {
    imgElem.attr('src', 'img/' + imgData + 'mob@1x.jpg');
    imgElem.attr('srcset', 'img/' + imgData + 'mob@2x.jpg 2x');
    imgElem.attr('alt', title);
    imgElem.attr('width', '250');
    imgElem.attr('height', '200');
  };

  var makeItemImage = function (imgElem, imageData, deviceVersions, imgFormats) {
    var picture = document.createElement('picture');


    $.each(makeSources(deviceVersions, imageData, imgFormats), function () {
      picture.append(this);
    });

    picture.append($(imgElem)[0]);

    return picture;
  };

  var makeItems = function (itemsData, makeItem, section, listClass, makeSlider) {
    var fragment = window.util.fragment;
    var list = section.find('.' + listClass);

    $.each(itemsData, function () {
      fragment.append(makeItem(this));
    });

    switch (true) {
      case section.hasClass('subscriptions') && window.subscriptions.onTimeBtnClickCounter > 1 :
        list.empty().fadeOut(5);
        list.append(fragment).fadeIn(1000);
        break;
      case listClass === 'members-slider' || listClass === 'reviews-slider' :
        section.find('.' + listClass).empty().append(fragment);
        makeSlider();
        break;
      default :
        section.find('.' + listClass).empty().append(fragment);
    }
  };

  var removeSection = function (section) {
    return function () {
      section.remove();
    }
  };

  window.items = {
    makeText: makeText,
    makeHref: makeHref,
    makeItemImage: makeItemImage,
    setImgAttr: setImgAttr,
    removeSection: removeSection,
    makeItems: makeItems
  };
})();
