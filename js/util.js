'use strict';

window.util = (function () {
  var KeyCode = {
    ESC: 27,
    ENTER: 13,
  };

  var WizardParams = {
    NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    COAT_COLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLOR: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
  };

  return {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === KeyCode.ESC) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === KeyCode.ENTER) {
        action();
      }
    },
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getRandomNameOfWizard: function () {
      return WizardParams.NAMES[window.util.getRandomInt(0, WizardParams.NAMES.length)] + ' ' + WizardParams.SURNAMES[window.util.getRandomInt(0, WizardParams.SURNAMES.length)];
    },
    getRandomCoatOfWizard: function () {
      return WizardParams.COAT_COLOR[window.util.getRandomInt(0, WizardParams.COAT_COLOR.length)];
    },
    getRandomEyesOfWizard: function () {
      return WizardParams.EYES_COLOR[window.util.getRandomInt(0, WizardParams.EYES_COLOR.length)];
    },
    getRandomFireballOfWizard: function () {
      return WizardParams.FIREBALL_COLOR[window.util.getRandomInt(0, WizardParams.FIREBALL_COLOR.length)];
    },
  };
})();
