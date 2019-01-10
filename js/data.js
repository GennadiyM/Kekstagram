'use strict';
(function () {

  var MAX_LIKES = 200;
  var MIN_LIKES = 15;
  var COUNT_PICTURES = 25;
  var MAX_COUNT_RENDER_COMMENTS = 2;
  var MIN_COUNT_RENDER_COMMENTS = 1;

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
      var randomFlag = Math.floor(Math.random() * (MAX_COUNT_RENDER_COMMENTS + window.utils.TERM_FOR_MAX_VALUE - MIN_COUNT_RENDER_COMMENTS) + MIN_COUNT_RENDER_COMMENTS);
      for (var j = 1; j <= randomFlag; j++) {
        mocks[i].comments.push(getRandomElement(commentsMocks));
      }
    }
    return mocks;
  };

  window.data = generateMocks();

})();
