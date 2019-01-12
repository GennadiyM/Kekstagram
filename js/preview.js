'use strict';

(function () {
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
    getBigPicture: function (data) {
      onCloneTemplateUserPictureClick();
      bigPicture.querySelector(Selectors.URL_BIG_PICTURE).src = data.url;
      bigPicture.querySelector(Selectors.LIKES_COUNT).textContent = data.likes;
      bigPicture.querySelector(Selectors.SOCIAL_CAPTION).textContent = data.description;
      bigPictureCommentList.innerHTML = '';
      var cloneTemplateComment = null;
      if (data.comments.length > MAX_COUNT_COMMENTS_IN_PAGE) {
        for (var i = 0; i < MAX_COUNT_COMMENTS_IN_PAGE; i++) {
          cloneTemplateComment = templateComment.cloneNode(true);
          bigPictureCommentList.appendChild(cloneTemplateComment);
          cloneTemplateComment.querySelector(Selectors.SOCIAL_PICTURE).src = data.comments[i].avatar;
          cloneTemplateComment.querySelector(Selectors.SOCIAL_TEXT).textContent = data.comments[i].message;
        }
      } else {
        for (i = 0; i < data.comments.length; i++) {
          cloneTemplateComment = templateComment.cloneNode(true);
          bigPictureCommentList.appendChild(cloneTemplateComment);
          cloneTemplateComment.querySelector(Selectors.SOCIAL_PICTURE).src = data.comments[i].avatar;
          cloneTemplateComment.querySelector(Selectors.SOCIAL_TEXT).textContent = data.comments[i].message;
        }
      }
    }
  };
})();
