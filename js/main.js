'use strict';

var minLikes = 15;
var maxLikes = 200;
var countPictures = 25;
var maxCountComments = 2;
var minCountComments = 1;
var maxCountCommentsInPage = 5;

var CLASS_HIDDEN = 'hidden';
var CLASS_PICT_IMG = '.picture__img';
var CLASS_PICT_COMMENTS = '.picture__comments';
var CLASS_PICT_LIKES = '.picture__likes';
var CLASS_TEMPLATE_PICTURE = '#picture';
var CLASS_PICTURES_LIST = '.pictures';
var CLASS_PICTURE = '.picture';
var CLASS_SOCIAL_CAPTION = '.social__caption';
var CLASS_SOCIAL_PICTURE = '.social__picture';
var CLASS_SOCIAL_TEXT = '.social__text';
var CLASS_TEMPLATE_SOCIAL_COMMENT = '.social__comment';
var CLASS_COMMENTS_LIST = '.social__comments';
var CLASS_LIKES_COUNT = '.likes-count';
var CLASS_URL_BIG_PICTURE = '.big-picture__img img';
var CLASS_BIG_PICTURE = '.big-picture';


var commentsMocks = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var getRandomElement = function (list) {
  return list[Math.floor(Math.random() * list.length)];
};

var DESCRIPTION = 'Описание фотографии';

var getRandomLikes = function () {
  return Math.floor(Math.random() * maxLikes) + minLikes;
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
  for (var i = 0; i < countPictures; i++) {
    mocks.push(generateMockingObject());
    mocks[i].url = 'photos/' + (i + 1) + '.jpg';
    var randomFlag = Math.floor(Math.random() * (maxCountComments + 1 - minCountComments) + minCountComments);
    for (var j = 1; j <= randomFlag; j++) {
      mocks[i].comments.push(getRandomElement(commentsMocks));
    }
  }
  return mocks;
};

var mockingData = generateMocks();

var templateUserPicture = document.querySelector(CLASS_TEMPLATE_PICTURE).content.querySelector(CLASS_PICTURE);

var picturesList = document.querySelector(CLASS_PICTURES_LIST);

for (var i = 0; i < mockingData.length; i++) {
  var cloneTemplateUserPicture = templateUserPicture.cloneNode(true);
  picturesList.appendChild(cloneTemplateUserPicture);
  cloneTemplateUserPicture.querySelector(CLASS_PICT_IMG).src = mockingData[i].url;
  cloneTemplateUserPicture.querySelector(CLASS_PICT_COMMENTS).textContent = String(mockingData[i].comments.length);
  cloneTemplateUserPicture.querySelector(CLASS_PICT_LIKES).textContent = mockingData[i].likes;
}

var getBigPicture = function (numberPicture) {
  var bigPicture = document.querySelector(CLASS_BIG_PICTURE);
  bigPicture.classList.remove(CLASS_HIDDEN);
  bigPicture.querySelector(CLASS_URL_BIG_PICTURE).src = mockingData[numberPicture].url;
  bigPicture.querySelector(CLASS_LIKES_COUNT).textContent = mockingData[numberPicture].likes;
  bigPicture.querySelector(CLASS_SOCIAL_CAPTION).textContent = DESCRIPTION;
  var templateComment = bigPicture.querySelector(CLASS_TEMPLATE_SOCIAL_COMMENT);
  var bigPictureCommentList = bigPicture.querySelector(CLASS_COMMENTS_LIST);
  bigPictureCommentList.innerHTML = '';
  var cloneTemplateComment = null;
  if (mockingData[numberPicture].comments.length > maxCountCommentsInPage) {
    for (i = 0; i < maxCountCommentsInPage; i++) {
      cloneTemplateComment = templateComment.cloneNode(true);
      bigPictureCommentList.appendChild(cloneTemplateComment);
      cloneTemplateComment.querySelector(CLASS_SOCIAL_PICTURE).src = 'img/avatar-' + (Math.floor(Math.random() * 6) + 1) + '.svg';
      cloneTemplateComment.querySelector(CLASS_SOCIAL_TEXT).textContent = mockingData[numberPicture].comments[i];
    }
  } else {
    for (i = 0; i < mockingData[numberPicture].comments.length; i++) {
      cloneTemplateComment = templateComment.cloneNode(true);
      bigPictureCommentList.appendChild(cloneTemplateComment);
      cloneTemplateComment.querySelector(CLASS_SOCIAL_PICTURE).src = 'img/avatar-' + (Math.floor(Math.random() * 6) + 1) + '.svg';
      cloneTemplateComment.querySelector(CLASS_SOCIAL_TEXT).textContent = mockingData[numberPicture].comments[i];
    }
  }
};

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');

getBigPicture(Math.floor(Math.random() * countPictures));
