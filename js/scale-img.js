'use strict';

(function () {
  var STEP_SCALE = 25;
  var SELECTOR_SCALE_VALUE = '.scale__control--value';

  var scaleControlValue = document.querySelector(SELECTOR_SCALE_VALUE);

  window.scaleImg = {
    onChangeScaleBigger: function () {
      var modifiedValueScale = parseInt(scaleControlValue.value, 10) + STEP_SCALE;
      modifiedValueScale = Math.min(window.uploadImg.Filters.SCALE.maxValueFilter, Math.max(modifiedValueScale, window.uploadImg.Filters.SCALE.minValueFilter));
      scaleControlValue.value = modifiedValueScale + '%';
      window.uploadImg.preview.style.transform = window.uploadImg.Filters.SCALE.cssFilter(parseInt(scaleControlValue.value, 10));
      return window.uploadImg.preview;
    },
    onChangeScaleSmaller: function () {
      var modifiedValueScale = parseInt(scaleControlValue.value, 10) - STEP_SCALE;
      modifiedValueScale = Math.min(window.uploadImg.Filters.SCALE.maxValueFilter, Math.max(modifiedValueScale, window.uploadImg.Filters.SCALE.minValueFilter));
      scaleControlValue.value = modifiedValueScale + '%';
      window.uploadImg.preview.style.transform = window.uploadImg.Filters.SCALE.cssFilter(parseInt(scaleControlValue.value, 10));
      return window.uploadImg.preview;
    },
    scaleControlValue: scaleControlValue,
  };
})();
