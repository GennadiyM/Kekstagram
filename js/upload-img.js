'use strict';

(function () {
  var SCALE_VALUE_DEFAULT = 100;
  var PROPORTION_FACTOR = 100;
  var TAG_NAME_FOR_DELEGATION_FILTER = 'SPAN';
  var NAME_DEFAULT_FILTER = 'HEAT';
  var VALUE_DEFAULT_SLIDER = 100;
  var MAX_VALUE_SLIDER = 100;
  var MIN_VALUE_SLIDER = 0;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var UPLOAD_DEFAULT_IMG = 'img/upload-default-image.jpg';

  window.uploadImg = {
    Filters: {
      CHROME: {
        className: 'effects__preview--chrome',
        minValueFilter: 0,
        maxValueFilter: 1,
        cssFilter: function (valueSliderPin) {
          var valueCssFilter = (this.maxValueFilter - this.minValueFilter) / PROPORTION_FACTOR * valueSliderPin + this.minValueFilter;
          return 'grayscale(' + valueCssFilter + ')';
        }
      },
      SEPIA: {
        className: 'effects__preview--sepia',
        minValueFilter: 0,
        maxValueFilter: 1,
        cssFilter: function (valueSliderPin) {
          var valueCssFilter = (this.maxValueFilter - this.minValueFilter) / PROPORTION_FACTOR * valueSliderPin + this.minValueFilter;
          return 'sepia(' + valueCssFilter + ')';
        }
      },
      MARVIN: {
        className: 'effects__preview--marvin',
        minValueFilter: 0,
        maxValueFilter: 100,
        cssFilter: function (valueSliderPin) {
          if (valueSliderPin === 0) {
            return 'invert(' + valueSliderPin + ')';
          }
          var valueCssFilter = (this.maxValueFilter - this.minValueFilter) / PROPORTION_FACTOR * valueSliderPin + this.minValueFilter;
          return 'invert(' + valueCssFilter + '%)';
        }
      },
      PHOBOS: {
        className: 'effects__preview--phobos',
        minValueFilter: 0,
        maxValueFilter: 3,
        cssFilter: function (valueSliderPin) {
          if (valueSliderPin === 0) {
            return 'invert(' + valueSliderPin + ')';
          }
          var valueCssFilter = (this.maxValueFilter - this.minValueFilter) / PROPORTION_FACTOR * valueSliderPin + this.minValueFilter;
          return 'blur(' + valueCssFilter + 'px)';
        }
      },
      HEAT: {
        className: 'effects__preview--heat',
        minValueFilter: 1,
        maxValueFilter: 3,
        cssFilter: function (valueSliderPin) {
          var valueCssFilter = (this.maxValueFilter - this.minValueFilter) / PROPORTION_FACTOR * valueSliderPin + this.minValueFilter;
          return 'brightness(' + valueCssFilter + ')';
        }
      },
      SCALE: {
        minValueFilter: 25,
        maxValueFilter: 100,
        cssFilter: function (valueScale) {
          return 'scale(' + valueScale / PROPORTION_FACTOR + ')';
        }
      },
      NONE: {
        hideSlider: true
      }
    },
  };

  var Identifier = {
    UPLOAD_FORM: '#upload-select-image',
    FORM_UPLOAD_FILE: '#upload-file',
    COMMENTS: 'comments',
    HASHTAGS: 'hashtags',
  };

  var Selector = {
    SCALE_BIGGER: '.scale__control--bigger',
    SCALE_SMALLER: '.scale__control--smaller',
    FILTER_LIST: '.effects__list',
    IMG_UPLOAD_EXIT: '.img-upload__cancel',
    IMG_UPLOAD_OVERLAY: '.img-upload__overlay',
    INPUT_HASHTAGS: '.text__hashtags',
    INPUT_COMMENTS: '.text__description',
    UPLOAD_IMG: '.img-upload__preview img',
    SLIDER_LINE: '.effect-level__line',
    SLIDER: '.img-upload__effect-level',
    SLIDER_DEPTH_IDENTIFIER: '.effect-level__depth',
    SLIDER_PIN: '.effect-level__pin',
    EFFECT_LEVEL_VALUE: '.effect-level__value',
  };

  var formUploadFile = document.querySelector(Identifier.FORM_UPLOAD_FILE);
  var uploadForm = document.querySelector(Identifier.UPLOAD_FORM);
  var formChangeUploadFileExit = document.querySelector(Selector.IMG_UPLOAD_EXIT);
  var filterListNode = document.querySelector(Selector.FILTER_LIST);
  var scaleControlSmaller = document.querySelector(Selector.SCALE_SMALLER);
  var scaleControlBigger = document.querySelector(Selector.SCALE_BIGGER);
  var formChangeUploadFile = document.querySelector(Selector.IMG_UPLOAD_OVERLAY);
  var filterSliderBar = formChangeUploadFile.querySelector(Selector.SLIDER_LINE);
  var slider = formChangeUploadFile.querySelector(Selector.SLIDER);
  var pinSlider = formChangeUploadFile.querySelector(Selector.SLIDER_PIN);
  var filterSliderDepthIdentifier = formChangeUploadFile.querySelector(Selector.SLIDER_DEPTH_IDENTIFIER);
  var filterInputLevelValue = formChangeUploadFile.querySelector(Selector.EFFECT_LEVEL_VALUE);
  window.uploadImg.preview = formChangeUploadFile.querySelector(Selector.UPLOAD_IMG);
  window.uploadImg.inputHashtags = formChangeUploadFile.querySelector(Selector.INPUT_HASHTAGS);
  window.uploadImg.inputComments = formChangeUploadFile.querySelector(Selector.INPUT_COMMENTS);

  var renderUploadedImg = function () {
    var file = formUploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        window.uploadImg.preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var currentFilter = NAME_DEFAULT_FILTER;

  var onChangeFilter = function (evt) {
    if (evt.target.tagName === TAG_NAME_FOR_DELEGATION_FILTER) {
      sliderCharacteristics = {};
      filterInputLevelValue.value = VALUE_DEFAULT_SLIDER;
      filterSliderDepthIdentifier.style.width = VALUE_DEFAULT_SLIDER + '%';
      pinSlider.style.left = VALUE_DEFAULT_SLIDER + '%';
      currentFilter = evt.target.id.toUpperCase();
      if (window.uploadImg.Filters[currentFilter].hideSlider) {
        slider.classList.add(window.utils.CLASS_HIDDEN);
        window.uploadImg.preview.style.filter = '';
        return window.uploadImg.preview;
      }
      slider.classList.toggle(window.utils.CLASS_HIDDEN, false);
      filterInputLevelValue.value = MAX_VALUE_SLIDER;
      renderSlider(MAX_VALUE_SLIDER);
      sliderCharacteristics.changeValue = parseInt(filterInputLevelValue.value, 10);
      return window.uploadImg.preview;
    }
    return window.uploadImg.preview;
  };

  var renderSlider = function (value) {
    filterSliderDepthIdentifier.style.width = value + '%';
    pinSlider.style.left = value + '%';
    window.uploadImg.preview.style.filter = window.uploadImg.Filters[currentFilter].cssFilter(value);
  };

  var onChangeFilterPressEnter = function (evt) {
    if (evt.keyCode === window.utils.Keydown.ENTER) {
      onChangeFilter(evt);
    }
  };

  var sliderCharacteristics = {};
  var onSliderMouseDown = function (pinMouseDownEvt) {
    pinMouseDownEvt.preventDefault();
    if (pinMouseDownEvt.which !== 1) {
      return;
    }
    sliderCharacteristics.widthSliderBar = filterSliderBar.clientWidth;
    sliderCharacteristics.pinStartCoordinates = pinSlider.getBoundingClientRect().x;
    sliderCharacteristics.pinClickCoordinate = pinMouseDownEvt.offsetX;
    sliderCharacteristics.value = VALUE_DEFAULT_SLIDER;
    if (sliderCharacteristics.changeValue) {
      sliderCharacteristics.value = sliderCharacteristics.changeValue;
    }
    if (pinMouseDownEvt.target.closest(Selector.SLIDER_PIN)) {
      var onSliderMouseMove = function (sliderMouseMoveEvt) {
        sliderMouseMoveEvt.preventDefault();
        var mouseStartPos = sliderCharacteristics.pinStartCoordinates + sliderCharacteristics.pinClickCoordinate;
        sliderCharacteristics.pinShift = sliderMouseMoveEvt.clientX - mouseStartPos;
        filterInputLevelValue.value = Math.min(MAX_VALUE_SLIDER, Math.max(Math.round(sliderCharacteristics.pinShift * PROPORTION_FACTOR / sliderCharacteristics.widthSliderBar) + sliderCharacteristics.value, MIN_VALUE_SLIDER));
        renderSlider(filterInputLevelValue.value);
      };

      var onPinSliderMouseup = function (pinMouseUpEvt) {
        pinMouseUpEvt.preventDefault();
        sliderCharacteristics.changeValue = parseInt(filterInputLevelValue.value, 10);
        document.removeEventListener('mousemove', onSliderMouseMove);
        document.removeEventListener('mouseup', onPinSliderMouseup);
      };
      document.addEventListener('mouseup', onPinSliderMouseup);
      document.addEventListener('mousemove', onSliderMouseMove);
      return;
    }
    if (pinMouseDownEvt.target.closest(Selector.SLIDER_LINE)) {
      filterInputLevelValue.value = Math.round(pinMouseDownEvt.offsetX * PROPORTION_FACTOR / sliderCharacteristics.widthSliderBar);
      sliderCharacteristics.changeValue = parseInt(filterInputLevelValue.value, 10);
      renderSlider(filterInputLevelValue.value);
    }
    return;
  };

  var onCloseFormUploadFilePressEsc = function (evt) {
    if (evt.keyCode === window.utils.Keydown.ESC && document.activeElement !== window.uploadImg.inputComments) {
      if (document.activeElement === window.uploadImg.inputComments || document.activeElement !== window.uploadImg.inputHashtags) {
        onCloseFormUploadFile();
      }
    }
    return;
  };

  var onCloseFormUploadFilePressEnter = function (evt) {
    if (evt.keyCode === window.utils.Keydown.ENTER) {
      onCloseFormUploadFile();
    }
  };

  var onSubmitForm = function (submitEvt) {
    submitEvt.preventDefault();
    window.backend.save(window.message.success, window.message.onErrorLoadImg, new FormData(uploadForm));
    onCloseFormUploadFile();

  };

  var onOpenFormUploadFile = function () {
    renderUploadedImg();
    uploadForm.addEventListener('submit', onSubmitForm);
    sliderCharacteristics = {};
    formChangeUploadFile.classList.remove(window.utils.CLASS_HIDDEN);
    renderSlider(VALUE_DEFAULT_SLIDER);
    formChangeUploadFileExit.addEventListener('click', onCloseFormUploadFile);
    formChangeUploadFileExit.addEventListener('keydown', onCloseFormUploadFilePressEnter);
    document.addEventListener('keydown', onCloseFormUploadFilePressEsc);
    filterSliderBar.addEventListener('mousedown', onSliderMouseDown);
    filterListNode.addEventListener('click', onChangeFilter);
    filterListNode.addEventListener('keydown', onChangeFilterPressEnter);
    scaleControlBigger.addEventListener('click', window.scaleImg.onChangeScaleBigger);
    scaleControlSmaller.addEventListener('click', window.scaleImg.onChangeScaleSmaller);
    window.uploadImg.inputHashtags.addEventListener('input', window.validation.onHashtagsInput);
    window.uploadImg.inputComments.addEventListener('input', window.validation.onCommentsInput);
  };

  var onCloseFormUploadFile = function () {
    uploadForm.reset();
    window.uploadImg.preview.src = UPLOAD_DEFAULT_IMG;
    formChangeUploadFile.classList.add(window.utils.CLASS_HIDDEN);
    filterInputLevelValue.value = VALUE_DEFAULT_SLIDER;
    currentFilter = NAME_DEFAULT_FILTER;
    window.scaleImg.controlValue.value = SCALE_VALUE_DEFAULT + '%';
    window.uploadImg.preview.style = '';
    filterInputLevelValue.value = VALUE_DEFAULT_SLIDER;
    formChangeUploadFileExit.removeEventListener('click', onCloseFormUploadFile);
    formChangeUploadFileExit.removeEventListener('keydown', onCloseFormUploadFilePressEnter);
    document.removeEventListener('keydown', onCloseFormUploadFilePressEsc);
    filterListNode.removeEventListener('click', onChangeFilter);
    filterListNode.removeEventListener('keydown', onChangeFilterPressEnter);
    scaleControlBigger.removeEventListener('click', window.scaleImg.onChangeScaleBigger);
    scaleControlSmaller.removeEventListener('click', window.scaleImg.onChangeScaleSmaller);
    window.uploadImg.inputHashtags.removeEventListener('input', window.validation.onHashtagsInput);
    window.uploadImg.inputComments.removeEventListener('input', window.validation.onCommentsInput);
    uploadForm.removeEventListener('submit', onSubmitForm);
    window.uploadImg.inputHashtags.value = null;
    window.uploadImg.inputComments.value = null;
  };

  formUploadFile.addEventListener('change', onOpenFormUploadFile);
})();
