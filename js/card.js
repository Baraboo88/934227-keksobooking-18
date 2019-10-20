'use strict';

(function () {

  var ESC_CODE = 27;
  var ROOM_FORMS = ['комната', 'комнат', 'комнаты'];
  var GUESTS_FORMS = ['гостя', 'гостей', 'гостей'];
  var NUMBER_OF_ROOMS_GUESTS = [1, 4];

  var addElementsToBlock = window.util.addElementsToBlock;
  var mapBlock = document.querySelector('.map');
  function flexNormalize(number, forms) {
    switch (true) {
      case number === NUMBER_OF_ROOMS_GUESTS[0]:
        return forms[0];
      case number > NUMBER_OF_ROOMS_GUESTS[1]:
        return forms[1];
      default:
        return forms[2];
    }
  }

  function roomsFlexNormalize(number) {
    return flexNormalize(number, ROOM_FORMS);
  }

  function guestsFlexNormalize(number) {
    return flexNormalize(number, GUESTS_FORMS);
  }

  function renderFeature(feature) {
    var featureElement = document.createElement('LI');
    featureElement.className = 'popup__feature popup__feature--' + feature;
    return featureElement;
  }

  function renderPhoto(photo) {
    var photoElement = document.createElement('IMG');
    photoElement.className = 'popup__photo';
    photoElement.setAttribute('width', '45');
    photoElement.setAttribute('height', '40');
    photoElement.setAttribute('alt', 'Фотография жилья');
    photoElement.src = photo;
    return photoElement;
  }

  function addCard(obj) {
    var mapFilterContainerBlock = document.querySelector('.map__filters-container');
    var clonedElement = window.util.getClonedElement('#card', '.map__card');
    clonedElement.querySelector('.popup__title').textContent = obj.offer.title;
    clonedElement.querySelector('.popup__text--address').textContent = obj.offer.address;
    clonedElement.querySelector('.popup__text--price').textContent = obj.offer.price;
    clonedElement.querySelector('.popup__type').textContent = window.data.offerTypeListMap[obj.offer.type];
    clonedElement.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' ' + roomsFlexNormalize(obj.offer.rooms) + ' для ' + obj.offer.guests + ' ' + guestsFlexNormalize(obj.offer.guests);
    clonedElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
    clonedElement.querySelector('.popup__features').innerHTML = '';
    addElementsToBlock(clonedElement.querySelector('.popup__features'), obj.offer.features, renderFeature);
    clonedElement.querySelector('.popup__description').textContent = obj.offer.description;
    clonedElement.querySelector('.popup__photos').innerHTML = '';
    addElementsToBlock(clonedElement.querySelector('.popup__photos'), obj.offer.photos, renderPhoto);
    clonedElement.querySelector('.popup__avatar').src = obj.author.avatar;
    mapBlock.insertBefore(clonedElement, mapFilterContainerBlock);
    var cardCloseButton = document.querySelector('.popup__close');
    cardCloseButton.addEventListener('click', onCardCloseButtonClick);
    document.addEventListener('keydown', onCardEscKeydown);
  }


  function onCardCloseButtonClick() {
    removeCard();
    document.removeEventListener('keydown', onCardEscKeydown);
  }

  function onCardEscKeydown(evt) {
    if (evt.keyCode === ESC_CODE) {
      removeCard();
      document.removeEventListener('keydown', onCardEscKeydown);
    }
  }

  function removeCard() {
    var mapCard = document.querySelector('.map__card');
    if (mapBlock.contains(mapCard)) {
      document.querySelector('.map').removeChild(mapCard);
    }
  }

  window.card = {
    add: addCard,
    remove: removeCard
  };

})();
