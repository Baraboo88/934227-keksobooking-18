'use strict';

(function () {

  var ENTER_CODE = 13;
  var PIN_HEIGHT = 40;
  var PIN_WIDTH = 40;
  var NUMBER_OF_MOCK_PINS = 8;

  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var pins = getArrayOfMockObjects(NUMBER_OF_MOCK_PINS);

  function getArrayOfMockObjects(number) {
    return new Array(number).fill('').map(function (element, index) {
      return window.getMockObject(index + 1);
    });
  }

  function activePageActions() {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    window.util.addElementsToBlock(mapPins, pins, addElements);
  }

  function activatePage() {
    mapPinMain.addEventListener('click', onClickMainMapPin);
    document.addEventListener('keydown', onMapPinsKeydown);
    mapPins.addEventListener('click', onPinClick);
    window.form.activate();
  }

  function addElements(obj) {
    var clonedElement = window.util.getClonedElement('#pin', '.map__pin');
    clonedElement.style.left = (obj.location.x - PIN_WIDTH / 2) + 'px';
    clonedElement.style.top = (obj.location.y - PIN_HEIGHT) + 'px';
    clonedElement.firstChild.src = obj.author.avatar;
    clonedElement.firstChild.alt = obj.offer.title;
    return clonedElement;
  }


  function onClickMainMapPin() {
    activePageActions();
    window.form.activePageActions();
    window.form.populateActiveMainPinAddress();
    mapPinMain.removeEventListener('click', onClickMainMapPin);
  }

  function onMapPinsKeydown(evt) {
    if (evt.keyCode === ENTER_CODE) {
      activePageActions();
    }
  }

  function onPinClick(evt) {
    if ((evt.target.classList.contains('map__pin') || evt.target.tagName === 'IMG') && !evt.target.classList.contains('map__pin--main') && !evt.target.parentNode.classList.contains('map__pin--main')) {
      if (evt.target.tagName === 'IMG') {
        changeCard(evt.target.parentNode);
      } else {
        changeCard(evt.target);
      }

    }
  }

  function changeCard(element) {

    var xLocation = parseInt(element.style.left, 10) + PIN_WIDTH / 2;
    var yLocation = parseInt(element.style.top, 10) + PIN_HEIGHT;

    if (document.querySelector('.map__card')) {
      window.card.remove();
    }

    pins.forEach(function (elem) {
      if (elem.location.x === xLocation && elem.location.y === yLocation) {
        window.card.add(elem);
      }
    });
  }

  activatePage();

})();
