// Working Example
// Vanilla js UMD plugin structure (ie 11 compatible)
// CURRENTY UNDER CONSTRUCTION - 7/21/2019

/**
 * ** TODO: **
 * 1. Add additional options
 * 2. Add nice css styling
 * 3. Refactor & optimize for size
 *
 **/

(function(root, factory) {
    var pluginName = 'AlphaListNav';

    if (typeof define === 'function' && define.amd) {
        define([], factory(pluginName));
    } else if (typeof exports === 'object') {
        module.exports = factory(pluginName);
    } else {
        root[pluginName] = factory(pluginName);
    }
})(this, function(pluginName) {
    'use strict';

    var defaults = {
        initLetter: 'A',
        includeAll: false,
        includeNums: false,
    };
    /**
     * Merge defaults with user options
     * @param {Object} defaults Default settings
     * @param {Object} options User options
     */
    var extend = function(target, options) {
        var prop,
            extended = {};
        for (prop in defaults) {
            if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                extended[prop] = defaults[prop];
            }
        }
        for (prop in options) {
            if (Object.prototype.hasOwnProperty.call(options, prop)) {
                extended[prop] = options[prop];
            }
        }
        return extended;
    };

    /**
     * Plugin Object
     * @param  {element}  element  The selector element(s).
     * @param {Object} options User options
     * @constructor
     */
    function Plugin(element, options) {
        this.element = element;
        this.options = extend(defaults, options);
        this.init(); // Initialization Code Here
    }

    /**
     * Helper Functions
     @private
     */
    // create object of list items ordered by each alphabet letter
    var getAlphaObj = function(listItemsArray) {
        const alphaList = listItemsArray.reduce((accum, val) => {
            let letter = val.textContent.charAt(0).toLowerCase();
            if (letter.match(/[0-9]/)) letter = '_';
            if (accum[letter]) {
                accum[letter].push(val);
            } else {
                accum[letter] = [val];
            }
            return accum;
        }, {});
        console.log(alphaList);
        return alphaList;
    };

    // generate new list HTML markup
    var generateNewListHTML = function(alphaObj) {
        const wrapper = document.createElement('div');
        wrapper.id = 'alpha-list';
        wrapper.className = 'alpha-list';
        const newList = Object.keys(alphaObj).map(key => {
            const ul = document.createElement('ul');
            ul.id = key;
            ul.className = 'alpha-list-group';
            alphaObj[key].forEach(node => {
                ul.appendChild(node.cloneNode(true));
            });
            wrapper.appendChild(ul);
        });
        return wrapper;
    };

    // generate alpha navigation bar
    var generateAlphaNav = function(alphaObj, includeNums) {
        const alphaNav = document.createElement('div');
        alphaNav.id = 'alpha-nav';
        alphaNav.className = 'character-container';
        const navChars = getArrayAtoZ();
        if (includeNums) {
            navChars.unshift('0-9');

            console.log(navChars);
        }
        const navigationEntries = navChars.reduce((block, charToAdd) => {
            if (alphaObj[charToAdd.toLowerCase()]) {
                return (
                    block +
                    '<a class="character-element" data-filter="' +
                    charToAdd.toLowerCase() +
                    '" href="#">' +
                    charToAdd +
                    '</a>'
                );
            }
            return block + '<div class="character-element disabled">' + charToAdd + '</div>';
        }, '');
        alphaNav.innerHTML = navigationEntries;
        return alphaNav;
    };

    // generate array of alphebet, a - z
    var getArrayAtoZ = function() {
        return Array.apply(null, { length: 26 }).map((x, i) => String.fromCharCode(65 + i));
    };

    // generate array of nums, 0 - 9
    const getNums0thru9 = function() {
        return Array.from(Array(10).keys());
    };

    /**
     * Plugin prototype
     * @public
     * @constructor
     */
    Plugin.prototype = {
        init: function() {
            // get list parent elem
            let listParent = document.getElementById(this.element);
            if (!listParent) return;
            // get array of list items
            const listItems = Array.prototype.slice.call(listParent.children);
            // sort list into an alphabetical object
            const alphaObj = getAlphaObj(listItems);
            //console.log(alphaObj);
            // generate new list html with sorting markup
            const newListHTML = generateNewListHTML(alphaObj);
            // generate the alpha-nav buttons html
            const alphaNav = generateAlphaNav(alphaObj, this.options.includeNums);
            // Replace the old list with the new alpha-list in the dom
            listParent.parentNode.replaceChild(newListHTML, listParent);
            // get reference to the new alpha-list
            const newListElem = document.getElementById('alpha-list');
            // Add alpha-nav buttons to dom
            newListElem.parentNode.insertBefore(alphaNav, newListElem);
            // get reference to alpha-nav
            const alphaNavElem = document.getElementById('alpha-nav');
            // add 'active' class to initLetter option on init (on navbar and also list)
            alphaNavElem
                .querySelector(`a[data-filter="${this.options.initLetter.toLowerCase()}"]`)
                .classList.add('active');
            document.getElementById(this.options.initLetter.toLowerCase()).classList.add('active');

            // Add event listener to alpha-nav buttons
            alphaNavElem.addEventListener('click', e => {
                e.preventDefault();
                if (!e.target.dataset.filter) return null;
                const letter = e.target.dataset.filter;
                // remove active class from all buttons
                for (let btn of alphaNavElem.children) {
                    btn.classList.remove('active');
                }
                // remove active class from all lists
                for (let ul of newListElem.children) {
                    ul.classList.remove('active');
                }
                // add active class to button clicked
                e.target.classList.add('active');
                // add active class to the list matching the cooresponding clicked letter
                document.getElementById(letter).classList.add('active');
            });
        }, // #! init
        destroy: function() {
            // Remove any event listeners and undo any "init" actions here...
        },
        doSomething: function(someData) {
            console.log(someData);
        }, // #! doSomething
    };
    return Plugin;
});

/**************
    EXAMPLE:
**************/

//// create new Plugin instance
// var alphaNavInstance = new AlphaListNav('elementID', {
//     initLetter: 'A',
//     includeAll: false,
// });

//// access public plugin methods
// alphaNavInstance.doSomething("Doing Something Else")
