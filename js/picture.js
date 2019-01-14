'use strict';

(function () {
  var ID_TEMPLATE_PICTURE = '#picture';
  var MAX_COUNT_THUMBNAILS = 10;
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

  var deleteClassOnButtonActive = function () {
    reviewFilterButtonList.forEach(function (button) {
      button.classList.toggle(Class.BUTTON_FILTER_ACTIVE, false);
    });
  };

  var getOnButtonFilterClick = function (index) {
    var indexButton = index;
    return function () {
      deleteClassOnButtonActive();
      reviewFilterButtonList[indexButton].classList.add(Class.BUTTON_FILTER_ACTIVE);
      window.picture.delThumbnails();
      window.picture.renderThumbnails(thumbnailMap[reviewFilterButtonList[indexButton].id]);
    };
  };

  var addEventListenerOnButtonFilter = function (element, buttonClickCallback) {
    element.addEventListener('click', window.debounce(buttonClickCallback));
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

  var getLoadHandler = function (maxCountImg, showFilterCallback) {
    var counter = 0;
    var runShowBlockFilter = function () {
      counter++;
      if (counter >= maxCountImg) {
        showFilterCallback();
      }
    };
    return runShowBlockFilter;
  };

  var showBlockFilter = function () {
    reviewFilter.classList.remove(Class.FILTER_WHEN_INACTIVE);
    reviewFilterButtonList.forEach(function (element, index) {
      var OnButtonFilterClick = getOnButtonFilterClick(index);
      addEventListenerOnButtonFilter(element, OnButtonFilterClick);
    });
  };

  window.picture = {
    renderThumbnails: function (thumbnailList) {
      var onLoadHandler = getLoadHandler(thumbnailList.length, showBlockFilter);
      var onOpenBigPhoto = function (numberIteration) {
        cloneTemplateUserPicture.addEventListener('click', function (evt) {
          evt.preventDefault();
          window.preview.getBigPicture(thumbnailList[numberIteration]);
        });
      };
      for (var i = 0; i < thumbnailList.length; i++) {
        var cloneTemplateUserPicture = templateUserPicture.cloneNode(true);
        picturesList.appendChild(cloneTemplateUserPicture);
        cloneTemplateUserPicture.querySelector(Selector.PICT_IMG).src = thumbnailList[i].url;
        cloneTemplateUserPicture.querySelector(Selector.PICT_COMMENTS).textContent = thumbnailList[i].comments.length;
        cloneTemplateUserPicture.querySelector(Selector.PICT_LIKES).textContent = thumbnailList[i].likes;
        cloneTemplateUserPicture.querySelector(Selector.PICT_IMG).addEventListener('load', onLoadHandler);
        cloneTemplateUserPicture.querySelector(Selector.PICT_IMG).addEventListener('error', onLoadHandler);
        onOpenBigPhoto(i);
      }
    },
    delThumbnails: function () {
      picturesList.querySelectorAll(Selector.PICTURE).forEach(function (element) {
        element.remove();
      });
    },
    getThumbnailMap: function (data) {
      thumbnailMap['filter-popular'] = data;
      thumbnailMap['filter-new'] = getRandomThumbnailList(data, MAX_COUNT_THUMBNAILS);
      thumbnailMap['filter-discussed'] = data.slice().sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
    },
  };
  window.backend.load(window.picture.getThumbnailMap, window.picture.renderThumbnails, window.message.onErrorLoadPreview);
})();
