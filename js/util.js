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

  window.util = {
    addElementsToBlock: addElementsToBlock,
    getClonedElement: getClonedElement
  };
})();
