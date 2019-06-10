// Working Example
// CURRENTY UNDER CONSTRUCTION - 6/6/2019

/**
* ** TODO: **
* 1. Add Babel transpiling
* 2. Add additional options
* 3. Add nice css styling
* 4. Refactor & optimize for size
* 
**/
class AlphaListNav {
    constructor(elemId, options = {}) {
            
        const defaultOptions = {
            initLetter: 'A',
            includeAll: false,
        }
        
        this.elemId = elemId;
        this.options = {
            ...defaultOptions,
            ...options
        }
            
        this.init();
    }
    
    init = () => {
        // get list parent elem
        let listParent = document.getElementById(this.elemId);
        if (!listParent) return;
        // get array of list items
        const listItems = Array.prototype.slice.call(listParent.children);
        // sort list into an alphabetical object
        const alphaObj = this._getAlphaObj(listItems);
        //console.log(alphaList);
        // generate new list html with sorting markup
        const newListHTML = this._generateNewListHTML(alphaObj);
        // generate the alpha-nav buttons html
        const alphaNav = this._generateAlphaNav(alphaObj);
        // Replace the old list with the new alpha-list in the dom
        listParent.parentNode.replaceChild(newListHTML, listParent);
        // get reference to the new alpha-list
        const newListElem = document.getElementById('alpha-list');
        // Add alpha-nav buttons to dom
        newListElem.parentNode.insertBefore(alphaNav, newListElem);
        // get reference to alpha-nav
        const alphaNavElem = document.getElementById('alpha-nav');
        // add 'active' class to initLetter option on init
        document.getElementById(this.options.initLetter.toUpperCase()).classList.add('active');
        
        // Add event listener to alpha-nav buttons
        alphaNavElem.addEventListener('click', e => {
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
    }
    
    // create object of list items ordered by each alphabet letter
    _getAlphaObj = (listItemsArray) => {
        const alphaList = listItemsArray.reduce((accum, val) => {
            const letter = val.textContent.charAt(0);
            if (accum[letter]) {
                accum[letter].push(val)
            } else {
                accum[letter] = [val];
            }
            return accum;
        }, {});
        return {...alphaList};
    }
    
    // generate new list HTML markup
    _generateNewListHTML = (alphaObj) => {
        const wrapper = document.createElement('div');
        wrapper.id = 'alpha-list';
        wrapper.className = 'alpha-list';
        const newList = Object.keys(alphaObj).map((key) => {
        const ul = document.createElement('ul');
        ul.id = key;
        ul.className = 'alpha-list-group';
        alphaObj[key].forEach(node => {
                ul.appendChild(node.cloneNode(true));
            });
         wrapper.appendChild(ul);
        });
        return wrapper;
    }
    
    _generateAlphaNav = (alphaObj) => {
        const alphaNav = document.createElement('div');
        alphaNav.id = 'alpha-nav';
        alphaNav.className = 'character-container';
        const abcChars = this._getArrayAtoZ();
        const navigationEntries = abcChars.reduce((block, charToAdd) => { 
            if (alphaObj[charToAdd]) {
               return block + "<button class='character-element' data-filter='" + charToAdd + "'>" + charToAdd + "</button>";  
            }
           return block + "<button class='character-element inactive' data-filter='" + charToAdd + "' disabled>" + charToAdd + "</button>"; 
        }, '');
        alphaNav.innerHTML = navigationEntries;
        return alphaNav;
    }
    
    // generate array of alphebet, a - z
    _getArrayAtoZ = () => {
      return Array 
         .apply(null, {length: 26}) 
         .map((x, i) => String.fromCharCode(65 + i));
    }
        
}