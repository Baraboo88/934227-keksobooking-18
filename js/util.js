'use strict';

(function () {

  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');

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

  function getLeftAtPage(element) {
    return element.getBoundingClientRect().left - document.querySelector('html').getBoundingClientRect().left;
  }

  function getTopAtPage(element) {
    return element.getBoundingClientRect().top - document.querySelector('html').getBoundingClientRect().top;
  }

  function getElementWidth(selector) {
    return document.querySelector(selector).clientWidth;
  }

  function getElementHeight(selector) {
    return document.querySelector(selector).clientHeight;
  }

  function populateActiveMainPinAddress() {
    var addressField = document.querySelector('#address');
    var x = Math.round(getLeftAtPage(mapPinMain) - getLeftAtPage(mapPins) + (getElementWidth('.map__pin--main') / 2));
    var y = Math.round(getTopAtPage(mapPinMain) - getTopAtPage(mapPins) + getElementHeight('.map__pin--main'));
    addressField.value = x + ', ' + y;
  }

  window.util = {
    addElementsToBlock: addElementsToBlock,
    getClonedElement: getClonedElement,
    getLeftAtPage: getLeftAtPage,
    getTopAtPage: getTopAtPage,
    getElementWidth: getElementWidth,
    getElementHeight: getElementHeight,
    populateActiveMainPinAddress: populateActiveMainPinAddress
  };
})();
