'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_SEND = 'https://js.dump.academy/kekstagram';
  var ERROR_CONNECT = '600';
  var ERROR_TIMEOUT = '601';

  var addEventListenersToRequest = function (request, callbackError) {
    request.addEventListener('error', function () {
      callbackError(ERROR_CONNECT);
    });
    request.addEventListener('timeout', function () {
      callbackError(ERROR_TIMEOUT);
    });
  };

  window.backend = {
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
      addEventListenersToRequest(xhr, onError);
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
      addEventListenersToRequest(xhr, onError);
      xhr.open('POST', URL_SEND);
      xhr.send(data);
    },
  };
})();
