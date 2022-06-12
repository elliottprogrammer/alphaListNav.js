(function (root, factory) {
  if (root === undefined && window !== undefined) root = window;
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define([], function () {
      return (root['AlphaListNav'] = factory());
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['AlphaListNav'] = factory();
  }
}(this, function () {

'use strict';
/*! alphaListNav.js - v0.7.2
Build Date: 06-11-2022
Author: [Bryan Elliott] (https://github.com/elliottprogrammer/)
Git Repository: git+https://github.com/elliottprogrammer/alphaListNav.js.git */

/**
 * ** TODO: **
 * 2. Add options
 *    - dont-count:
 *    - Remember last letter cookie?
 *    - onLetterClick function()
 *
 **/

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AlphaListNav = /*#__PURE__*/function () {
  function AlphaListNav(listElem) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, AlphaListNav);

    _defineProperty(this, "init", function () {
      // if first arg is not an HTMLElement, return
      if (!_this.listElem) {
        console.error('The supplied argument must be a HTML DOM element or a valid element id (string)');
        return;
      } // get array of list items


      var listItems = _this._getListItems(_this.listElem); //console.log(listItems);
      // sort list into an alphabetical object


      _this.alphaObj = _this._getAlphaObj(listItems); //console.log(this.alphaObj);
      // generate new list html with sorting markup

      _this.newListHTML = _this._generateNewListHTML(_this.alphaObj); // generate the alpha-nav buttons html

      _this.alphaNav = _this._generateAlphaNav(_this.alphaObj); // Replace the old list with the new alpha-list in the dom

      _this.listElem.parentNode.replaceChild(_this.newListHTML, _this.listElem); // Add alpha-nav buttons to dom


      _this.newListHTML.parentNode.insertBefore(_this.alphaNav, _this.newListHTML);

      _this.initAlphaListNav(_this.newListHTML, _this.alphaNav, _this.alphaObj); // Add event listener to alpha-nav buttons


      _this.alphaNav.addEventListener('click', function (e) {
        // TODO: replace with create selectLetter() function
        e.preventDefault();
        if (!e.target.dataset.filter) return;
        var letter = e.target.dataset.filter; // remove active class from all buttons

        var _iterator = _createForOfIteratorHelper(_this.alphaNav.children),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var btn = _step.value;
            btn.classList.remove('active');
          } // remove active class from all lists

        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        var _iterator2 = _createForOfIteratorHelper(_this.newListHTML.children),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var ul = _step2.value;
            ul.classList.remove('active');
          } // add active class to button clicked

        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        e.target.classList.add('active'); // add active class to the list matching the cooresponding clicked letter

        if (letter === '*') {
          var _iterator3 = _createForOfIteratorHelper(_this.newListHTML.children),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var div = _step3.value;
              if (div.id !== 'no-match') div.classList.add('active');
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        } else {
          _this.newListHTML.querySelector("#".concat(letter.replace(/[-]/, '\\$&'))).classList.add('active');
        }
      }); // Show letter counts


      if (_this.options.showCounts) {
        Array.prototype.slice.call(_this.alphaNav.children).forEach(function (alphaLink) {
          alphaLink.addEventListener('mouseover', function (e) {
            var count = 0;

            if (e.target.dataset.filter) {
              var filter = e.target.dataset.filter;

              if (filter !== 'no-match') {
                if (filter === '*') {
                  count = Object.keys(_this.alphaObj).reduce(function (accum, key) {
                    return accum + _this.alphaObj[key].length;
                  }, 0);
                } else {
                  count = _this.alphaObj[filter].length;
                }
              }
            }

            var countElem = document.createElement('span');
            countElem.className = 'alphaNav-count-elem';
            countElem.style.cssText = "position:absolute;left:0;width:100%;text-align:center;font-size:75%;";
            countElem.textContent = count; // inject into dom, but with no visibility so we can calculate the element height

            countElem.style.visibility = 'none';
            e.target.appendChild(countElem);
            var countElemHeight = countElem.getBoundingClientRect().height; // top position is -count elem height + 3.

            var countTopPos = countElemHeight + 2; // set count elem top position

            countElem.style.top = "-".concat(countTopPos, "px"); // and make visible

            countElem.style.visibility = 'visible';
          });
          alphaLink.addEventListener('mouseout', function (e) {
            e.target.removeChild(e.target.children[0]);
          });
        });
      }
    });

    _defineProperty(this, "_getText", function (elem) {
      var node,
          ret = '',
          i = 0,
          nodeType = elem.nodeType;

      if (!nodeType) {
        // If no nodeType, this is expected to be an array
        while (node = elem[i++]) {
          // Do not traverse comment nodes
          ret += _this._getText(node);
        }
      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        // Use textContent for elements
        if (typeof elem.textContent === 'string') {
          return elem.textContent;
        } else {
          // Traverse its children
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            ret += _this._getText(elem);
          }
        }
      } else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
      }

      return ret;
    });

    _defineProperty(this, "initAlphaListNav", function (newListElem, alphaNavElem, alphaObj) {
      // if initLetter is set, show that letter first
      if (_this.options.initLetter) {
        // if init letter is All(*), show all
        if (_this.options.initLetter === '*' && _this.options.includeAll) {
          alphaNavElem.querySelector("a[data-filter=\"".concat(_this.options.initLetter.toLowerCase(), "\"]")).classList.add('active');
          var allListGroups = newListElem.querySelectorAll('div.alpha-list-wrapper');
          Array.prototype.slice.call(allListGroups).forEach(function (div) {
            return div.classList.add('active');
          }); // else show init letter, if it exists..
        } else if (alphaObj.hasOwnProperty(_this.options.initLetter.toLowerCase())) {
          // TODO: replace with create selectLetter() function
          alphaNavElem.querySelector("a[data-filter=\"".concat(_this.options.initLetter.toLowerCase(), "\"]")).classList.add('active');
          newListElem.querySelector("#".concat(_this.options.initLetter.toLowerCase())).classList.add('active');
        }
      } else {
        // if initHidden set, don't show list
        if (_this.options.initHidden) {
          if (_this.options.initHiddenText) document.getElementById('initText').classList.add('active'); // if includeAll is set, show all list
        } else if (_this.options.includeAll) {
          var _allListGroups = newListElem.querySelectorAll('div.alpha-list-wrapper');

          Array.prototype.slice.call(_allListGroups).forEach(function (div) {
            return div.classList.add('active');
          });
          alphaNavElem.querySelector("a[data-filter=\"*\"]").classList.add('active'); // if none of above, find first letter with with list items, and show that first.
        } else {
          var firstLetter = _this._getArrayAtoZ().find(function (_char) {
            return alphaObj.hasOwnProperty(_char.toLowerCase());
          }).toLowerCase(); // TODO: replace with/create selectLetter() function


          alphaNavElem.querySelector("a[data-filter=\"".concat(firstLetter, "\"]")).classList.add('active');
          document.getElementById(firstLetter).classList.add('active');
        }
      }
    });

    _defineProperty(this, "_getAlphaObj", function (listItemsArray) {
      var alphaList = listItemsArray.reduce(function (accum, val) {
        var text = '';

        if (_this.options.filterSelector) {
          var filterElem = val.querySelector(_this.options.filterSelector);
          text = filterElem ? _this._getText(filterElem) : _this._getText(val);
        } else {
          text = _this._getText(val);
        }

        if (text) {
          // if text first char is (-_*) for some reason, remove it because it will cause problems.
          text.trim().replace(/^[_*-]/, '');
          var letter;

          if (_this.options.prefixes instanceof RegExp) {
            var result;

            if ((result = _this.options.prefixes.exec(text)) !== null) {
              letter = text.charAt(_this.options.prefixes.lastIndex).toLowerCase();
            } else {
              letter = text.charAt(0).toLowerCase();
            }
          } else {
            letter = text.charAt(0).toLowerCase();
          }

          if (letter.match(/[0-9A-Za-z]/)) {
            if (_this.options.concatenateNums) {
              if (letter.match(/[0-9]/)) {
                letter = '_';
              }
            }
          } else {
            letter = '-';
          }

          if (accum[letter]) {
            accum[letter].push(val);
          } else {
            accum[letter] = [val];
          }
        }

        return accum;
      }, {});

      if (_this.options.initHidden) {
        var initHiddenTextLi = document.createElement('li');
        initHiddenTextLi.className = 'init-hidden-text';
        initHiddenTextLi.textContent = _this.options.initHiddenText;
        alphaList['initText'] = [initHiddenTextLi];
      }

      return alphaList;
    });

    _defineProperty(this, "_generateNewListHTML", function (alphaObj) {
      var wrapper = document.createElement('div');
      wrapper.id = 'alpha-list';
      wrapper.className = 'alpha-list';
      var NewList = Object.keys(alphaObj).sort(function (a, b) {
        if (a === '-') return 1;
        if (b === '-') return -1;
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      }).map(function (key) {
        var div = document.createElement('div');
        div.id = key;
        div.className = 'alpha-list-wrapper';

        if (_this.options.showLetterHeadings) {
          var allowedHeadingTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div']; // Sanitize headingTag

          var headingTag = allowedHeadingTags.includes(_this.options.letterHeadingTag) ? _this.options.letterHeadingTag : 'h3';
          var heading = document.createElement(headingTag);
          heading.className = 'alpha-list-heading';
          heading.id = _this._getHeading(key).replace(/\s/g, '');
          heading.textContent = _this._getHeading(key);
          if (heading.textContent) div.appendChild(heading);
        }

        var ul = document.createElement('ul');
        ul.className = 'alpha-list-group';
        alphaObj[key].forEach(function (node) {
          ul.appendChild(node.cloneNode(true));
        });
        div.appendChild(ul);
        wrapper.appendChild(div);
        return div;
      });
      var noMatchDiv = document.createElement('div');
      noMatchDiv.id = 'no-match';
      var noMatchUl = document.createElement('ul');
      noMatchUl.className = 'no-match-group';
      var noMatchLi = document.createElement('li');
      noMatchLi.textContent = _this.options.noMatchText;
      noMatchUl.appendChild(noMatchLi);
      noMatchDiv.appendChild(noMatchUl);
      wrapper.appendChild(noMatchDiv);
      return wrapper;
    });

    _defineProperty(this, "_generateAlphaNav", function (alphaObj) {
      var alphaNav = document.createElement('div');
      alphaNav.id = 'alpha-nav';
      alphaNav.className = 'character-container';

      var abcChars = _this._getArrayAtoZ();

      if (_this.options.includeNums) {
        if (!_this.options.concatenateNums) {
          _this._getArray0to9().reverse().forEach(function (val) {
            return abcChars.unshift(val.toString());
          });
        } else {
          abcChars.unshift('_');
        }
      }

      if (_this.options.includeOther) abcChars.push('-');
      if (_this.options.includeAll) abcChars.unshift('*'); //console.log(abcChars);

      var navigationEntries = abcChars.reduce(function (block, navChar) {
        if (alphaObj[navChar.toLowerCase()]) {
          if (navChar === '_') {
            return block + '<a class="character-element" data-filter="' + navChar.toLowerCase() + '" href="#">0 - 9</a>';
          } else if (navChar === '-') {
            return block + '<a class="character-element" data-filter="' + navChar.toLowerCase() + '" href="#">...</a>';
          } else {
            return block + '<a class="character-element" data-filter="' + navChar.toLowerCase() + '" href="#">' + navChar + '</a>';
          }
        } else if (navChar === '*') {
          return block + '<a class="character-element" data-filter="' + navChar.toLowerCase() + '" href="#">' + _this.options.allText + '</a>';
        }

        if (_this.options.flagDisabled) {
          if (_this.options.removeDisabled) {
            return block;
          }

          if (navChar === '_') {
            return block + '<div class="character-element disabled">0 - 9</div>';
          } else if (navChar === '-') {
            return block + '<div class="character-element disabled">...</div>';
          } else {
            return block + '<div class="character-element disabled">' + navChar + '</div>';
          }
        }

        return block + '<a class="character-element" data-filter="no-match" href="#">' + navChar + '</a>';
      }, '');
      alphaNav.innerHTML = navigationEntries;
      return alphaNav;
    });

    _defineProperty(this, "_getArrayAtoZ", function () {
      return Array.apply(null, {
        length: 26
      }).map(function (x, i) {
        return String.fromCharCode(65 + i);
      });
    });

    _defineProperty(this, "_getArray0to9", function () {
      return Array.apply(null, new Array(10)).map(function (x, i) {
        return i;
      });
    });

    var defaultOptions = {
      initHidden: true,
      initHiddenText: 'Tap a letter above to view matching items',
      // string or boolean false
      initLetter: '',
      includeAll: true,
      allText: 'All',
      noMatchText: 'No matching entries',
      includeNums: true,
      concatenateNums: true,
      // 0 - 9
      includeOther: false,
      flagDisabled: true,
      removeDisabled: false,
      prefixes: [],
      // array of strings and/or RegEx's
      filterSelector: '',
      showCounts: true,
      showLetterHeadings: true,
      letterHeadingTag: 'h3'
    };
    this.listElem = this._isDomElement(listElem) ? listElem : document.getElementById(listElem);
    this.options = _objectSpread(_objectSpread({}, defaultOptions), options);
    this.alphaObj = null;
    this.alphaNav = null;
    this.newListHTML = null; // if there is options.prefixes[], check if any are strings, if so, convert to them to RegEx's

    if (this.options.prefixes.length) {
      var regexes = this.options.prefixes.map(function (val) {
        if (typeof val === 'string') {
          val = val.replace(/[.*+?^${}()|[\]\\]/, '\\$&');
          return val + '\\s';
        }

        if (_typeof(val) === 'object' && val instanceof RegExp) {
          return val.source + '\\s';
        }
      });
      this.options.prefixes = new RegExp(regexes.join('|'), 'gi');
    }

    this.init();
  }

  _createClass(AlphaListNav, [{
    key: "_getListItems",
    value: function _getListItems(listElem) {
      if (!listElem.children.length) return [];
      return Array.prototype.slice.call(listElem.children);
    }
  }, {
    key: "_isDomElement",
    value: function _isDomElement(elem) {
      return (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === 'object' ? elem instanceof HTMLElement //DOM2
      : elem && _typeof(elem) === 'object' && elem !== null && elem.nodeType === 1 && typeof elem.nodeName === 'string';
    } // create object of list items ordered by each alphabet letter

  }, {
    key: "_getHeading",
    value: function _getHeading(key) {
      var headingText = '';

      switch (true) {
        case /^[*]$/.test(key):
          headingText = this.options.allText;
          break;

        case /^[_]$/.test(key):
          headingText = '0 - 9';
          break;

        case /^[-]$/.test(key):
          headingText = 'Others';
          break;

        case /^initText$/.test(key):
          break;

        default:
          headingText = key.toUpperCase();
      }

      return headingText;
    } // generate new list HTML markup

  }]);

  return AlphaListNav;
}();

return AlphaListNav;

}));
