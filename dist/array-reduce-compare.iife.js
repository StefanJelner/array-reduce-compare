
/**
 * @license
 * author: Stefan Jelner
 * array-reduce-compare v0.0.1
 * Released under the ISC license.
 * 
 * See git+https://github.com/StefanJelner/array-reduce-compare.git
 */

var reduceCompare = (function () {
  'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function reduceCompare(arr, cb, cmp, init) {
    if (_typeof(arr) !== 'object' || !Array.isArray(arr)) {
      throw new Error('First argument of reduceCompare() must be an array.');
    }

    if (typeof cb !== 'function') {
      throw new Error('Second argument of reduceCompare() must be a function.');
    }

    if (typeof cmp !== 'function') {
      throw new Error('Third argument of reduceCompare() must be a function.');
    }

    if (arr.length === 0 && typeof init === 'undefined') {
      throw new Error('Fourth argument of reduceCompare() cannot be undefined if the first argument is an empty array.');
    }

    return function _(acc, i) {
      return i < arr.length && cmp(acc, arr[i], i, arr) === true ? _(cb(acc, arr[i], i, arr), i + 1) : acc;
    }(init !== null && init !== void 0 ? init : arr[0], 0);
  }

  return reduceCompare;

})();
