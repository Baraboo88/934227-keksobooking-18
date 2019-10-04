'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var mapFiltersForm = document.querySelector('.map__filters');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');

  var roomsCapacityMap = {
    '1': {
      'guests': ['1'],
      'errorText': '1 комната для 1 гостя',
    },
    '2': {
      'guests': ['1', '2'],
      'errorText': '2 комнаты для 1 или 2 гостей',
    },
    '3': {
      'guests': ['1', '2', '3'],
      'errorText': '3 комнаты для 1, 2 или 3 гостей',
    },
    '100': {
      'guests': ['0'],
      'errorText': '100 комнат не для гостей',
    },
  };

  var getLeftAtPage = window.util.getLeftAtPage;
  var getTopAtPage = window.util.getTopAtPage;
  var getElementWidth = window.util.getElementWidth;
  var getElementHeight = window.util.getElementHeight;

  addDisabledToForm(adForm, 'input');
  addDisabledToForm(adForm, 'select');
  addDisabledToForm(adForm, 'button');
  addDisabledToForm(adForm, 'textarea');
  addDisabledToForm(mapFiltersForm, 'input');
  addDisabledToForm(mapFiltersForm, 'select');
  addDisabledToForm(mapFiltersForm, 'button');
  addDisabledToForm(mapFiltersForm, 'textarea');
  populateInitialAddress();



  function populateInitialAddress() {
    var addressField = document.querySelector('#address');
    var x = Math.round(getLeftAtPage(mapPinMain) - getLeftAtPage(mapPins) + (getElementWidth('.map__pin--main') / 2));
    var y = Math.round(getTopAtPage(mapPinMain) - getTopAtPage(mapPins) + (getElementHeight('.map__pin--main') / 2));
    addressField.value = x + ', ' + y;
  }

  window.util.populateActiveMainPinAddress();

  function addDisabledToForm(formDomElement, selector) {
    formDomElement.querySelectorAll(selector).forEach(function (element) {
      element.setAttribute('disabled', true);
    });
  }

  function removeDisabledFromForm(formDomElement, selector) {
    formDomElement.querySelectorAll(selector).forEach(function (element) {
      element.removeAttribute('disabled');
    });
  }

  function validateRoomNumbers() {
    var roomCapacity = document.querySelector('#capacity');
    var roomNumber = document.querySelector('#room_number');
    var roomNumberValue = roomNumber[roomNumber.selectedIndex].value;
    var roomCapacityValue = roomCapacity[roomCapacity.selectedIndex].value;
    roomCapacity.setCustomValidity(roomsCapacityMap[roomNumberValue].guests.includes(roomCapacityValue) ? '' : roomsCapacityMap[roomNumberValue].errorText);
  }


  function onTimeInChange() {
    var timeIn = document.querySelector('#timein');
    var timeOut = document.querySelector('#timeout');
    timeOut.value = timeIn.value;

  }

  function onTimeOutChange() {
    var timeIn = document.querySelector('#timein');
    var timeOut = document.querySelector('#timeout');
    timeIn.value = timeOut.value;

  }

  var housingTypeMinPriceMap = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
  };

  function setupHousingTypeMinPrice() {
    var housingType = document.querySelector('#type');
    var housingTypeValue = housingType[housingType.selectedIndex].value;
    var price = document.querySelector('#price');
    price.setAttribute('min', housingTypeMinPriceMap[housingTypeValue]);
    price.placeholder = housingTypeMinPriceMap[housingTypeValue];
  }

  function onHousingTypeChange() {
    setupHousingTypeMinPrice();
  }

  function onRoomOrCapacityChange() {
    validateRoomNumbers();
  }

  function activePageActions() {
    removeDisabledFromForm(adForm, 'input');
    removeDisabledFromForm(adForm, 'select');
    removeDisabledFromForm(adForm, 'button');
    removeDisabledFromForm(adForm, 'textarea');
    removeDisabledFromForm(mapFiltersForm, 'input');
    removeDisabledFromForm(mapFiltersForm, 'select');
    removeDisabledFromForm(mapFiltersForm, 'button');
    removeDisabledFromForm(mapFiltersForm, 'textarea');
    document.querySelector('#address').setAttribute('readonly', true);

  }

  function activateForm() {
    var roomCapacity = document.querySelector('#capacity');
    var roomNumber = document.querySelector('#room_number');
    var timeIn = document.querySelector('#timein');
    var housingType = document.querySelector('#type');
    var timeOut = document.querySelector('#timeout');
    validateRoomNumbers();
    setupHousingTypeMinPrice();
    housingType.addEventListener('input', onHousingTypeChange);
    roomCapacity.addEventListener('input', onRoomOrCapacityChange);
    roomNumber.addEventListener('input', onRoomOrCapacityChange);
    timeIn.addEventListener('input', onTimeInChange);
    timeOut.addEventListener('input', onTimeOutChange);

  }

  window.form = {
    activePageActions: activePageActions,
    activate: activateForm,
    populateActiveMainPinAddress: populateActiveMainPinAddress,
  };

})();
