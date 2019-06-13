"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.reduce");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.filter");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Working Example
// CURRENTY UNDER CONSTRUCTION - 6/10/2019

/**
* ** TODO: **
* 1. Add Babel transpiling  // DONE
* 2. Add additional options
* 3. Add nice css styling
* 4. Refactor & optimize for size
* 
**/
include('core-js/stable');

var AlphaListNav = function AlphaListNav(elemId) {
  var _this = this;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  _classCallCheck(this, AlphaListNav);

  this.init = function () {
    // get list parent elem
    var listParent = document.getElementById(_this.elemId);
    if (!listParent) return; // get array of list items

    var listItems = Array.prototype.slice.call(listParent.children); // sort list into an alphabetical object

    var alphaObj = _this._getAlphaObj(listItems); //console.log(alphaList);
    // generate new list html with sorting markup


    var newListHTML = _this._generateNewListHTML(alphaObj); // generate the alpha-nav buttons html


    var alphaNav = _this._generateAlphaNav(alphaObj); // Replace the old list with the new alpha-list in the dom


    listParent.parentNode.replaceChild(newListHTML, listParent); // get reference to the new alpha-list

    var newListElem = document.getElementById('alpha-list'); // Add alpha-nav buttons to dom

    newListElem.parentNode.insertBefore(alphaNav, newListElem); // get reference to alpha-nav

    var alphaNavElem = document.getElementById('alpha-nav'); // add 'active' class to initLetter option on init (on navbar and also list)

    alphaNavElem.querySelector("a[data-filter=\"".concat(_this.options.initLetter.toLowerCase(), "\"]")).classList.add('active');
    document.getElementById(_this.options.initLetter.toLowerCase()).classList.add('active'); // Add event listener to alpha-nav buttons

    alphaNavElem.addEventListener('click', function (e) {
      e.preventDefault();
      if (!e.target.dataset.filter) return null;
      var letter = e.target.dataset.filter; // remove active class from all buttons

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = alphaNavElem.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var btn = _step.value;
          btn.classList.remove('active');
        } // remove active class from all lists

      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = newListElem.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var ul = _step2.value;
          ul.classList.remove('active');
        } // add active class to button clicked

      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      e.target.classList.add('active'); // add active class to the list matching the cooresponding clicked letter

      document.getElementById(letter).classList.add('active');
    });
  };

  this._getAlphaObj = function (listItemsArray) {
    var alphaList = listItemsArray.reduce(function (accum, val) {
      var letter = val.textContent.charAt(0).toLowerCase();

      if (accum[letter]) {
        accum[letter].push(val);
      } else {
        accum[letter] = [val];
      }

      return accum;
    }, {});
    return alphaList;
  };

  this._generateNewListHTML = function (alphaObj) {
    var wrapper = document.createElement('div');
    wrapper.id = 'alpha-list';
    wrapper.className = 'alpha-list';
    var newList = Object.keys(alphaObj).map(function (key) {
      var ul = document.createElement('ul');
      ul.id = key;
      ul.className = 'alpha-list-group';
      alphaObj[key].forEach(function (node) {
        ul.appendChild(node.cloneNode(true));
      });
      wrapper.appendChild(ul);
    });
    return wrapper;
  };

  this._generateAlphaNav = function (alphaObj) {
    var alphaNav = document.createElement('div');
    alphaNav.id = 'alpha-nav';
    alphaNav.className = 'character-container';

    var abcChars = _this._getArrayAtoZ();

    var navigationEntries = abcChars.reduce(function (block, charToAdd) {
      if (alphaObj[charToAdd.toLowerCase()]) {
        return block + '<a class="character-element" data-filter="' + charToAdd.toLowerCase() + '" href="#">' + charToAdd + '</a>';
      }

      return block + '<div class="character-element disabled">' + charToAdd + '</div>';
    }, '');
    alphaNav.innerHTML = navigationEntries;
    return alphaNav;
  };

  this._getArrayAtoZ = function () {
    return Array.apply(null, {
      length: 26
    }).map(function (x, i) {
      return String.fromCharCode(65 + i);
    });
  };

  var defaultOptions = {
    initLetter: 'A',
    includeAll: false
  };
  this.elemId = elemId;
  this.options = _objectSpread({}, defaultOptions, options);
  this.init();
};