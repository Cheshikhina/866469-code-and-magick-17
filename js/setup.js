'use strict';

(function () {
  var WIZARDS_ITEM = 4;
  var userDialog = document.querySelector('.setup');

  document.querySelector('.setup-similar').classList.remove('hidden');

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

  var getData = function () {
    var wizards = [];
    for (var i = 0; i < WIZARDS_ITEM; i++) {
      wizards.push({
        name: window.util.WizardParams.NAMES[window.util.getRandomInt(0, window.util.WizardParams.NAMES.length)] + ' ' + window.util.WizardParams.SURNAMES[window.util.getRandomInt(0, window.util.WizardParams.SURNAMES.length)],
        coatColor: window.util.WizardParams.COAT_COLOR[window.util.getRandomInt(0, window.util.WizardParams.COAT_COLOR.length)],
        eyesColor: window.util.WizardParams.EYES_COLOR[window.util.getRandomInt(0, window.util.WizardParams.EYES_COLOR.length)],
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


})();
