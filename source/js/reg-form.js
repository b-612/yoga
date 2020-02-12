'use strict';

(function () {
  jQuery.validator.addMethod("checkMask", function(value, element) {
    return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(value);
  });

  $('.registration__form').validate({
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
})();
