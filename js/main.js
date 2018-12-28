'use strict';

var MIN_LIKES = 15;
var MAX_LIKES = 200;
var COUNT_PICTURES = 25;
var MAX_COUNT_RENDER_COMMENTS = 2;
var MIN_COUNT_RENDER_COMMENTS = 1;
var MAX_COUNT_COMMENTS = 5;
var MIN_COUNT_COMMENTS = 1;
var MAX_COUNT_COMMENTS_IN_PAGE = 5;
var TERM_FOR_MAX_VALUE = 1;
var DESCRIPTION = 'Описание фотографии';

var Identifiers = {
  TEMPLATE_PICTURE: '#picture',
  FORM_UPLOAD_FILE: '#upload-file',
};

var ClassNames = {
  HIDDEN: 'hidden',
  BODY_WHEN_BIG_PICTURE_OPEN: 'modal-open',
};

var Keydown = {
  ENTER: 13,
  ESC: 27
};

var Selectors = {
  PAGE_BODY: 'body',
  PICT_IMG: '.picture__img',
  PICT_COMMENTS: '.picture__comments',
  PICT_LIKES: '.picture__likes',
  PICTURES_LIST: '.pictures',
  PICTURE: '.picture',
  SOCIAL_CAPTION: '.social__caption',
  SOCIAL_PICTURE: '.social__picture',
  SOCIAL_TEXT: '.social__text',
  TEMPLATE_SOCIAL_COMMENT: '.social__comment',
  COMMENTS_LIST: '.social__comments',
  LIKES_COUNT: '.likes-count',
  URL_BIG_PICTURE: '.big-picture__img img',
  BIG_PICTURE: '.big-picture',
  BIG_PICTURE_EXIT: '.big-picture__cancel',
  IMG_UPLOAD_OVERLAY: '.img-upload__overlay',
  IMG_UPLOAD_EXIT: '.img-upload__cancel',
  EFFECT_LIST: '.effects__list',
  EFFECT_ITEM: '.effects__item',
  SLIDER_PIN: '.effect-level__pin',
};

var commentsMocks = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var getRandomElement = function (list) {
  return list[Math.floor(Math.random() * list.length)];
};

var getRandomLikes = function () {
  return Math.floor(Math.random() * MAX_LIKES) + MIN_LIKES;
};

var generateMockingObject = function () {
  return {
    url: '',
    comments: [],
    likes: getRandomLikes()
  };
};

var generateMocks = function () {
  var mocks = [];
  for (var i = 0; i < COUNT_PICTURES; i++) {
    mocks.push(generateMockingObject());
    mocks[i].url = 'photos/' + (i + 1) + '.jpg';
    var randomFlag = Math.floor(Math.random() * (MAX_COUNT_RENDER_COMMENTS + TERM_FOR_MAX_VALUE - MIN_COUNT_RENDER_COMMENTS) + MIN_COUNT_RENDER_COMMENTS);
    for (var j = 1; j <= randomFlag; j++) {
      mocks[i].comments.push(getRandomElement(commentsMocks));
    }
  }
  return mocks;
};

var mockingData = generateMocks();

var templateUserPicture = document.querySelector(Identifiers.TEMPLATE_PICTURE).content.querySelector(Selectors.PICTURE);
var picturesList = document.querySelector(Selectors.PICTURES_LIST);
var bigPicture = document.querySelector(Selectors.BIG_PICTURE);
var templateComment = bigPicture.querySelector(Selectors.TEMPLATE_SOCIAL_COMMENT);
var bigPictureCommentList = bigPicture.querySelector(Selectors.COMMENTS_LIST);
var pageBody = document.querySelector(Selectors.PAGE_BODY);
var buttonExitBigPhoto = bigPicture.querySelector(Selectors.BIG_PICTURE_EXIT);
var formUploadFile = document.querySelector(Identifiers.FORM_UPLOAD_FILE);
var formChangeUploadFile = document.querySelector(Selectors.IMG_UPLOAD_OVERLAY);
var formChangeUploadFileExit = document.querySelector(Selectors.IMG_UPLOAD_EXIT);
var pinSlider = formChangeUploadFile.querySelector(Selectors.SLIDER_PIN);

