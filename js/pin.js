'use strict';

(function () {
  var LOCATION_Y_FROM = 130;
  var LOCATION_Y_TO = 630;
  var offerPhotoList = window.data.offerPhotoList;
  var offerFeaturesList = window.data.offerFeaturesList;
  var offerTypeList = window.data.offerTypeList;
  var offerCheckinList = window.data.offerCheckinList;
  var offerCheckoutList = window.data.offerCheckoutList;
  var mapPins = document.querySelector('.map__pins');

  function getRandom(number) {
    return Math.floor(Math.random() * number);
  }

  function shuffleArray(array) {
    for (var k = array.length - 1; k > 0; k--) {
      var randomIndex = getRandom(k + 1);
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
    this.x = getRandomNumberFromRange(0, mapPins.clientWidth);
    this.y = getRandomNumberFromRange(LOCATION_Y_FROM, LOCATION_Y_TO);
  }

  function MockObject(number) {
    this.author = new Author(number);
    this.location = new LocationObject();
    this.offer = new Offer(this.location);
  }

  window.getMockObject = function (number) {
    return new MockObject(number);
  };


})();
