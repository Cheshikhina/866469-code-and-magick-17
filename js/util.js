'use strict';

window.util = (function () {
  var userDialog = document.querySelector('.setup');
  var form = userDialog.querySelector('.setup-wizard-form');
  var userWizardCoatValue = document.querySelector('input[name="coat-color"]');
  var userWizardEyesValue = document.querySelector('input[name="eyes-color"]');
  var userWizardFireballValue = document.querySelector('input[name="fireball-color"]');
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

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === KeyCode.ESC) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === KeyCode.ENTER) {
      action();
    }
  };

  var removeCloseEsc = function () {
    document.removeEventListener('keydown', setupCloseEscHandler);
  };

  var setupCloseEscHandler = function (evt) {
    isEscEvent(evt, closeSetup);
  };

  var closeSetup = function () {
    userWizardCoatValue.value = 'rgb(101, 137, 164)';
    userWizardEyesValue.value = '';
    userWizardFireballValue.value = '';
    form.reset();
    userDialog.classList.add('hidden');
    removeCloseEsc();
  };

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  return {
    WizardParams: WizardParams,
    getRandomInt: getRandomInt,
    isEnterEvent: isEnterEvent,
    setupCloseEscHandler: setupCloseEscHandler,
    closeSetup: closeSetup,
    removeCloseEsc: removeCloseEsc,
  };
})();
