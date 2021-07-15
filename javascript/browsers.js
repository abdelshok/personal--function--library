/**
 * 
 * Browser specific and browser-related functions
 * 
 * 
 */



/**
 * 
 * Set of variables used to detect which browser the platform is on
 * 
 * Note: Using the user agent string is not a reliable method to detect the current browser
 * environment. Remember the browser war history and how all the user agents started intermingling
 * with each other.
 * 
 * The method below uses duck-typing.
 * 
 * Found here @link https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
 * 
 */

// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1 - 79
// Comment by Abdel: Not reliable for Chrome - could be due to the fact that the newer versions are not being checked for.
var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

// Edge (based on chromium) detection
var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);

// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;


var output = 'Detecting browsers by ducktyping:<hr>';
output += 'isFirefox: ' + isFirefox + '<br>';
output += 'isChrome: ' + isChrome + '<br>';
output += 'isSafari: ' + isSafari + '<br>';
output += 'isOpera: ' + isOpera + '<br>';
output += 'isIE: ' + isIE + '<br>';
output += 'isEdge: ' + isEdge + '<br>';
output += 'isEdgeChromium: ' + isEdgeChromium + '<br>';
output += 'isBlink: ' + isBlink + '<br>';
document.body.innerHTML = output;


// Copy / Paste code below in new project

let isOpera,
    isSafari,
    isFirefox,
    isIE,
    isEdge,
    isChrome,
    isEdgeChromium,
    isBlink;

function detectBrowser () {

    isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    
    // Firefox 1.0+
    isFirefox = typeof InstallTrigger !== 'undefined';
    
    // Safari 3.0+ "[object HTMLElementConstructor]" 
    isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
    
    // Internet Explorer 6-11
    isIE = /*@cc_on!@*/false || !!document.documentMode;
    
    // Edge 20+
    isEdge = !isIE && !!window.StyleMedia;
    
    // Chrome 1 - 79
    isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    
    // Edge (based on chromium) detection
    isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);
    
    // Blink engine detection
    isBlink = (isChrome || isOpera) && !!window.CSS;

}
