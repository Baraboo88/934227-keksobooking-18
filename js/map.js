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

  function renderFilteredPins() {
    var housingTypeValue = document.querySelector('#housing-type').value;
    var housingPriceValue = document.querySelector('#housing-price').value;
    var housingRoomsValue = document.querySelector('#housing-rooms').value;
    var housingGuestsValue = document.querySelector('#housing-guests').value;
    var filterWifiChecked = document.querySelector('#filter-wifi').checked;
    var filterDishwasherChecked = document.querySelector('#filter-dishwasher').checked;
    var filterParkingChecked = document.querySelector('#filter-parking').checked;
    var filterWasherChecked = document.querySelector('#filter-washer').checked;
    var filterElevatorChecked = document.querySelector('#filter-elevator').checked;
    var filterConditionerChecked = document.querySelector('#filter-conditioner').checked;


    clearPins();

    window.util.addElementsToBlock(mapPins, pins.filter(function (element) {
      if (housingTypeValue === 'any') {
        return true;
      }
      return element.offer.type === housingTypeValue;
    })
      .filter(function (element) {
        if (housingPriceValue === 'any') {
          return true;
        }
        return (housingPriceValue === 'low' && element.offer.price < 10000) || (housingPriceValue === 'middle' && element.offer.price < 50000 && element.offer.price >= 10000) || (housingPriceValue === 'high' && element.offer.price >= 50000);
      })
      .filter(function (element) {
        if (housingRoomsValue === 'any') {
          return true;
        }
        return (housingRoomsValue === '1' && element.offer.rooms === 1) || (housingRoomsValue === '2' && element.offer.rooms === 2) || (housingRoomsValue === '3' && element.offer.rooms === 3);

      })
      .filter(function (element) {
        if (housingGuestsValue === 'any') {
          return true;
        }
        return (housingGuestsValue === '1' && element.offer.guests === 1) || (housingGuestsValue === '2' && element.offer.guests === 2) || (housingGuestsValue === '0' && element.offer.guests === 0);

      })
      .filter(function (element) {
        return (filterWifiChecked === element.offer.features.includes('wifi'))
          && (filterDishwasherChecked === element.offer.features.includes('dishwasher'))
          && (filterParkingChecked === element.offer.features.includes('parking'))
          && (filterWasherChecked === element.offer.features.includes('washer'))
          && (filterElevatorChecked === element.offer.features.includes('elevator'))
          && (filterConditionerChecked === element.offer.features.includes('conditioner'));
      })
      .slice(0, 5), addElements);
  }

  function onFilterChange() {
    window.util.debounce(renderFilteredPins);
  }

  function activatePage() {
    mapPinMain.addEventListener('click', onClickMainMapPin);
    document.addEventListener('keydown', onMapPinsKeydown);
    mapPins.addEventListener('click', onPinClick);
    document.querySelector('.map__filters').addEventListener('input', onFilterChange);
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
