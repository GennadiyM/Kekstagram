'use strict';

(function () {
  var CLASS_ERROR_BUTTON = 'error__button';
  var REPORT_UNKNOWN_ERROR = 'Статус ошибки: ';
  var TIMEOUT_REQUEST = 10000;

  var Identifier = {
    SUCCESS: '#success',
    ERROR: '#error',
  };

  var Selector = {
    SUCCESS: '.success',
    ERROR: '.error',
    ERROR_TITLE: '.error__title',
    ERROR_BUTTON: '.' + CLASS_ERROR_BUTTON,
    SUCCESS_TITLE: '.success__title',
    SUCCESS_BUTTON: '.success__button',
    MAIN: 'main',
  };

  var xhrStatusMap = {
    '600': 'Произошла ошибка соединения',
    '601': 'Запрос не успел выполниться за ' + TIMEOUT_REQUEST + 'мс',
    '301': 'Перемещено навсегда',
    '400': 'Неверный запрос',
    '401': 'Пользователь не авторизован',
    '404': 'Ничего не найдено',
    '500': 'Сервер пятисотит',
  };

  var messageSuccess = document.querySelector(Identifier.SUCCESS).content.querySelector(Selector.SUCCESS);
  var messageError = document.querySelector(Identifier.ERROR).content.querySelector(Selector.ERROR);
  var errorTitle = messageError.querySelector(Selector.ERROR_TITLE);
  var successTitle = messageSuccess.querySelector(Selector.SUCCESS_TITLE);
  var successButton = messageSuccess.querySelector(Selector.SUCCESS_BUTTON);
  var main = document.querySelector(Selector.MAIN);

  var renderMessageError = function (element, result) {
    if (typeof result === 'string') {
      element.textContent = xhrStatusMap[result];
      return;
    }
    element.textContent = xhrStatusMap[result.status] ? element.textContent = xhrStatusMap[result.status] : element.textContent = REPORT_UNKNOWN_ERROR + result.status + ' ' + result.statusText;
  };

  var onDeleteErrorLoadImg = function () {
    messageError.remove();
    document.removeEventListener('keydown', onDeleteErrorLoadImgPressEsc);
    document.removeEventListener('click', onDeleteErrorLoadImg);
  };

  var onMessageErrorClick = function (evt) {
    if (evt.target.className === CLASS_ERROR_BUTTON) {
      onDeleteErrorLoadImg();
    }
  };

  var onDeleteErrorLoadImgPressEsc = function (evt) {
    if (evt.keyCode === window.utils.Keydown.ESC) {
      onDeleteErrorLoadImg();
    }
  };

  var onDeleteMessageSuccess = function () {
    messageSuccess.remove();
  };

  var onSuccessButtonPressEnter = function (evt) {
    if (evt.keyCode === window.utils.Keydown.ENTER) {
      onDeleteMessageSuccess();
    }
  };

  var onDocumentPressEsc = function (evt) {
    if (evt.keyCode === window.utils.Keydown.ESC) {
      onDeleteMessageSuccess();
    }
  };

  window.message = {
    success: function () {
      main.insertAdjacentElement('afterbegin', messageSuccess);
      successButton.addEventListener('click', onDeleteMessageSuccess);
      successButton.addEventListener('keydown', onSuccessButtonPressEnter);
      document.addEventListener('click', onDeleteMessageSuccess);
      document.addEventListener('keydown', onDocumentPressEsc);
    },
    onErrorLoadPreview: function (result) {
      successButton.remove();
      renderMessageError(successTitle, result);
      main.insertAdjacentElement('afterbegin', messageSuccess);
    },
    onErrorLoadImg: function (result) {
      renderMessageError(errorTitle, result);
      main.insertAdjacentElement('afterbegin', messageError);
      document.addEventListener('click', onDeleteErrorLoadImg);
      messageError.addEventListener('click', onMessageErrorClick);
      document.addEventListener('keydown', onDeleteErrorLoadImgPressEsc);
    },
  };
})();
