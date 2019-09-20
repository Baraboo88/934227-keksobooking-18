'use strict';

var offerTypeList = ['palace', 'flat', 'bungalo'];
var offerCheckinList = ['12:00', '13:00', '14:00'];
var offerCheckoutList = ['12:00', '13:00', '14:00'];
var offerFeaturesList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offerPhotoList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var outerBlock = document.querySelector('.map__pins');
var mapBlock = document.querySelector('.map');
var mapFileterContainerBlock = document.querySelector('.map__filters-container');

var LOCAIION_Y_FROM = 130;
var LOCATION_Y_TO = 630;

var arrayOfObjects = getArrayOfMockObjects(8);

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
  this.y = getRandomNumberFromRange(LOCAIION_Y_FROM, LOCATION_Y_TO);
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
  var templateElement = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var clonedElement = templateElement.cloneNode(true);
  clonedElement.style.left = (obj.location.x - clonedElement.clientWidth / 2) + 'px';
  clonedElement.style.top = (obj.location.y - clonedElement.clientHeight) + 'px';
  clonedElement.firstChild.src = obj.author.avatar;
  clonedElement.firstChild.alt = obj.offer.title;
  return clonedElement;
}

function addElementsToBlock(block, elementsArray, callBackCloneAndAdd) {
  var documentFragment = document.createDocumentFragment();
  elementsArray.forEach(function (element) {
    documentFragment.appendChild(callBackCloneAndAdd(element));
  });
  block.appendChild(documentFragment);
}

function cloneAndAddCard(obj) {
  var templateElement = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var clonedElement = templateElement.cloneNode(true);
  var photosNode = clonedElement.querySelector('.popup__photos');
  var photoNode = clonedElement.querySelector('.popup__photo');
  photosNode.removeChild(photoNode);
  clonedElement.querySelector('.popup__title').textContent = obj.offer.title;
  clonedElement.querySelector('.popup__text--address').textContent = obj.offer.address;
  clonedElement.querySelector('.popup__text--price').textContent = obj.offer.price;
  clonedElement.querySelector('.popup__type').textContent = obj.offer.type;
  clonedElement.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
  clonedElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
  if (!obj.offer.features.includes('wifi')) {
    clonedElement.querySelector('.popup__features').removeChild(clonedElement.querySelector('.popup__feature--wifi'));
  }
  if (!obj.offer.features.includes('dishwasher')) {
    clonedElement.querySelector('.popup__features').removeChild(clonedElement.querySelector('.popup__feature--dishwasher'));
  }
  if (!obj.offer.features.includes('parking')) {
    clonedElement.querySelector('.popup__features').removeChild(clonedElement.querySelector('.popup__feature--parking'));
  }
  if (!obj.offer.features.includes('washer')) {
    clonedElement.querySelector('.popup__features').removeChild(clonedElement.querySelector('.popup__feature--washer'));
  }
  if (!obj.offer.features.includes('elevator')) {
    clonedElement.querySelector('.popup__features').removeChild(clonedElement.querySelector('.popup__feature--elevator'));
  }
  if (!obj.offer.features.includes('conditioner')) {
    clonedElement.querySelector('.popup__features').removeChild(clonedElement.querySelector('.popup__feature--conditioner'));
  }
  clonedElement.querySelector('.popup__description').textContent = obj.offer.description;

  addElementsToBlock(photosNode, obj.offer.photos, function (element) {
    var photoNodeCloned = photoNode.cloneNode(true);
    photoNodeCloned.src = element;
    return photoNodeCloned;
  });
  clonedElement.querySelector('.popup__avatar').src = obj.author.avatar;
  return clonedElement;
}

function addBlockBefore(parentBlock, elementAhead, elementBehind) {
  parentBlock.insertBefore(elementAhead, elementBehind);
}


activePage();

addElementsToBlock(outerBlock, arrayOfObjects, cloneAndAddElement);

addElementsToBlock(mapBlock, arrayOfObjects.slice(0, 1), cloneAndAddCard);

addBlockBefore(mapBlock, mapBlock.lastChild, mapFileterContainerBlock);

