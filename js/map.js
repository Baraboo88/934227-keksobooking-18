'use strict';

(function () {

  var ENTER_CODE = 13;
  var PIN_HEIGHT = 40;
  var PIN_WIDTH = 40;


  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var pins = null;

  var getLeftAtPage = window.util.getLeftAtPage;
  var getTopAtPage = window.util.getTopAtPage;

  function renderPins() {
    window.util.addElementsToBlock(mapPins, pins.slice(0, 5), addElements);
  }

  function onLoadPins(pinsArray) {
    pins = pinsArray;
    renderPins();
  }

  function activePageActions() {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    window.backend.load(onLoadPins, window.util.onErrorLoadSave);
    mapPinMain.addEventListener('mousedown', onMapPinMainMouseDown);
  }

  function clearPins() {
    document.querySelectorAll('.map__pin').forEach(function (element) {
      if (!element.classList.contains('map__pin--main')) {
        element.parentNode.removeChild(element);
      }
    });
  }

  function onFilterChange() {
    var housingTypeValue = document.querySelector('#housing-type').value;
    clearPins();

    window.util.addElementsToBlock(mapPins, pins.filter(function (element) {
      if (housingTypeValue === 'any') {
        return true;
      }
      return element.offer.type === housingTypeValue;
    }).slice(0, 5), addElements);
  }

  function activatePage() {
    mapPinMain.addEventListener('click', onClickMainMapPin);
    document.addEventListener('keydown', onMapPinsKeydown);
    mapPins.addEventListener('click', onPinClick);
    document.querySelector('.map__filter').addEventListener('input', onFilterChange);
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
    document.removeEventListener('keydown', onMapPinsKeydown);
  }

  function onMapPinsKeydown(evt) {
    if (evt.keyCode === ENTER_CODE) {
      activePageActions();
      document.removeEventListener('keydown', onMapPinsKeydown);
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

  function onMapPinMainMouseDown(evt) {

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    function onMapPinMainMouseMove(moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      if ((getTopAtPage(mapPinMain) - getTopAtPage(mapPins) - shift.y) < 130 - mapPinMain.clientHeight) {
        mapPinMain.style.top = (130 - mapPinMain.clientHeight) + 'px';
      } else if ((getTopAtPage(mapPinMain) - getTopAtPage(mapPins) - shift.y) > 630 - mapPinMain.clientHeight) {
        mapPinMain.style.top = (630 - mapPinMain.clientHeight) + 'px';

      } else {
        mapPinMain.style.top = (getTopAtPage(mapPinMain) - getTopAtPage(mapPins) - shift.y) + 'px';
      }

      if ((getLeftAtPage(mapPinMain) - getLeftAtPage(mapPins) - shift.x) < 0 - mapPinMain.clientWidth / 2) {
        mapPinMain.style.left = (0 - mapPinMain.clientWidth / 2) + 'px';
      } else if ((getLeftAtPage(mapPinMain) - getLeftAtPage(mapPins) - shift.x) > mapPins.clientWidth - mapPinMain.clientWidth / 2) {
        mapPinMain.style.left = (mapPins.clientWidth - mapPinMain.clientWidth / 2) + 'px';

      } else {
        mapPinMain.style.left = (getLeftAtPage(mapPinMain) - getLeftAtPage(mapPins) - shift.x) + 'px';
      }

      window.form.populateActiveMainPinAddress();

    }

    function onMapPinMainMouseUp() {
      document.removeEventListener('mousemove', onMapPinMainMouseMove);
      document.removeEventListener('mouseup', onMapPinMainMouseUp);
    }

    document.addEventListener('mousemove', onMapPinMainMouseMove);
    document.addEventListener('mouseup', onMapPinMainMouseUp);

  }

  activatePage();

})();
