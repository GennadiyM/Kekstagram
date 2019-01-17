'use strict';
(function () {

  var MAX_HASHTAGS_COUNT = 5;
  var COMMENT_MAX_LENGTH = 120;
  var HASHTAG_MAX_LENGTH = 21;
  var HASHTAG_MIN_LENGTH = 1;
  var HASHTAG_FIRST_SYMBOL = '#';
  var ERROR_OUTLINE = '2px solid red';

  var ErrorMessageList = {
    START_ERROR: 'Хэш-тег должен начинаться с символа # (решётка)!',
    CONTENT_ERROR: 'Хеш-тег не может состоять только из одной решётки!',
    QUANTITY_ERROR: 'Количество хэш-тегов не может превышать ' + MAX_HASHTAGS_COUNT + '!',
    REPETITION_ERROR: 'Хеш-теги не могут быть одинаковым!',
    LENGTH_ERROR: 'Длин хэш-тега не может превышать ' + HASHTAG_MAX_LENGTH + ' символов!',
    COMMENT_ERROR: 'Длина комментария не может превышать ' + COMMENT_MAX_LENGTH + ' символов!',
    SPLIT_ERROR: 'Хэш-теги должны разделяться пробелами',
    NO_ERROR: ''
  };

  var checkHashtags = function (hashtagsToArray) {
    if (hashtagsToArray.length > 0) {
      if (!hashtagsToArray[hashtagsToArray.length - 1]) {
        window.uploadImg.inputHashtags.style.outline = ERROR_OUTLINE;
        hashtagsToArray.pop();
      }
      if (hashtagsToArray.length > MAX_HASHTAGS_COUNT) {
        window.uploadImg.inputHashtags.style.outline = ERROR_OUTLINE;
        return ErrorMessageList.QUANTITY_ERROR;
      }
      for (var i = 0; i < hashtagsToArray.length; i++) {
        var hashtag = hashtagsToArray[i];
        for (var j = i + 1; j < hashtagsToArray.length; j++) {
          if (!hashtag.startsWith(HASHTAG_FIRST_SYMBOL)) {
            window.uploadImg.inputHashtags.style.outline = ERROR_OUTLINE;
            return ErrorMessageList.START_ERROR;
          }
          if (hashtag.lastIndexOf(HASHTAG_FIRST_SYMBOL) > 0) {
            window.uploadImg.inputHashtags.style.outline = ERROR_OUTLINE;
            return ErrorMessageList.SPLIT_ERROR;
          }
          if (hashtag === hashtagsToArray[j]) {
            window.uploadImg.inputHashtags.style.outline = ERROR_OUTLINE;
            return ErrorMessageList.REPETITION_ERROR;
          }
        }
        if (!hashtag.startsWith(HASHTAG_FIRST_SYMBOL)) {
          window.uploadImg.inputHashtags.style.outline = ERROR_OUTLINE;
          return ErrorMessageList.START_ERROR;
        }
        if (hashtag.length === HASHTAG_MIN_LENGTH && hashtag === HASHTAG_FIRST_SYMBOL) {
          window.uploadImg.inputHashtags.style.outline = ERROR_OUTLINE;
          return ErrorMessageList.CONTENT_ERROR;
        }
        if (hashtag.lastIndexOf(HASHTAG_FIRST_SYMBOL) > 0) {
          window.uploadImg.inputHashtags.style.outline = ERROR_OUTLINE;
          return ErrorMessageList.SPLIT_ERROR;
        }
        if (hashtag.length > HASHTAG_MAX_LENGTH) {
          window.uploadImg.inputHashtags.style.outline = ERROR_OUTLINE;
          return ErrorMessageList.LENGTH_ERROR;
        }
      }
      window.uploadImg.inputHashtags.style.outline = '';
      return ErrorMessageList.NO_ERROR;
    }

    window.uploadImg.inputComments.style.outline = '';
    return ErrorMessageList.NO_ERROR;
  };

  window.validation = {
    onHashtagsInput: function (evt) {
      evt.preventDefault();
      window.uploadImg.inputHashtags.setCustomValidity(ErrorMessageList.NO_ERROR);
      var hashtagsToArray = evt.target.value.toLowerCase().split(/\s+/);
      window.uploadImg.inputHashtags.setCustomValidity(checkHashtags(hashtagsToArray));
    },
    onCommentsInput: function (evt) {
      evt.preventDefault();
      if (window.uploadImg.inputComments.value.length > COMMENT_MAX_LENGTH) {
        window.uploadImg.inputComments.setCustomValidity(ErrorMessageList.COMMENT_ERROR);
        window.uploadImg.inputComments.style.outline = ERROR_OUTLINE;
      } else {
        window.uploadImg.inputComments.style.outline = '';
        window.uploadImg.inputComments.setCustomValidity('');
      }
    },
  };
})();
