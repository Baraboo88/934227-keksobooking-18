'use strict';

var offerTypeList = ['palace', 'flat', 'bungalo'];
var offerTypeListMap = {
  'palece': 'Особняк',
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
};
var offerCheckinList = ['12:00', '13:00', '14:00'];
var offerCheckoutList = ['12:00', '13:00', '14:00'];
var offerFeaturesList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offerPhotoList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var outerBlock = document.querySelector('.map__pins');
var mapBlock = document.querySelector('.map');
var mapFilterContainerBlock = document.querySelector('.map__filters-container');

var LOCATION_Y_FROM = 130;
var LOCATION_Y_TO = 630;

function getRandom(number) {
  return Math.floor(Math.random() * number);
}

function activePage() {
  document.querySelector('.map').classList.remove('map--faded');
}

function shuffleArray(array) {
  for (var k = array.length - 1; k > 0; k--) {
    var randomIndex = Math.floor(Math.random() * (k + 1));
    var temp = array[k];
    array[k] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

function getRandomElementFromArray(array) {
  return array[getRandom(array.length)];
}

function getArrayWithRandomLength(array) {

  return shuffleArray(array).slice(0, getRandom(array.length));
}

function getRandomNumberFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Author(number) {
  this.avatar = 'img/avatars/user0' + number + '.png';
}

function Offer(location) {
  this.title = 'Заголовок';
  this.address = location.x + ', ' + location.y;
  this.price = 10;
  this.type = getRandomElementFromArray(offerTypeList);
  this.rooms = 2;
  this.guests = 3;
  this.checkin = getRandomElementFromArray(offerCheckinList);
  this.checkout = getRandomElementFromArray(offerCheckoutList);
  this.features = getArrayWithRandomLength(offerFeaturesList);
  this.description = 'Description';
  this.photos = getArrayWithRandomLength(offerPhotoList);
}

function LocationObject() {
  this.x = getRandomNumberFromRange(0, outerBlock.clientWidth);
  this.y = getRandomNumberFromRange(LOCATION_Y_FROM, LOCATION_Y_TO);
}

function MockObject(number) {
  this.author = new Author(number);
  this.location = new LocationObject();
  this.offer = new Offer(this.location);
}

function getArrayOfMockObjects(number) {
  return new Array(number).fill('').map(function (element, index) {
    return new MockObject(index + 1);
  });
}

function cloneAndAddElement(obj) {
  var clonedElement = getClonedElement('#pin', '.map__pin');
  clonedElement.style.left = (obj.location.x - clonedElement.clientWidth / 2) + 'px';
  clonedElement.style.top = (obj.location.y - clonedElement.clientHeight) + 'px';
  clonedElement.firstChild.src = obj.author.avatar;
  clonedElement.firstChild.alt = obj.offer.title;
  return clonedElement;
}

function addElementsToBlock(block, elements, callBackCloneAndAdd) {
  var documentFragment = document.createDocumentFragment();
  elements.forEach(function (element) {
    documentFragment.appendChild(callBackCloneAndAdd(element));
  });
  block.appendChild(documentFragment);
}

function getClonedElement(templateSelector, elementSelector) {
  return document
    .querySelector(templateSelector)
    .content
    .querySelector(elementSelector)
    .cloneNode(true);

}

function flexNormalize(number, forms) {
  switch (true) {
    case number === 1 :
      return forms[0];
    case number > 4:
      return forms[1];
    default:
      return forms[2];
  }
}

function roomsFlexNormalize(number) {
  var forms = ['комната', 'комнат', 'комнаты'];
  return flexNormalize(number, forms);
}

function guestsFlexNormalize(number) {
  var forms = ['гостя', 'гостей', 'гостей'];
  return flexNormalize(number, forms);
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

function cloneAndAddCard(obj) {
  var clonedElement = getClonedElement('#card', '.map__card');
  clonedElement.querySelector('.popup__title').textContent = obj.offer.title;
  clonedElement.querySelector('.popup__text--address').textContent = obj.offer.address;
  clonedElement.querySelector('.popup__text--price').textContent = obj.offer.price;
  clonedElement.querySelector('.popup__type').textContent = offerTypeListMap[obj.offer.type];
  clonedElement.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' ' + roomsFlexNormalize(obj.offer.rooms) + ' для ' + obj.offer.guests + ' ' + guestsFlexNormalize(obj.offer.guests);
  clonedElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
  clonedElement.querySelector('.popup__features').innerHTML = '';
  addElementsToBlock(clonedElement.querySelector('.popup__features'), obj.offer.features, renderFeature);
  clonedElement.querySelector('.popup__description').textContent = obj.offer.description;
  clonedElement.querySelector('.popup__photos').innerHTML = '';
  addElementsToBlock(clonedElement.querySelector('.popup__photos'), obj.offer.photos, renderPhoto);
  clonedElement.querySelector('.popup__avatar').src = obj.author.avatar;
  return clonedElement;
}

var pins = getArrayOfMockObjects(8);

activePage();

addElementsToBlock(outerBlock, pins, cloneAndAddElement);

mapBlock.appendChild(cloneAndAddCard(pins[0]));

mapBlock.insertBefore(document.querySelector('.map__card'), mapFilterContainerBlock);
