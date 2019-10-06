'use strict';

(function () {

  var loadUrl = 'https://js.dump.academy/keksobooking/data';
  var xhr = new XMLHttpRequest();


  xhr.responseType = 'json';

  function load(onLoad, onError) {
    function onLoadResponse() {
      if (xhr.status === 200) {
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

  window.backend = {
    load: load
  };

})();
