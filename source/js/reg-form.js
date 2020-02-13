'use strict';

(function () {
  var $form = $('.registration__form');

  var setPrevElems = function () {
    var Element = {
      MESSAGE: document.createElement('span'),
      FURTHER_ACTIONS: document.createElement('button'),
      TEXT_WRAPPER: document.createElement('div')
    };

    $(Element.MESSAGE).addClass('registration__message');
    $(Element.FURTHER_ACTIONS).addClass('registration__further-actions')
      .attr('type', 'button');
    $(Element.TEXT_WRAPPER).addClass('registration__message-text-wrapper');

    return Element;
  };

  var editAndPushElements = function (elements, messageText, furtherText) {
    $(elements.MESSAGE).text(messageText);
    $(elements.FURTHER_ACTIONS).text(furtherText);
    elements.TEXT_WRAPPER.append(elements.MESSAGE);
    elements.TEXT_WRAPPER.append(elements.FURTHER_ACTIONS);
    window.util.fragment.append(elements.TEXT_WRAPPER);
    $('.registration .container').append(window.util.fragment).fadeIn(300);
  };

  var onTryBtnClick = function () {
    console.log('Сработало');
    var $removingElements = $('.registration__send-icon, .registration__message-text-wrapper');
    var form = $('.registration__form')[0];
    var $startElements = $('.registration__form, .registration__title');

    $removingElements.fadeOut(300);
    window.setTimeout(function () {
      $removingElements.remove();
      form.reset();
      $startElements.fadeIn(300);
    }, 300)
  };

  var setTryBtnCallback = function () {
    $('.registration__further-actions').click(function () {
      onTryBtnClick();
    });
  };

  var onSendSuccess = function () {
    var elements = setPrevElems();
    var $icon = $('.registration__send-icon');

    $icon.fadeOut(300);
    window.setTimeout(function () {
      $icon.removeClass('registration__send-icon--progress')
        .addClass('registration__send-icon--success')
        .fadeIn(300);

      editAndPushElements(elements, 'Ваша заявка была успешно отправлена', 'Отправить ещё одну заявку');
      setTryBtnCallback();
    }, 300);
  };

  var onSendError = function () {
    var elements = setPrevElems();
    var $icon = $('.registration__send-icon');

    $icon.fadeOut(300);
    window.setTimeout(function () {
      $icon.removeClass('registration__send-icon--progress')
        .addClass('registration__send-icon--error')
        .fadeIn(300);

      editAndPushElements(elements, 'Что-то пошло не так...', 'Попробовать ещё раз');
      setTryBtnCallback();
    }, 300);
  };

  var onSubmitSend = function () {
    var $container = $('.registration .container');
    var startHeight = $container.height();
    var $startContent = $container.children();
    var progressIcon = document.createElement('div');

    $container.height(startHeight);
    $startContent.fadeOut(300);
    $(progressIcon).attr('class', 'registration__send-icon registration__send-icon--progress');
    $container.append(progressIcon);
  };

  var SendParam = {
    URL: 'https://echo.htmlacademy.ru/',
    METHOD: 'POST',
    TIMEOUT: 5000,
    ON_SUCCESS: onSendSuccess,
    ON_ERROR: onSendError
  };

  var onFormSubmit = function (sendParams) {
    var formData = $form.serializeArray();

    $.ajax({
      url: sendParams.URL,
      method: sendParams.METHOD,
      timeout: sendParams.TIMEOUT,
      data: formData,
      dataType: 'html',

      success: sendParams.ON_SUCCESS,
      error: sendParams.ON_ERROR
    });
  };

  var validateForm = function () {
    jQuery.validator.addMethod("checkMask", function(value, element) {
      return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(value);
    });

    $form.validate({
      errorElement: "span",
      errorClass: "registration__error-message",
      rules: {
        name: {
          required: true,
          minlength: 3
        },

        phone: {
          checkMask: true
        }
      },

      messages: {
        name: {
          required: 'Пожалуйста, укажите Ваше имя',
          minlength: 'Имя не может быть короче 3-х символов'
        },

        phone: {
          required: 'Введите, пожалуйста, Ваш номер телефона',
          checkMask: 'Введите правильный номер телефона'
        }
      }
    });

    $('.registration__input[name="phone"]')
      .mask("+7 (999) 999-99-99", {
        autoclear: false
      });
  };

  var setSubmitCallback = function () {
    $form.on('submit', function (evt) {
      evt.preventDefault();

      if ($('.registration__input[name=name]').val() !== '' && $('.registration__input[name=phone]').val() !== '') {
        var invalidObj = $('.registration__form').validate().invalid;
        var isObjElem = invalidObj[Object.keys(invalidObj)[0]];

        if (!isObjElem) {
          onSubmitSend();
          onFormSubmit(SendParam);
        }
      }
    });
  };

  validateForm();
  setSubmitCallback();
})();
