'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var userWizard = userDialog.querySelector('.setup-wizard');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = userDialog.querySelector('.setup-close');
  var userName = userDialog.querySelector('.setup-user-name');
  var userWizardCoat = userWizard.querySelector('.wizard-coat');
  var userWizardEyes = userWizard.querySelector('.wizard-eyes');
  var userWizardFireball = document.querySelector('.setup-fireball-wrap');
  var userWizardCoatValue = document.querySelector('input[name="coat-color"]');
  var userWizardEyesValue = document.querySelector('input[name="eyes-color"]');
  var userWizardFireballValue = document.querySelector('input[name="fireball-color"]');
  var dialogHandler = userDialog.querySelector('.upload');
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var artifactsElement = document.querySelector('.setup-artifacts');
  // var form = userDialog.querySelector('.setup-wizard-form');
  var draggedItem = null;

  // var setupCloseEscHandler = function (evt) {
  //   window.util.isEscEvent(evt, closeSetup);
  // };

  var addCloseEsc = function () {
    document.addEventListener('keydown', window.util.setupCloseEscHandler);
  };

  var openSetup = function () {
    userDialog.classList.remove('hidden');
    addCloseEsc();
    userWizardCoat.style.fill = userWizardCoatValue.value;
    userWizardEyes.style.fill = userWizardEyesValue.value;
    userWizardFireball.style.backgroundColor = userWizardFireballValue.value;
    userDialog.style.top = '';
    userDialog.style.left = '';
  };

  // var closeSetup = function () {
  //   userWizardCoatValue.value = 'rgb(101, 137, 164)';
  //   userWizardEyesValue.value = '';
  //   userWizardFireballValue.value = '';
  //   form.reset();
  //   userDialog.classList.add('hidden');
  //   removeCloseEsc();
  // };

  setupOpen.addEventListener('click', function () {
    openSetup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openSetup);
  });

  setupClose.addEventListener('click', function () {
    window.util.closeSetup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, window.util.closeSetup);
  });

  userName.addEventListener('focus', function () {
    window.util.removeCloseEsc();
  });

  userName.addEventListener('blur', function () {
    addCloseEsc();
  });

  userWizardCoat.addEventListener('click', function () {
    var randomColorCoat = window.util.WizardParams.COAT_COLOR[window.util.getRandomInt(0, window.util.WizardParams.COAT_COLOR.length)];
    userWizardCoat.style.fill = randomColorCoat;
    userWizardCoatValue.setAttribute('value', randomColorCoat);
  });

  userWizardEyes.addEventListener('click', function () {
    var randomColorEyes = window.util.WizardParams.EYES_COLOR[window.util.getRandomInt(0, window.util.WizardParams.EYES_COLOR.length)];
    userWizardEyes.style.fill = randomColorEyes;
    userWizardEyesValue.setAttribute('value', randomColorEyes);
  });

  userWizardFireball.addEventListener('click', function () {
    var randomColorFireball = window.util.WizardParams.FIREBALL_COLOR[window.util.getRandomInt(0, window.util.WizardParams.FIREBALL_COLOR.length)];
    userWizardFireball.style.backgroundColor = randomColorFireball;
    userWizardFireballValue.setAttribute('value', randomColorFireball);
  });

  dialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (onClicEvt) {
          onClicEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);
  });


  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

})();
