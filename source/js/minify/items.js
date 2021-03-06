'use strict';

(function () {
  const makeElemAttr = (itemElem, dataElemArr, itemElemOrAttrArr) => {
    for (let i = 0; i < dataElemArr.length; i++) {
      if (dataElemArr[i]) {
        itemElem.setAttribute(itemElemOrAttrArr[i], dataElemArr[i]);
      } else {
        itemElem.remove();
        break;
      }
    }
  };

  const makeText = (element, data) => {
    if (data) {
      element.text(data);
    } else {
      element.remove();
    }
  };

  const makeHref = (element, data) => {
    if (data) {
      element.attr('href', data);
    } else {
      element.remove();
    }
  };

  const makeSources = (deviceVersions, imageData, imgFormats) => {
    if (imageData) {
      const sources = [];

      $.each(deviceVersions, function (i, device) {
        $.each(imgFormats, function (j, format) {
          const source = document.createElement('source');

          if (format === 'webp') {
            if (i !== 'mob') {
              makeElemAttr(source, [
                  'image/webp',
                  `(min-width: ${device})`,
                  `img/${imageData}-${i}@1x.${format} 1x, img/${imageData}-${i}@2x.${format} 2x`
                ],
                ['type', 'media', 'srcset']);
            } else {
              makeElemAttr(source, [
                  'image/webp',
                  `img/${imageData}-${i}@1x.${format} 1x, img/${imageData}-${i}@2x.${format} 2x`
                ],
                ['type', 'srcset']);
            }
          } else {
            if (i !== 'mob') {
              makeElemAttr(source, [
                  '(min-width: ' + device + ')',
                  `img/${imageData}-${i}@1x.${format} 1x, img/${imageData}-${i}@2x.${format} 2x`
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
    }

    return null;
  };

  const setImgAttr = (imgElem, imgData, title) => {
    imgElem.attr('src', `img/${imgData}-mob@1x.jpg`);
    imgElem.attr('srcset', `img/${imgData}-mob@2x.jpg 2x`);
    imgElem.attr('alt', title);
    imgElem.attr('width', '250');
    imgElem.attr('height', '200');
  };

  const makeItemImage = (imgElem, imageData, deviceVersions, imgFormats) => {
    const picture = document.createElement('picture');


    $.each(makeSources(deviceVersions, imageData, imgFormats), function () {
      picture.appendChild(this);
    });

    picture.appendChild($(imgElem)[0]);

    return picture;
  };

  const makeItems = function (itemsData, makeItem, section, listClass, makeSlider) {
    const ANIMATION_TIME = 300;

    const itemsArgs = arguments;
    const setTheBest = itemsArgs[itemsArgs.length - 2];
    const setItemsListeners = itemsArgs[itemsArgs.length - 1];
    const fragment = window.util.fragment;
    const list = section.find('.' + listClass);

    if (section.hasClass('directions') && !window.items.directionsData) {
      window.items.directionsData = itemsData;
    }

    if (section.hasClass('directions') && screen.width >= window.util.screenWidth.TAB_MIN) {
      const $itemsWrapper = $('<div>').addClass('directions__items-wrapper');
      const $btnLookMore = $('<a>', {href: '#'}).addClass('directions__watch-more').text('Смотреть больше');
      const firstItem = makeItem(window.items.directionsData[0]);

      for (let i = 1; i < window.items.directionsData.length; i += 1) {
        const item = makeItem(window.items.directionsData[i]);
        $(item).addClass('direction--small');
        $($itemsWrapper)[0].appendChild(item);
      }

      $itemsWrapper.append($btnLookMore);
      $(firstItem).addClass('direction--big');
      fragment.appendChild(firstItem);
      fragment.appendChild($($itemsWrapper)[0]);
    } else if (section.hasClass('directions')) {
      $.each(window.items.directionsData, function () {
        fragment.appendChild(makeItem(this));
      });
    } else {
      $.each(itemsData, function () {
        fragment.appendChild(makeItem(this));
      });
    }

    switch (true) {
      case section.hasClass('subscriptions') && window.subscriptions.onTimeBtnClickCounter > 1 :
        if (screen.width >= window.util.screenWidth.TAB_MIN) {
          const listHeight = list.height();
          list.css('min-height', listHeight).animate({
              opacity: 0
            },
            ANIMATION_TIME, function () {
              $(this).empty();
              this.appendChild(fragment);

              setTheBest();
              setItemsListeners();

              $(this).animate({
                opacity: 1
              }, ANIMATION_TIME);
            });
        } else {
          list.animate({
              opacity: 0
            },
            ANIMATION_TIME, function () {
              $(this).empty();
              this.appendChild(fragment);
              $(this).animate({
                opacity: 1,
              }, ANIMATION_TIME);
            });
        }
        break;

      case listClass === 'members-slider' || listClass === 'reviews-slider' :
        section.find('.' + listClass).empty()[0].appendChild(fragment);
        makeSlider();
        break;

      default :
        section.find('.' + listClass).empty()[0].appendChild(fragment);
    }
  };

  const removeSection = (section) => {
    return () => {
      section.remove();
    }
  };

  window.items = {
    makeText: makeText,
    makeHref: makeHref,
    makeItemImage: makeItemImage,
    setImgAttr: setImgAttr,
    removeSection: removeSection,
    makeItems: makeItems,
  };
})();
