'use strict';

(function () {
  var DESCRIPTION = 'Описание фотографии';
  var MAX_COUNT_COMMENTS = 5;
  var MIN_COUNT_COMMENTS = 1;
  var MAX_COUNT_COMMENTS_IN_PAGE = 5;
  var CLASS_BODY_WHEN_BIG_PICTURE_OPEN = 'modal-open';


  var Selectors = {
    PAGE_BODY: 'body',
    SOCIAL_CAPTION: '.social__caption',
    SOCIAL_PICTURE: '.social__picture',
    SOCIAL_TEXT: '.social__text',
    COMMENTS_LIST: '.social__comments',
    LIKES_COUNT: '.likes-count',
    URL_BIG_PICTURE: '.big-picture__img img',
    BIG_PICTURE: '.big-picture',
    BIG_PICTURE_EXIT: '.big-picture__cancel',
    TEMPLATE_SOCIAL_COMMENT: '.social__comment',
  };

  var bigPicture = document.querySelector(Selectors.BIG_PICTURE);
  var bigPictureCommentList = bigPicture.querySelector(Selectors.COMMENTS_LIST);
  var pageBody = document.querySelector(Selectors.PAGE_BODY);
  var buttonExitBigPhoto = bigPicture.querySelector(Selectors.BIG_PICTURE_EXIT);
  var templateComment = document.querySelector(Selectors.TEMPLATE_SOCIAL_COMMENT);

  var onCloseBigPhoto = function () {
    bigPicture.classList.add(window.utils.CLASS_HIDDEN);
    pageBody.classList.remove(CLASS_BODY_WHEN_BIG_PICTURE_OPEN);
    buttonExitBigPhoto.removeEventListener('click', onCloseBigPhoto);
    document.removeEventListener('keydown', onCloseBigPhotoPressEsc);
    buttonExitBigPhoto.removeEventListener('keydown', onCloseBigPhotoPressEnter);
  };

  var onCloseBigPhotoPressEsc = function (evt) {
    if (evt.keyCode === window.utils.Keydown.ESC) {
      onCloseBigPhoto();
    }
  };

  var onCloseBigPhotoPressEnter = function (evt) {
    if (evt.keyCode === window.utils.Keydown.ENTER) {
      onCloseBigPhoto();
    }
  };

  var onCloneTemplateUserPictureClick = function () {
    bigPicture.classList.remove(window.utils.CLASS_HIDDEN);
    pageBody.classList.add(CLASS_BODY_WHEN_BIG_PICTURE_OPEN);
    buttonExitBigPhoto.addEventListener('click', onCloseBigPhoto);
    document.addEventListener('keydown', onCloseBigPhotoPressEsc);
    buttonExitBigPhoto.addEventListener('keydown', onCloseBigPhotoPressEnter);
  };

  window.preview = {
    getBigPicture: function (numberPicture) {
      onCloneTemplateUserPictureClick();
      bigPicture.querySelector(Selectors.URL_BIG_PICTURE).src = window.data[numberPicture].url;
      bigPicture.querySelector(Selectors.LIKES_COUNT).textContent = window.data[numberPicture].likes;
      bigPicture.querySelector(Selectors.SOCIAL_CAPTION).textContent = DESCRIPTION;
      bigPictureCommentList.innerHTML = '';
      var cloneTemplateComment = null;
      if (window.data[numberPicture].comments.length > MAX_COUNT_COMMENTS_IN_PAGE) {
        for (var i = 0; i < MAX_COUNT_COMMENTS_IN_PAGE; i++) {
          cloneTemplateComment = templateComment.cloneNode(true);
          bigPictureCommentList.appendChild(cloneTemplateComment);
          cloneTemplateComment.querySelector(Selectors.SOCIAL_PICTURE).src = 'img/avatar-' + (Math.floor(Math.random() * (MAX_COUNT_COMMENTS + window.utils.TERM_FOR_MAX_VALUE)) + MIN_COUNT_COMMENTS) + '.svg';
          cloneTemplateComment.querySelector(Selectors.SOCIAL_TEXT).textContent = window.data[numberPicture].comments[i];
        }
      } else {
        for (i = 0; i < window.data[numberPicture].comments.length; i++) {
          cloneTemplateComment = templateComment.cloneNode(true);
          bigPictureCommentList.appendChild(cloneTemplateComment);
          cloneTemplateComment.querySelector(Selectors.SOCIAL_PICTURE).src = 'img/avatar-' + (Math.floor(Math.random() * (MAX_COUNT_COMMENTS + window.utils.TERM_FOR_MAX_VALUE)) + MIN_COUNT_COMMENTS) + '.svg';
          cloneTemplateComment.querySelector(Selectors.SOCIAL_TEXT).textContent = window.data[numberPicture].comments[i];
        }
      }
    }
  };
})();
