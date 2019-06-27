'use strict';

var WIZARDS_ITEM = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var userDialog = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var userName = userDialog.querySelector('.setup-user-name');
var userWizard = userDialog.querySelector('.setup-wizard');
var userWizardCoat = userWizard.querySelector('.wizard-coat');
var userWizardEyes = userWizard.querySelector('.wizard-eyes');
var userWizardFireball = document.querySelector('.setup-fireball-wrap');
var formSubmit = document.querySelector('.setup-wizard-form');
var userWizardCoatValue = document.querySelector('input[name="coat-color"]');
var userWizardEyesValue = document.querySelector('input[name="eyes-color"]');
var userWizardFireballValue = document.querySelector('input[name="fireball-color"]');
var wizardNewColorCoat = [];
var wizardNewColorEyes = [];
var wizardNewColorFireball = [];

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var WizardParams = {
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green'],
  FIREBALL_COLOR: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
};

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getData = function () {
  var wizards = [];
  for (var i = 0; i < WIZARDS_ITEM; i++) {
    wizards.push({
      name: WizardParams.NAMES[getRandomInt(0, WizardParams.NAMES.length)] + ' ' + WizardParams.SURNAMES[getRandomInt(0, WizardParams.SURNAMES.length)],
      coatColor: WizardParams.COAT_COLOR[getRandomInt(0, WizardParams.COAT_COLOR.length)],
      eyesColor: WizardParams.EYES_COLOR[getRandomInt(0, WizardParams.EYES_COLOR.length)],
    });
  }

  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizards = function () {
  var fragment = document.createDocumentFragment();
  var wizardsData = getData();

  for (var i = 0; i < wizardsData.length; i++) {
    fragment.appendChild(renderWizard(wizardsData[i]));
  }

  similarListElement.appendChild(fragment);
};

renderWizards();
userDialog.querySelector('.setup-similar').classList.remove('hidden');

//

var setupCloseEscHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeSetup();
  }
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
  wizardNewColorCoat.push(userWizardCoatValue.value);
  userWizardCoat.style.fill = userWizardCoatValue.value;
  wizardNewColorEyes.push(userWizardEyesValue.value);
  userWizardEyes.style.fill = userWizardEyesValue.value;
  wizardNewColorFireball.push(userWizardFireballValue.value);
  userWizardFireball.style.backgroundColor = userWizardFireballValue.value;
};

var closeSetup = function () {
  userDialog.classList.add('hidden');
  removeCloseEsc();
  wizardNewColorCoat.splice(0, wizardNewColorCoat.length + 1);
  wizardNewColorEyes.splice(0, wizardNewColorEyes.length + 1);
  wizardNewColorFireball.splice(0, wizardNewColorFireball.length + 1);
};

setupOpen.addEventListener('click', function () {
  openSetup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetup();
  }
});

setupClose.addEventListener('click', function () {
  closeSetup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetup();
  }
});

userName.addEventListener('focus', function () {
  removeCloseEsc();
});

userName.addEventListener('blur', function () {
  addCloseEsc();
});

var getRandomWizardParam = function (wizardParam) {
  var randomWizardParam = wizardParam[getRandomInt(0, wizardParam.length)];
  return randomWizardParam;
};

userWizardCoat.addEventListener('click', function () {
  var randomColorCoat = getRandomWizardParam(WizardParams.COAT_COLOR);
  userWizardCoat.style.fill = randomColorCoat;
  wizardNewColorCoat.push(randomColorCoat);
  return wizardNewColorCoat;
});

userWizardEyes.addEventListener('click', function () {
  var randomColorEyes = getRandomWizardParam(WizardParams.EYES_COLOR);
  userWizardEyes.style.fill = randomColorEyes;
  wizardNewColorEyes.push(randomColorEyes);
  return wizardNewColorEyes;
});

userWizardFireball.addEventListener('click', function () {
  var randomColorFireball = getRandomWizardParam(WizardParams.FIREBALL_COLOR);
  userWizardFireball.style.backgroundColor = randomColorFireball;
  wizardNewColorFireball.push(randomColorFireball);
  return wizardNewColorFireball;
});

formSubmit.addEventListener('submit', function () {
  var userWizardNewColorCoat = wizardNewColorCoat[wizardNewColorCoat.length - 1];
  userWizardCoatValue.setAttribute('value', userWizardNewColorCoat);

  var userWizardNewColorEyes = wizardNewColorEyes[wizardNewColorEyes.length - 1];
  userWizardEyesValue.setAttribute('value', userWizardNewColorEyes);

  var userWizardNewColorFireball = wizardNewColorFireball[wizardNewColorFireball.length - 1];
  userWizardFireballValue.setAttribute('value', userWizardNewColorFireball);
});
