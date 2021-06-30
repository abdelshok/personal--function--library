// Detect various scroll events


/**
 * 
 * Note:
 * Important to take in account that the two scroll handlers below only work on pages that have 
 * a length longer than the window / screen.
 * In websites that have fixed positioning and that display a page that fits the whole screen, needing
 * transitions  or etc. between pages, these won't work.
 * 
 * This is due to the fact that in those pages, there is no actual scroll, which means that the 
 * pageOffset or boundingRectClient don't really shift, which leads to erroneous results.
 * 
 * 
 */

/**
 * 
 * Note #2:
 * These functions should most likely be used with a @debounce or @throttle function to ensure that they are not
 * called too many times
 * 
 * These functions can be found in the @folder ./library.js
 * 
 * 
 */

// It can be detected by storing the previous scrollTop value and comparing the current
// scrollTop value with it

var lastScrollTop = 0;

// Add the below function to the scroll event
// e.g. element.addEventListener('scroll', functionName, false)

function scrollEventHandler () {

   // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
   let st = window.pageYOffset || document.documentElement.scrollTop; 

   if (st > lastScrollTop){
      // downscroll code
   } else {
      // upscroll code
   }
   lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
   
}


/**
 * 
 * More simple scroll handler than the one above. 
 * 
 */

function alternateSimpleScrollHandler () {

   // detects new state and compares it with the new one
   if ((document.body.getBoundingClientRect()).top > scrollPosition) {
      // console.log('User scrolling up');
   } else {
      // console.log('User scrolling down');
   }

   // saves the new position for iteration.
   scrollPosition = (document.body.getBoundingClientRect()).top;

}


// Global variables would have to look like this

let scrollPosition = 0;
let inDebounce; // Used for the debounce function (as implied by comment above)

/**
 * 
 * 
 * Detects user scroll direction on a page with fixed / absolute length
 * and no inherent scrolling behavior
 * 
 * 
 */

function detectScrollOnFixedPage (event) {

   // Positive deltaY value = user is scrolling down
   // Negative deltaY value = user is crolling up
   let { deltaY } = event;

   let delay = 500; // Delay can obviously be changed to be longer

   debounce(detectUserScrollDirection(deltaY), delay);


}

function detectUserScrollDirection (deltaValue) {

   if (deltaValue < 0) {
      scrollPosition = -1;
   } else {
      scrollPosition = 1;
   }

}