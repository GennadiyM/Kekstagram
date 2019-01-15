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
  var reviewFilterButtons = reviewFilter.querySelectorAll(Selector.REVIEW_FILTER_BUTTON);
  var picturesListNode = document.querySelector(Selector.PICTURES_LIST);
  var templateUserPicture = document.querySelector(ID_TEMPLATE_PICTURE).content.querySelector(Selector.PICTURE);

  var deleteClassOnButtonActive = function () {
    reviewFilterButtons.forEach(function (button) {
      button.classList.toggle(Class.BUTTON_FILTER_ACTIVE, false);
    });
  };

  var getOnButtonFilterClick = function (index) {
    var indexButton = index;
    return function () {
      deleteClassOnButtonActive();
      reviewFilterButtons[indexButton].classList.add(Class.BUTTON_FILTER_ACTIVE);
      window.picture.delThumbnails();
      window.picture.renderThumbnails(thumbnailMap[reviewFilterButtons[indexButton].id]);
    };
  };

  var addEventListenerOnButtonFilter = function (element, buttonClickCallback) {
    element.addEventListener('click', window.debounce(buttonClickCallback));
  };

  var getRandomThumbnails = function (data, count) {
    var randomThumbnails = [];
    do {
      var randomElement = data[Math.floor(Math.random() * data.length)];
      if (!randomThumbnails.includes(randomElement)) {
        randomThumbnails.push(randomElement);
      }
    } while (randomThumbnails.length < count);

    return randomThumbnails;
  };

  var getLoadHandler = function (maxCountImg, showFilterCallback) {
    var counter = 0;
    var runShowBlockFilter = function () {
      counter++;
      if (counter === maxCountImg) {
        showFilterCallback();
      }
    };
    return runShowBlockFilter;
  };

  var showBlockFilter = function () {
    reviewFilter.classList.remove(Class.FILTER_WHEN_INACTIVE);
    reviewFilterButtons.forEach(function (element, index) {
      var OnButtonFilterClick = getOnButtonFilterClick(index);
      addEventListenerOnButtonFilter(element, OnButtonFilterClick);
    });
  };

  window.picture = {
    renderThumbnails: function (thumbnailList) {
      var onLoadHandler = getLoadHandler(thumbnailList.length, showBlockFilter);
      thumbnailList.forEach(function (item) {
        var cloneTemplateUserPicture = templateUserPicture.cloneNode(true);
        picturesListNode.appendChild(cloneTemplateUserPicture);
        var templatePicture = cloneTemplateUserPicture.querySelector(Selector.PICT_IMG);
        templatePicture.src = item.url;
        cloneTemplateUserPicture.querySelector(Selector.PICT_COMMENTS).textContent = item.comments.length;
        cloneTemplateUserPicture.querySelector(Selector.PICT_LIKES).textContent = item.likes;
        templatePicture.addEventListener('load', onLoadHandler);
        templatePicture.addEventListener('error', onLoadHandler);
        cloneTemplateUserPicture.addEventListener('click', function (evt) {
          evt.preventDefault();
          window.preview.getBigPicture(item);
        });
      });
    },
    delThumbnails: function () {
      picturesListNode.querySelectorAll(Selector.PICTURE).forEach(function (element) {
        element.remove();
      });
    },
    getThumbnailMap: function (data) {
      thumbnailMap['filter-popular'] = data;
      thumbnailMap['filter-new'] = getRandomThumbnails(data, MAX_COUNT_THUMBNAILS);
      thumbnailMap['filter-discussed'] = data.slice().sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
    },
  };
  window.backend.load(window.picture.getThumbnailMap, window.picture.renderThumbnails, window.message.onErrorLoadPreview);
})();
