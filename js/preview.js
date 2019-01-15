'use strict';

(function () {
  var MAX_COUNT_COMMENTS_IN_PAGE = 5;
  var CLASS_BODY_WHEN_BIG_PICTURE_OPEN = 'modal-open';
  var INCREMENT_STEP = 5;

  var Selector = {
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
    INPUT_FOR_COMMENTS: '.social__footer-text',
    COUNT_RENDER_COMMENTS: '.social__comment-count',
    COUNT_COMMENTS: '.comments-count',
    COMMENTS_LOADER: '.comments-loader',
  };

  var CommentDescriptionText = {
    DESCRIPTION_BEGIN: ' из ',
    DESCRIPTION_END: ' комментариев',
  };

  var counterOfDisplayedComments = MAX_COUNT_COMMENTS_IN_PAGE;

  var bigPicture = document.querySelector(Selector.BIG_PICTURE);
  var bigPictureCommentListNode = bigPicture.querySelector(Selector.COMMENTS_LIST);
  var bigPictureCountRenderComments = bigPicture.querySelector(Selector.COUNT_RENDER_COMMENTS);
  var pageBody = document.querySelector(Selector.PAGE_BODY);
  var buttonExitBigPhoto = bigPicture.querySelector(Selector.BIG_PICTURE_EXIT);
  var templateComment = document.querySelector(Selector.TEMPLATE_SOCIAL_COMMENT);
  var buttonCommentsLoader = bigPicture.querySelector(Selector.COMMENTS_LOADER);

  var onCloseBigPhoto = function () {
    bigPicture.classList.add(window.utils.CLASS_HIDDEN);
    pageBody.classList.remove(CLASS_BODY_WHEN_BIG_PICTURE_OPEN);
    buttonExitBigPhoto.removeEventListener('click', onCloseBigPhoto);
    document.removeEventListener('keydown', onCloseBigPhotoPressEsc);
    buttonExitBigPhoto.removeEventListener('keydown', onCloseBigPhotoPressEnter);
    counterOfDisplayedComments = MAX_COUNT_COMMENTS_IN_PAGE;
    buttonCommentsLoader.classList.toggle(window.utils.CLASS_HIDDEN, false);
  };

  var onCloseBigPhotoPressEsc = function (evt) {
    if (evt.keyCode === window.utils.Keydown.ESC && document.activeElement !== document.querySelector(Selector.INPUT_FOR_COMMENTS)) {
      onCloseBigPhoto();
    }
  };

  var onCloseBigPhotoPressEnter = function (evt) {
    if (evt.keyCode === window.utils.Keydown.ENTER) {
      onCloseBigPhoto();
    }
  };

  window.preview = {
    getBigPicture: function (data) {
      var onButtonCommentsLoader = function (evt) {
        evt.preventDefault();
        counterOfDisplayedComments += INCREMENT_STEP;
        bigPictureCommentListNode.innerHTML = '';
        renderCommentsList(comments);
      };

      var renderCommentsList = function (commentList) {
        if (commentList.length <= counterOfDisplayedComments) {
          buttonCommentsLoader.classList.add(window.utils.CLASS_HIDDEN);
          buttonCommentsLoader.removeEventListener('click', onButtonCommentsLoader);
        }
        var cloneTemplateComment = null;
        for (var i = 0; i < counterOfDisplayedComments && i < commentList.length; i++) {
          bigPictureCountRenderComments.textContent = i + 1 + CommentDescriptionText.DESCRIPTION_BEGIN + commentList.length + CommentDescriptionText.DESCRIPTION_END;
          cloneTemplateComment = templateComment.cloneNode(true);
          bigPictureCommentListNode.appendChild(cloneTemplateComment);
          cloneTemplateComment.querySelector(Selector.SOCIAL_PICTURE).src = commentList[i].avatar;
          cloneTemplateComment.querySelector(Selector.SOCIAL_TEXT).textContent = commentList[i].message;
        }
      };
      bigPicture.classList.remove(window.utils.CLASS_HIDDEN);
      buttonCommentsLoader.addEventListener('click', onButtonCommentsLoader);
      pageBody.classList.add(CLASS_BODY_WHEN_BIG_PICTURE_OPEN);
      buttonExitBigPhoto.addEventListener('click', onCloseBigPhoto);
      document.addEventListener('keydown', onCloseBigPhotoPressEsc);
      buttonExitBigPhoto.addEventListener('keydown', onCloseBigPhotoPressEnter);
      bigPicture.querySelector(Selector.URL_BIG_PICTURE).src = data.url;
      bigPicture.querySelector(Selector.LIKES_COUNT).textContent = data.likes;
      bigPicture.querySelector(Selector.SOCIAL_CAPTION).textContent = data.description;
      bigPictureCommentListNode.innerHTML = '';
      var comments = data.comments.slice();
      renderCommentsList(comments);
    },
  };
})();

