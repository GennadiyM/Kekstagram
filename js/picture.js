'use strict';

(function () {
  window.picture = function (data) {
    var Identifiers = {
      TEMPLATE_PICTURE: '#picture',
    };

    var Selectors = {
      PICTURE: '.picture',
      PICT_IMG: '.picture__img',
      PICT_COMMENTS: '.picture__comments',
      PICT_LIKES: '.picture__likes',
      PICTURES_LIST: '.pictures',
    };

    var onOpenBigPhoto = function (i) {
      cloneTemplateUserPicture.addEventListener('click', function (evt) {
        evt.preventDefault();
        window.preview.getBigPicture(data[i]);
      });
    };

    var picturesList = document.querySelector(Selectors.PICTURES_LIST);
    var templateUserPicture = document.querySelector(Identifiers.TEMPLATE_PICTURE).content.querySelector(Selectors.PICTURE);

    for (var i = 0; i < data.length; i++) {
      var cloneTemplateUserPicture = templateUserPicture.cloneNode(true);
      picturesList.appendChild(cloneTemplateUserPicture);
      cloneTemplateUserPicture.querySelector(Selectors.PICT_IMG).src = data[i].url;
      cloneTemplateUserPicture.querySelector(Selectors.PICT_COMMENTS).textContent = data[i].comments.length;
      cloneTemplateUserPicture.querySelector(Selectors.PICT_LIKES).textContent = data[i].likes;
      onOpenBigPhoto(i);
    }
  };
  window.backend.load(window.picture, window.message.onErrorLoadPreview);
})();
