'use strict';

var offerTypeList = ['palace', 'flat', 'bungalo'];
var offerCheckinList = ['12:00', '13:00', '14:00'];
var offerCheckoutList = ['12:00', '13:00', '14:00'];
var offerFeaturesList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offerPhotoList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var parentElement = document.querySelector('.map__pins');

function getRandomElementFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getArrayWithRandomLength(array) {
  var randomValue = Math.floor(Math.random() * array.length);
  randomValue = randomValue === 0 ? 1 : randomValue;

  function getRandomElement() {
    return getRandomElementFromArray(array);
  }

  return new Array(randomValue).fill('').map(getRandomElement);
}

function getRandomNumberFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Author(number) {
  this.avatar = 'img/avatars/user0' + number + '.png';
}

function Offer() {
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
  this.x = getRandomNumberFromRange(0, parentElement.clientWidth);
  this.y = getRandomNumberFromRange(130, 630);
}

function MockObject(number) {
  this.author = new Author(number);
  this.offer = new Offer();
  this.location = new LocationObject();
}

function getArrayOfMockObjects(number) {
  return new Array(number).fill('').map(function (element, index) {
    return new MockObject(index + 1);
  });
}

document.querySelector('.map').classList.remove('map--faded');

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

function addElementsToBlock(block, elementsArray) {
  var documentFragment = document.createDocumentFragment();
  elementsArray.forEach(function (element) {
    documentFragment.appendChild(cloneAndAddElement(element));
  });
  block.appendChild(documentFragment);
}

addElementsToBlock(parentElement, getArrayOfMockObjects(8));