var getBigPicture = function (numberPicture) {
  onCloneTemplateUserPictureClick();
  bigPicture.querySelector(Selectors.URL_BIG_PICTURE).src = mockingData[numberPicture].url;
  bigPicture.querySelector(Selectors.LIKES_COUNT).textContent = mockingData[numberPicture].likes;
  bigPicture.querySelector(Selectors.SOCIAL_CAPTION).textContent = DESCRIPTION;
  bigPictureCommentList.innerHTML = '';
  var cloneTemplateComment = null;
  if (mockingData[numberPicture].comments.length > MAX_COUNT_COMMENTS_IN_PAGE) {
    for (i = 0; i < MAX_COUNT_COMMENTS_IN_PAGE; i++) {
      cloneTemplateComment = templateComment.cloneNode(true);
      bigPictureCommentList.appendChild(cloneTemplateComment);
      cloneTemplateComment.querySelector(Selectors.SOCIAL_PICTURE).src = 'img/avatar-' + (Math.floor(Math.random() * (MAX_COUNT_COMMENTS + TERM_FOR_MAX_VALUE)) + MIN_COUNT_COMMENTS) + '.svg';
      cloneTemplateComment.querySelector(Selectors.SOCIAL_TEXT).textContent = mockingData[numberPicture].comments[i];
    }
  } else {
    for (i = 0; i < mockingData[numberPicture].comments.length; i++) {
      cloneTemplateComment = templateComment.cloneNode(true);
      bigPictureCommentList.appendChild(cloneTemplateComment);
      cloneTemplateComment.querySelector(Selectors.SOCIAL_PICTURE).src = 'img/avatar-' + (Math.floor(Math.random() * (MAX_COUNT_COMMENTS + TERM_FOR_MAX_VALUE)) + MIN_COUNT_COMMENTS) + '.svg';
      cloneTemplateComment.querySelector(Selectors.SOCIAL_TEXT).textContent = mockingData[numberPicture].comments[i];
    }
  }
};

var onOpenBigPhoto = function (i) {
  cloneTemplateUserPicture.addEventListener('click', function (evt){
    evt.preventDefault();
    getBigPicture(i);
  });
};

var onCloneTemplateUserPictureClick = function() {
  bigPicture.classList.remove(ClassNames.HIDDEN);
  pageBody.classList.add(ClassNames.BODY_WHEN_BIG_PICTURE_OPEN);
  buttonExitBigPhoto.addEventListener('click', onCloseBigPhoto);
  document.addEventListener('keydown', onCloseBigPhotoPressEsc);
  buttonExitBigPhoto.addEventListener('keydown', onCloseBigPhotoPressEnter);
};

var onCloseBigPhoto = function () {
  bigPicture.classList.add(ClassNames.HIDDEN);
  pageBody.classList.remove(ClassNames.BODY_WHEN_BIG_PICTURE_OPEN);
  buttonExitBigPhoto.removeEventListener('click', onCloseBigPhoto);
  document.removeEventListener('keydown', onCloseBigPhotoPressEsc);
  buttonExitBigPhoto.removeEventListener('keydown', onCloseBigPhotoPressEnter);
};

var onCloseBigPhotoPressEsc = function (evt) {
  if (evt.keyCode === Keydown.ESC) {
    onCloseBigPhoto();
  }
};

var onCloseBigPhotoPressEnter = function (evt) {
  if (evt.keyCode === Keydown.ENTER) {
    onCloseBigPhoto();
  }
};

for (var i = 0; i < mockingData.length; i++) {
  var cloneTemplateUserPicture = templateUserPicture.cloneNode(true);
  picturesList.appendChild(cloneTemplateUserPicture);
  cloneTemplateUserPicture.querySelector(Selectors.PICT_IMG).src = mockingData[i].url;
  cloneTemplateUserPicture.querySelector(Selectors.PICT_COMMENTS).textContent = String(mockingData[i].comments.length);
  cloneTemplateUserPicture.querySelector(Selectors.PICT_LIKES).textContent = mockingData[i].likes;
  onOpenBigPhoto(i);
}

var onOpenFormUploadFile = function () {
  formChangeUploadFile.classList.remove(ClassNames.HIDDEN);
  formChangeUploadFileExit.addEventListener('click', onCloseFormUploadFile);
  formChangeUploadFileExit.addEventListener('keydown', onCloseFormUploadFilePressEnter);
  document.addEventListener('keydown', onCloseFormUploadFilePressEsc);
  pinSlider.addEventListener('mouseup', )
};

var onCloseFormUploadFile = function () {
  formChangeUploadFile.classList.add(ClassNames.HIDDEN);
  formChangeUploadFileExit.removeEventListener('click', onCloseFormUploadFile);
  formChangeUploadFileExit.removeEventListener('keydown', onCloseFormUploadFilePressEnter);
  document.removeEventListener('keydown', onCloseFormUploadFilePressEsc);
  formUploadFile.value = null;
};

var onCloseFormUploadFilePressEsc = function (evt) {
  if (evt.keyCode === Keydown.ESC) {
    onCloseFormUploadFile();
  }
};

var onCloseFormUploadFilePressEnter = function (evt) {
  if (evt.keyCode === Keydown.ENTER) {
    onCloseFormUploadFile();
  }
};

formUploadFile.addEventListener('change', onOpenFormUploadFile);


// document.querySelector('.social__comment-count').classList.add('visually-hidden');
// document.querySelector('.comments-loader').classList.add('visually-hidden');

