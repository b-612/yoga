'use strict';

(function () {
  const ANIMATION_TIME = 300;

  const $form = $('.registration__form');

  const setPrevElems = () => {
    const Element = {
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

  const editAndPushElements = (elements, messageText, furtherText) => {
    $(elements.MESSAGE).text(messageText);
    $(elements.FURTHER_ACTIONS).text(furtherText);
    elements.TEXT_WRAPPER.append(elements.MESSAGE);
    elements.TEXT_WRAPPER.append(elements.FURTHER_ACTIONS);
    window.util.fragment.append(elements.TEXT_WRAPPER);
    $('.registration .container').append(window.util.fragment).fadeIn(ANIMATION_TIME);
  };

  const onTryBtnClick = () => {
    const $removingElements = $('.registration__send-icon, .registration__message-text-wrapper');
    const $form = $('.registration__form')[0];
    const $startElements = $('.registration__form, .registration__title');

    $removingElements.fadeOut(ANIMATION_TIME, () => {
      $removingElements.remove();
      $form.reset();
      $startElements.fadeIn(ANIMATION_TIME);
      $('.registration .container').removeAttr('style');
    });
  };

  const setTryBtnCallback = () => {
    $('.registration__further-actions').click(() => {
      onTryBtnClick();
    });
  };

  const showMessage = (elements, icon, addClass, messageText, furtherText) => {
    icon.removeClass('registration__send-icon--progress')
      .addClass(addClass)
      .fadeIn(ANIMATION_TIME);

    editAndPushElements(elements, messageText, furtherText);
    setTryBtnCallback();
  };

  const onSendSuccess = () => {
    const elements = setPrevElems();
    const $icon = $('.registration__send-icon');

    $icon.fadeOut(ANIMATION_TIME, () => {
      showMessage(
        elements,
        $icon,
        'registration__send-icon--success',
        'Ваша заявка была успешно отправлена',
        'Отправить ещё одну заявку'
      );
    });
  };

  const onSendError = () => {
    const elements = setPrevElems();
    const $icon = $('.registration__send-icon');

    $icon.fadeOut(ANIMATION_TIME, () => {
      showMessage(
        elements,
        $icon,
        'registration__send-icon--error',
        'Что-то пошло не так...',
        'Попробовать ещё раз.'
      );
    });
  };

  const onSubmitSend = () => {
    const $container = $('.registration .container');
    const startHeight = $container.height();
    const $startContent = $container.children();
    const progressIcon = document.createElement('div');

    $container.height(startHeight);
    $startContent.fadeOut(ANIMATION_TIME);
    $(progressIcon).attr('class', 'registration__send-icon registration__send-icon--progress');
    $container.append(progressIcon);
  };

  const SendParam = {
    URL: 'https://echo.htmlacademy.ru/',
    METHOD: 'POST',
    TIMEOUT: 5000,
    ON_SUCCESS: onSendSuccess,
    ON_ERROR: onSendError
  };

  const onFormSubmit = (sendParams) => {
    const formData = $form.serializeArray();

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

  const validateForm = () => {
    jQuery.validator.addMethod("checkMask", (value, element) => {
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

  const setSubmitCallback = () => {
    $form.on('submit', (evt) => {
      evt.preventDefault();

      if ($('.registration__input[name=name]').val() !== '' && $('.registration__input[name=phone]').val() !== '') {
        const invalidObj = $('.registration__form').validate().invalid;
        const isObjElem = invalidObj[Object.keys(invalidObj)[0]];

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
