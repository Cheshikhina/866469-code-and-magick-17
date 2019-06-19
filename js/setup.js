'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
.content
.querySelector('.setup-similar-item');

var wizards = [];
wizards.WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
wizards.WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
wizards.coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
wizards.eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];

wizards.WIZARD_NAMES.sort(function () {
  return 0.5 - Math.random();
});
wizards.WIZARD_SURNAMES.sort(function () {
  return 0.5 - Math.random();
});
wizards.coatColor.sort(function () {
  return 0.5 - Math.random();
});
wizards.eyesColor.sort(function () {
  return 0.5 - Math.random();
});

// еще одно решение для сортировки
// function shuffle(array) {
//   var currentIndex = array.length, temporaryValue, randomIndex;

//   while (0 !== currentIndex) {

//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;

//     temporaryValue = array[currentIndex];
//     array[currentIndex] = array[randomIndex];
//     array[randomIndex] = temporaryValue;
//   }

//   return array;
// }
// wizards.WIZARD_NAMES = shuffle(wizards.WIZARD_NAMES);
// wizards.WIZARD_SURNAMES = shuffle(wizards.WIZARD_SURNAMES);
// wizards.coatColor = shuffle(wizards.coatColor);
// wizards.eyesColor = shuffle(wizards.eyesColor);

var renderWizard = function () {
  for (var i = 0; i < 4; i++) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizards.WIZARD_NAMES[i] + ' ' + wizards.WIZARD_SURNAMES[i];
    wizardElement.querySelector('.wizard-coat').style.fill = wizards.coatColor[i];
    wizardElement.querySelector('.wizard-eyes').style.fill = wizards.eyesColor[i];

    similarListElement.appendChild(wizardElement);
  }
};

var fragment = document.createDocumentFragment();
fragment.appendChild(renderWizard());
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
