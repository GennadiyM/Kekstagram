'use strict';

(function () {
  var ID_TEMPLATE_PICTURE = '#picture';
  var MAX_COUNT_THUMBNAILS = 10;
  var DEBOUNCE_INTERVAL = 500;
  var thumbnailMap = {};

  var Class = {
    FILTER_WHEN_INACTIVE: 'img-filters--inactive',
    BUTTON_FILTER_ACTIVE: 'img-filters__button--active',
  };

  var Selector = {
    PICTURE: '.picture',
    PICT_IMG: '.picture__img',
    PICT_COMMENTS: '.picture__comments',
    PICT_LIKES: '.picture__likes',
    PICTURES_LIST: '.pictures',
    REVIEW_FILTER: '.img-filters',
    REVIEW_FILTER_BUTTON: '.img-filters__button',
  };

  var reviewFilter = document.querySelector(Selector.REVIEW_FILTER);
  var reviewFilterButtonList = reviewFilter.querySelectorAll(Selector.REVIEW_FILTER_BUTTON);
  var picturesList = document.querySelector(Selector.PICTURES_LIST);
  var templateUserPicture = document.querySelector(ID_TEMPLATE_PICTURE).content.querySelector(Selector.PICTURE);
  var lastTimeout = null;


  var addEvenetListenerOnButtonFilter = function (element, indexButton) {
    element.addEventListener('click', function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        deleteClassOnButtonActive();
        reviewFilterButtonList[indexButton].classList.add(Class.BUTTON_FILTER_ACTIVE);
        window.picture.delThumbnailList();
        window.picture.renderThumbnailList(thumbnailMap[indexButton]);
      }, DEBOUNCE_INTERVAL);
    });
  };

  var deleteClassOnButtonActive = function () {
    reviewFilterButtonList.forEach(function (button) {
      if (button.classList.contains(Class.BUTTON_FILTER_ACTIVE)) {
        button.classList.remove(Class.BUTTON_FILTER_ACTIVE);
      }
    });
  };

  var getRandomThumbnailList = function (data, count) {
    var randomThumbnailList = [];
    do {
      var randomElement = data[Math.floor(Math.random() * data.length)];
      if (!randomThumbnailList.includes(randomElement)) {
        randomThumbnailList.push(randomElement);
      }
    } while (randomThumbnailList.length < count);

    return randomThumbnailList;
  };

  var loadCheck = function (maxCountImg) {
    var counter = 0;
    var increaseCounter = function () {
      counter++;
      if (counter === maxCountImg) {
        showBlockFilter();
      }
    };
    return increaseCounter;
  };

  var showBlockFilter = function () {
    reviewFilter.classList.remove(Class.FILTER_WHEN_INACTIVE);
    reviewFilterButtonList.forEach(function (element, index) {
      addEvenetListenerOnButtonFilter(element, index);
    });
  };

  window.picture = {
    renderThumbnailList: function (data) {
      var onPictureload = loadCheck(data.length);
      var onOpenBigPhoto = function (i) {
        cloneTemplateUserPicture.addEventListener('click', function (evt) {
          evt.preventDefault();
          window.preview.getBigPicture(data[i]);
        });
      };
      for (var i = 0; i < data.length; i++) {
        var cloneTemplateUserPicture = templateUserPicture.cloneNode(true);
        picturesList.appendChild(cloneTemplateUserPicture);
        cloneTemplateUserPicture.querySelector(Selector.PICT_IMG).src = data[i].url;
        cloneTemplateUserPicture.querySelector(Selector.PICT_COMMENTS).textContent = data[i].comments.length;
        cloneTemplateUserPicture.querySelector(Selector.PICT_LIKES).textContent = data[i].likes;
        cloneTemplateUserPicture.querySelector(Selector.PICT_IMG).addEventListener('load', onPictureload);
        onOpenBigPhoto(i);
      }
    },
    delThumbnailList: function () {
      picturesList.querySelectorAll(Selector.PICTURE).forEach(function (element) {
        element.remove();
      });
    },
    getThumbnailMap: function (data) {
      thumbnailMap['0'] = data;
      thumbnailMap['1'] = getRandomThumbnailList(data, MAX_COUNT_THUMBNAILS);
      thumbnailMap['2'] = data.slice().sort(function (a, b) {
        if (a.comments < b.comments) {
          return 1;
        }
        if (a.comments > b.comments) {
          return -1;
        }
        return a.comments < b.comments;
      });
    },
  };
  window.backend.load(window.picture.getThumbnailMap, window.picture.renderThumbnailList, window.message.onErrorLoadPreview, window.picture.showBlockFilter);
})();
