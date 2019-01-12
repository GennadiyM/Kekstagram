'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_SEND = 'https://js.dump.academy/kekstagram';
  var TIMEOUT_REQUEST = 10000;
  var ERROR_CONNECT = 'Произошла ошибка соединения';
  var ERROR_TIMEOUT = 'Запрос не успел выполниться за ' + TIMEOUT_REQUEST + 'мс';

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError(xhr);
        }
      });

      xhr.addEventListener('error', function () {
        onError(ERROR_CONNECT);
      });

      xhr.addEventListener('timeout', function () {
        onError(ERROR_TIMEOUT);
      });
      xhr.open('GET', URL_LOAD);
      xhr.send();
    },
    save: function (onClose, onError, data) {
      onClose();
      var xhr = new XMLHttpRequest();
      if (xhr.status === 200) {
        window.message.success();
      } else {
        onError(xhr);
      }
      xhr.addEventListener('error', function () {
        onError(ERROR_CONNECT);
      });

      xhr.addEventListener('timeout', function () {
        onError(ERROR_TIMEOUT);
      });
      xhr.open('POST', URL_SEND);
      xhr.send(data);
    },
  };

})();
