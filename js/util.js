'use strict';

(function () {


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


  window.util = {
    addElementsToBlock: addElementsToBlock,
    getClonedElement: getClonedElement,
    getLeftAtPage: getLeftAtPage,
    getTopAtPage: getTopAtPage,
    getElementWidth: getElementWidth,
    getElementHeight: getElementHeight,
  };
})();
