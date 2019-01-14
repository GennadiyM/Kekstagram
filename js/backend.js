'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_SEND = 'https://js.dump.academy/kekstagram';
  var ERROR_CONNECT = '600';
  var ERROR_TIMEOUT = '601';

  window.backend = {
    countLoad: 0,
    load: function (getMap, showThumbnails, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          showThumbnails(xhr.response);
          getMap(xhr.response);
        } else {
          onError(xhr.status);
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
    save: function (onLoad, onError, data) {
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad();
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
      xhr.open('POST', URL_SEND);
      xhr.send(data);
    },
  };
})();
