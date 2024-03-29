'use strict';

(function () {

  var ESC_CODE = 27;

  var DEBOUNCE_INTERVAL = 500; // ms

  var lastTimeout;

  function debounce(cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);

    }
    lastTimeout = setTimeout(cb, DEBOUNCE_INTERVAL);

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

  function onErrorLoadSave() {
    var mainElement = document.querySelector('main');

    if (mainElement.contains(document.querySelector('.error'))) {
      mainElement.removeChild(document.querySelector('.error'));
    }
    var clonedElement = window.util.getClonedElement('#error', '.error');

    function closeErrorMsg() {
      var errorElement = document.querySelector('.error');
      errorElement.parentNode.removeChild(errorElement);
    }

    function onClickError() {
      closeErrorMsg();
      document.removeEventListener('click', onClickError);
      document.removeEventListener('keydown', onKeydownError);
    }

    function onKeydownError(evt) {
      if (evt.keyCode === ESC_CODE) {
        closeErrorMsg();
        document.removeEventListener('click', onClickError);
        document.removeEventListener('keydown', onKeydownError);
      }
    }

    mainElement.appendChild(clonedElement);
    document.querySelector('.error__button').addEventListener('click', onClickError);
    document.addEventListener('click', onClickError);
    document.addEventListener('keydown', onKeydownError);
  }

  window.util = {
    addElementsToBlock: addElementsToBlock,
    getClonedElement: getClonedElement,
    getLeftAtPage: getLeftAtPage,
    getTopAtPage: getTopAtPage,
    getElementWidth: getElementWidth,
    getElementHeight: getElementHeight,
    onErrorLoadSave: onErrorLoadSave,
    debounce: debounce
  };
})();
