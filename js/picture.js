'use strict';

(function () {
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
      window.preview.getBigPicture(i);
    });
  };

  var picturesList = document.querySelector(Selectors.PICTURES_LIST);
  var templateUserPicture = document.querySelector(Identifiers.TEMPLATE_PICTURE).content.querySelector(Selectors.PICTURE);

  for (var i = 0; i < window.data.length; i++) {
    var cloneTemplateUserPicture = templateUserPicture.cloneNode(true);
    picturesList.appendChild(cloneTemplateUserPicture);
    cloneTemplateUserPicture.querySelector(Selectors.PICT_IMG).src = window.data[i].url;
    cloneTemplateUserPicture.querySelector(Selectors.PICT_COMMENTS).textContent = String(window.data[i].comments.length);
    cloneTemplateUserPicture.querySelector(Selectors.PICT_LIKES).textContent = window.data[i].likes;
    onOpenBigPhoto(i);
  }

})();
