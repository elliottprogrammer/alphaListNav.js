# Alphabetical List Navigation Filter - alphaListNav.js

### Filter An HTML List Alphebetically

> **alphaListNav.js** will add an alphebetical navigation bar to all of your lists. Click a letter to quickly filter the list to show items that match that letter. With many different options and features.

This plugin (**alphaListNav.js**) has very similar functionality to [jQuery ListNav](https://github.com/esteinborn/jquery-listnav) but has been re-written without the jQuery dependency. Made with vanilla JavaScript. It can serve as a drop-in replacement, removing the need for jQuery.

<sub>Credit to [Eric Stienborn](https://github.com/esteinborn) for the original [jQuery ListNav](https://github.com/esteinborn/jquery-listnav).</sub>

## Demos & Documentation

(https://elliottprogrammer.github.io/alphaListNav.js/)

#### CodePen example:

(https://codepen.io/melliatto/pen/vwWjjj)

## Installation

#### Add CSS file into `<head>`:

```html
<link rel="stylesheet" href="alphaListNav.css" />
```

#### Add your HTML list markup:

```html
<ul id="myList">
	...
</ul>
```

#### Add the JavaScript before `</body>`:

```html
<script src="alphaListNav.js"></script>
<script>
	const alphaNav = new AlphaListNav(document.getElementById('myList'));
</script>
```

## Options

```js
const alphaNav = new AlphaListNav(document.getElementById('myList'), {
	initHidden: true, // Hide all the list items initially, until you click a letter
	initHiddenText: 'Tap a letter above to view matching items', // // Message to display to users when the initHidden = true. (string or boolean false for no text shown)
	initLetter: '', // On initial page load, start the list filtered on a specific letter. ('a'-'z', '-' for [numbers 0-9], '_' for [other], '*' for [All]) (`initHidden` must be false).
	includeAll: true, // Include the 'ALL' button
	allText: 'All', // set custom text for the ALL button (ie. - "All Items" or "All Movies", or whatever.)
	noMatchText: 'No matching entries', // set custom text for nav items with no content to show
	includeNums: true, // Include numbers '0-9' to filter by
	concatenateNums: true, // Concatinate numbers 0 thu 9 into one button ["0 - 9"]
	includeOther: false, // Include a '...' option to filter non-english characters by
	flagDisabled: true, // Make empty navigation letters disabled and greyed out
	removeDisabled: false, // Remove empty navigation letters
	prefixes: [], // An array of prefixes to ignore, ie ['the', 'a', 'my'] (array of strings and/or RegEx's)
	filterSelector: '', // Set the filter to a CSS selector rather than the first text letter for each item
	showCounts: true, // Show the number of list items that match that letter above the button on mouse hover
	showLetterHeadings: true, // Show the letter heading above the list
	letterHeadingTag: 'h3', // The HTML heading tag used for the letter headings (ie. - 'h1', 'h2', 'h3', etc.)
});
```

### Issues and/or bugs:

If you run into an issue or find a bug with alphaListNav.js, Please let me know!

please click on the **Issues** tab or click [here](https://github.com/elliottprogrammer/alphaListNav.js/issues) to open an issue.

Contributers welcome.

#### Author:

[Bryan Elliott](https://github.com/elliottprogrammer)
