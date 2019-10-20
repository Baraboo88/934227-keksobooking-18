'use strict';

(function () {
  var OK_STATUS = 200;
  var loadUrl = 'https://js.dump.academy/keksobooking/data';
  var saveUrl = 'https://js.dump.academy/keksobooking';
  var xhr = new XMLHttpRequest();


  xhr.responseType = 'json';

  function load(onLoad, onError) {
    function onLoadResponse() {
      if (xhr.status === OK_STATUS) {
        onLoad(xhr.response);
        xhr.removeEventListener('load', onLoadResponse);
      } else {
        onError();
        xhr.removeEventListener('load', onLoadResponse);
      }

    }

    function onErrorResponse() {
      onError();
    }

    xhr.addEventListener('error', onErrorResponse);
    xhr.addEventListener('load', onLoadResponse);

    xhr.open('GET', loadUrl);
    xhr.send();

  }

  function save(data, onLoad, onError) {

    function onSendResponse() {
      if (xhr.status === OK_STATUS) {
        onLoad();
        xhr.removeEventListener('load', onSendResponse);
      } else {
        onError();
      }
    }

    function onErrorResponse() {
      onError();
    }


    xhr.addEventListener('load', onSendResponse);
    xhr.addEventListener('error', onErrorResponse);
    xhr.open('POST', saveUrl);
    xhr.send(data);
  }

  window.backend = {
    load: load,
    save: save
  };

})();
