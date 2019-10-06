'use strict';

(function () {
  window.data = {
    roomsCapacityMap: {
      '1': {
        'guests': ['1'],
        'errorText': '1 комната для 1 гостя',
      },
      '2': {
        'guests': ['1', '2'],
        'errorText': '2 комнаты для 1 или 2 гостей',
      },
      '3': {
        'guests': ['1', '2', '3'],
        'errorText': '3 комнаты для 1, 2 или 3 гостей',
      },
      '100': {
        'guests': ['0'],
        'errorText': '100 комнат не для гостей',
      },
    },
    housingTypeMinPriceMap: {
      'bungalo': 0,
      'flat': 1000,
      'house': 5000,
      'palace': 10000,
    },
  };
})();
