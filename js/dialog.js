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
  var dialogHandle = userDialog.querySelector('.upload');
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  var artifactsElement = document.querySelector('.setup-artifacts');

  var setupCloseEscHandler = function (evt) {
    window.util.isEscEvent(evt, closeSetup);
  };

  var addCloseEsc = function () {
    document.addEventListener('keydown', setupCloseEscHandler);
  };

  var removeCloseEsc = function () {
    document.removeEventListener('keydown', setupCloseEscHandler);
  };

  var openSetup = function () {
    userDialog.classList.remove('hidden');
    addCloseEsc();
    userWizardCoat.style.fill = userWizardCoatValue.value;
    userWizardEyes.style.fill = userWizardEyesValue.value;
    userWizardFireball.style.backgroundColor = userWizardFireballValue.value;
    userDialog.style.top = '';
    userDialog.style.left = '';
    draggedItem = null;
  };

  var closeSetup = function () {
    userWizardCoatValue.value = 'rgb(101, 137, 164)';
    userWizardEyesValue.value = '';
    userWizardFireballValue.value = '';
    userDialog.classList.add('hidden');
    removeCloseEsc();
  };

  setupOpen.addEventListener('click', function () {
    openSetup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openSetup);
  });

  setupClose.addEventListener('click', function () {
    closeSetup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closeSetup);
  });

  userName.addEventListener('focus', function () {
    removeCloseEsc();
  });

  userName.addEventListener('blur', function () {
    addCloseEsc();
  });

  userWizardCoat.addEventListener('click', function () {
    var randomColorCoat = window.util.getRandomCoatOfWizard();
    userWizardCoat.style.fill = randomColorCoat;
    userWizardCoatValue.setAttribute('value', randomColorCoat);
  });

  userWizardEyes.addEventListener('click', function () {
    var randomColorEyes = window.util.getRandomEyesOfWizard();
    userWizardEyes.style.fill = randomColorEyes;
    userWizardEyesValue.setAttribute('value', randomColorEyes);
  });

  userWizardFireball.addEventListener('click', function () {
    var randomColorFireball = window.util.getRandomFireballOfWizard();
    userWizardFireball.style.backgroundColor = randomColorFireball;
    userWizardFireballValue.setAttribute('value', randomColorFireball);
  });

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

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
