'use strict';

(function () {
  var ESC_CODE = 27;
  var getLeftAtPage = window.util.getLeftAtPage;
  var getTopAtPage = window.util.getTopAtPage;
  var getElementWidth = window.util.getElementWidth;
  var getElementHeight = window.util.getElementHeight;

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

  function populateActiveMainPinAddress() {
    var addressField = document.querySelector('#address');
    var x = Math.round(getLeftAtPage(mapPinMain) - getLeftAtPage(mapPins) + (getElementWidth('.map__pin--main') / 2));
    var y = Math.round(getTopAtPage(mapPinMain) - getTopAtPage(mapPins) + getElementHeight('.map__pin--main'));
    addressField.value = x + ', ' + y;
  }

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
    document.querySelector('.ad-form__submit').addEventListener('click', onFormSubmitClick);

  }

  function onFormSubmitClick(evt) {
    var formElement = document.querySelector('.ad-form');
    var formData = new FormData(formElement);
    if (document.querySelector('.ad-form').checkValidity()) {
      evt.preventDefault();
      window.backend.save(formData, onSendFormDataSuccess, window.util.onErrorLoadSave);
    }

  }

  function onSendFormDataSuccess() {
    var mainElement = document.querySelector('main');

    if (!mainElement.contains(document.querySelector('.success'))) {
      var clonedElement = window.util.getClonedElement('#success', '.success');
    }

    function closeSuccessMsg() {
      var mapPinArray = document.querySelectorAll('.map__pin');
      var successElement = document.querySelector('.success');
      if (document.querySelector('.map__card')) {
        window.card.remove();
      }

      mapPinArray.forEach(function (element) {
        if (!element.classList.contains('map__pin--main')) {
          element.parentNode.removeChild(element);
        }
      });

      document.querySelector('.ad-form').reset();

      mapPinMain.style.left = 570 + 'px';
      mapPinMain.style.top = 375 + 'px';
      populateActiveMainPinAddress();

      successElement.parentNode.removeChild(successElement);
    }

    function onClickSuccessMsg() {
      closeSuccessMsg();
      document.removeEventListener('click', onClickSuccessMsg);
      document.removeEventListener('keydown', onKeydownSuccessMsg);
    }

    function onKeydownSuccessMsg(evt) {
      if (evt.keyCode === ESC_CODE) {
        closeSuccessMsg();
        document.removeEventListener('keydown', onKeydownSuccessMsg);
        document.removeEventListener('click', onClickSuccessMsg);
      }

    }

    mainElement.appendChild(clonedElement);
    document.addEventListener('click', onClickSuccessMsg);
    document.addEventListener('keydown', onKeydownSuccessMsg);

  }


  window.form = {
    activePageActions: activePageActions,
    activate: activateForm,
    populateActiveMainPinAddress: populateActiveMainPinAddress,
  };

})();
