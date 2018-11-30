var mockingComments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var getRandomComments = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var description = 'Описание фотографии';

var getRandomLikes = function(){
  return Math.floor(Math.random() * 200) + 15;
};

var getMockingObject = function () {
  return {
    url: "",
    comments: [],
    likes: getRandomLikes()
  }
};

var getMockingArray = function() {
  var mockArr = []
  for(var i = 0; i < 25; i++) {
    mockArr.push(getMockingObject());
    mockArr[i].url = 'photos/' + (i+1) + '.jpg';
    var randomFlag = Math.floor(Math.random() * 2);
    if (randomFlag === 0) {
      mockArr[i].comments.push(getRandomComments(mockingComments));
    }
    if (randomFlag === 1) {
      mockArr[i].comments.push(getRandomComments(mockingComments));
      mockArr[i].comments.push(getRandomComments(mockingComments));
    }
  }
  return mockArr;
}

var mockingData = getMockingArray();

var templateUserPicture = document.querySelector('#picture').content.querySelector('.picture');

var picturesList = document.querySelector('.pictures');

for (var i = 0; i < mockingData.length; i++) {
  var cloneTemplateUserPicture = templateUserPicture.cloneNode(true);
  picturesList.appendChild(cloneTemplateUserPicture);
  cloneTemplateUserPicture.querySelector('.picture__img').src = mockingData[i].url;
  cloneTemplateUserPicture.querySelector('.picture__comments').textContent = mockingData[i].comments.length;
  cloneTemplateUserPicture.querySelector('.picture__likes').textContent = mockingData[i].likes;
}

var getBigPicture = function(numberPicture) {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = mockingData[numberPicture].url;
  bigPicture.querySelector('.likes-count').textContent = mockingData[numberPicture].likes;
  bigPicture.querySelector('.social__caption').textContent = description;
  var templateComment = bigPicture.querySelector('.social__comment');
  var bigPictureCommentList = bigPicture.querySelector('.social__comments');
  bigPictureCommentList.innerHTML = "";
  if (mockingData[numberPicture].comments.length > 5) {
    for (var i = 0; i < 5; i++){
      var cloneTemplateComment = templateComment.cloneNode(true);
      bigPictureCommentList.appendChild(cloneTemplateComment);
      cloneTemplateComment.querySelector('.social__picture').src = 'img/avatar-' + (Math.floor(Math.random() * 6) + 1) + '.svg';
      cloneTemplateComment.querySelector('.social__text').textContent = mockingData[numberPicture].comments[i];
    }
  } else {
    for (var i = 0; i < mockingData[numberPicture].comments.length; i++) {
      var cloneTemplateComment = templateComment.cloneNode(true);
      bigPictureCommentList.appendChild(cloneTemplateComment);
      cloneTemplateComment.querySelector('.social__picture').src = 'img/avatar-' + (Math.floor(Math.random() * 6) + 1) + '.svg';
      cloneTemplateComment.querySelector('.social__text').textContent = mockingData[numberPicture].comments[i];
    }
  }
}

document.querySelector('.social__comment-count').classList.add('visually-hidden');
document.querySelector('.comments-loader').classList.add('visually-hidden');

getBigPicture(Math.floor(Math.random() * 25));
