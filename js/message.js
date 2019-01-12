'use strict';

(function () {

  var Identifiers = {
    SUCCESS: '#success',
    ERROR: '#error',
  };

  var CLASS_ERROR_BUTTON = 'error__button';
  var NEW_TEXT_BUTTON = 'ок';

  var Selectors = {
    SUCCESS: '.success',
    ERROR: '.error',
    ERROR_TITLE: '.error__title',
    ERROR_BUTTON: '.' + CLASS_ERROR_BUTTON,
    SUCCESS_TITLE: '.success__title',
    SUCCESS_BUTTON: '.success__button',
    MAIN: 'main',
  };

  var ErrorMessage = {
    STATUS_301: 'Перемещено навсегда',
    STATUS_400: 'Неверный запрос',
    STATUS_401: 'Пользователь не авторизован',
    STATUS_404: 'Ничего не найдено',
    STATUS_500: 'Сервер пятисотит',
    UNKNOWN_STATUS: 'Статус ответа: ',
  };

  var messageSuccess = document.querySelector(Identifiers.SUCCESS).content.querySelector(Selectors.SUCCESS);
  var messageError = document.querySelector(Identifiers.ERROR).content.querySelector(Selectors.ERROR);
  var errorTitle = messageError.querySelector(Selectors.ERROR_TITLE);
  var successTitle = messageSuccess.querySelector(Selectors.SUCCESS_TITLE);
  var successButton = messageSuccess.querySelector(Selectors.SUCCESS_BUTTON);
  var main = document.querySelector(Selectors.MAIN);

  var renderMessageError = function (element, result) {
    if (typeof result === 'object') {
      switch (result.status) {
        case 301:
          element.textContent = ErrorMessage.STATUS_301;
          break;
        case 400:
          element.textContent = ErrorMessage.STATUS_400;
          break;
        case 401:
          element.textContent = ErrorMessage.STATUS_401;
          break;
        case 404:
          element.textContent = ErrorMessage.STATUS_404;
          break;
        case 500:
          element.textContent = ErrorMessage.STATUS_500;
          break;
        default:
          element.textContent = ErrorMessage.UNKNOWN_STATUS + result.status + ' ' + result.statusText;
      }
    }
    if (typeof result === 'string') {
      element.textContent = result;
    }
  };

  var deleteErrorLoadImg = function () {
    messageError.remove();
    document.removeEventListener('keydown', deleteErrorLoadImgPressEsc);
    document.removeEventListener('click', deleteErrorLoadImg);
  };

  var onMessageErrorClick = function (evt) {
    if (evt.target.className === CLASS_ERROR_BUTTON) {
      deleteErrorLoadImg();
    }
  };
  var deleteErrorLoadImgPressEsc = function (evt) {
    if (evt.keyCode === window.utils.Keydown.ESC) {
      deleteErrorLoadImg();
    }
  };

  var deleteMessageSuccess = function () {
    messageSuccess.remove();
  };

  var onSuccessButtonPressEnter = function (evt) {
    if (evt.keyCode === window.utils.Keydown.ENTER) {
      deleteMessageSuccess();
    }
  };

  var onDocumentPressEsc = function (evt) {
    if (evt.keyCode === window.utils.Keydown.ESC) {
      deleteMessageSuccess();
    }
  };

  window.message = {
    success: function () {
      main.insertAdjacentElement('afterbegin', messageSuccess);
      successButton.addEventListener('click', deleteMessageSuccess);
      successButton.addEventListener('keydown', onSuccessButtonPressEnter);
      document.addEventListener('click', deleteMessageSuccess);
      document.addEventListener('keydown', onDocumentPressEsc);
    },
    onErrorLoadPreview: function (result) {
      successButton.remove();
      renderMessageError(successTitle, result);
      main.insertAdjacentElement('afterbegin', messageSuccess);
    },
    onErrorLoadImg: function (result) {
      renderMessageError(errorTitle, result);
      messageError.querySelector(Selectors.ERROR_BUTTON).remove();
      messageError.querySelector(Selectors.ERROR_BUTTON).textContent = NEW_TEXT_BUTTON;
      main.insertAdjacentElement('afterbegin', messageError);
      document.addEventListener('click', deleteErrorLoadImg);
      messageError.addEventListener('click', onMessageErrorClick);
      document.addEventListener('keydown', deleteErrorLoadImgPressEsc);
    },
  };
})();
