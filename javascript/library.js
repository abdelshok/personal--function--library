
/**
 * 
 * This file will start off as a single file and as the project and library progresses will become subdivided into different files
 * that group functions of the same type. E.g. functions that solely focus on animations, functions that focus on the sequence of how 
 * animations are done, etc.
 * 
 * 
 */


/**
 * 
 * The functions below are going to be subdivided into two categories. 
 * Ones that are ** inherently ** linked to a certain event and ones that can be used
 * in association to a number of events
 * 
 * Depending on their category, the description of the function prefacing the function itself
 * will have @eventType tag in order to direct the user as to what events they can be associated to
 * 
 * E.g. @handle3DImageRotation function is inherently linked to the @mouseMove event as it tracks the cursor's
 * layerX and layerY positions (it's position in relation to the previously positioned element). 
 * It responds to changes in mouse position and as a result can not be associated to a @mouseover or @mouseout event
 * 
 * Pretty self-explanatory.
 * 
 */

/**
 * 
 * @mouseMove related event handler
 * Tracks the position (layerX and layerY) of the mouse and creates a 3D rotation effect on the element that it is attached to 
 * Accompanied by the @deactivate3DElementRotation below
 */

function handle3DElementRotation (e) {

   /*
    * Get position of mouse cursor with respect to tehj element on mouse over
    */

    const height = this.clientHeight
    const width = this.clientWidth

    const xVal = e.layerX;
    const yVal = e.layerY;

    // Calculate the rotation value along the Y axis. Multiplier is set to 5 to limit the mouse rotationm
    // It can definitely increased to cause a higher rotational effect.

    const yRotation = 5 * ((xVal - width / 2) / width)

    /* Calculate the rotation along the X-axis */
    const xRotation = -5 * ((yVal - height / 2) / height)
    

    /* Generate string for CSS transform property */
    const effectString = `perspective(500px) scale(1.05) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`

    // Note to self: Applying a transition here will trigger the transition duration and delay on every single mouse movement
    // which will in turn result in a poor UI.

    /* Apply the calculated transformation */
    this.style.transform = effectString; // Should be able to access the element if 

}

/**
 * 
 * @mouseout related event handler
 * Attached to mouse out in order to return the element animated by the above function to it's initial state
 * 
 */


function deactivate3DElementRotation (e) {

    this.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)';

}


// Opacity - Related Events


/**
 * 
 * @increaseElementOpacity
 * 
 * @param {*} element: Takes in an object element (usually retrieved through document.getElementByID(elementID), etc.);
 * @param {*} animationDuration
 * @param {*} animationDelay
 */

function increaseElementOpacity(element, animationDuration, animationDelay) {

    element.style.opacity = 1;
    element.style.transition = `opacity ${animationDuration} ease-out ${animationDelay}`;

}

/**
 * 
 * @decreaseElementOpacity
 * 
 * @param {*} element: Takes in an object element (usually retrieved through document.getElementByID(elementID), etc.);
 * @param {*} animationDuration
 * @param {*} animationDelay
 */


function decreaseElementOpacity(element, animationDuration, animationDelay) {

    if (enableLogging === true) {
        console.log('Attempting to decrease element opacity');
    }

    element.style.opacity = 0;
    // element.style.visibility = 'hidden'; // Doesn't tween bettween values 
    element.style.transition = `opacity ${animationDuration} ease-out ${animationDelay}`;

}

// General Purpose

function scrollToTop() {

    // Note: remember that the scrolling smoothness depends on whether you've set up scroll-behavior on the parent element or html tag
    window.scrollTo(0, 0);

}

// Viewport Related Elements

function elementInViewport(elementID) {

    let element = document.getElementById(elementID);
    var bounding = element.getBoundingClientRect();

    if (bounding.top >= 0 && bounding.left >= 0 && bounding.right <= (window.innerWidth || document.documentElement.clientWidth) && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)) {

        if (enableLogging === true) {
            console.log('Element is in the viewport!');
        };

    } else {
        
        if (enableLogging === true) {
            console.log('Element is NOT in the viewport!');
        };

    }
}

// Throttle & Debounce Higher Order Functions

/**
 * 
 * @param {function} callback : Function called by the @throttle
 * @param {integer} limit : Number of milliseconds that need to pass before the throttle function can call the callback
 * 
 * Notes: This is more of a skeleton of how a throttle function is implemented. The details of the @throttle function evidently
 * need to be changed based on the specific goals and requirements of the UX / UI.
 * 
 * E.g. In a previous project, the throttle function needs to do an extra check and make sure that an element appeared on the bottom of
 * the screeng
 */

function throttle (callback, limit) {
    let wait = false;                  // Initially, we're not waiting

    if (!wait) {                   // If we're not waiting
        callback.call();           // Execute users function
        wait = true;               // Prevent future invocations
        setTimeout(function () {   // After a period of time
            wait = false;          // And allow future invocations
        }, limit);
    }
    
}


// TODO: 1. Fix the function, take the variable inglobal scope, etc. Apply naming 
function debounce (func, delay) {

    let inDebounce
    const context = this
    const args = arguments
    clearTimeout(inDebounce)
    inDebounce = setTimeout(() => func.apply(context, args), delay)
    
}

// Debounce & Throttle Article: https://redd.one/blog/debounce-vs-throttle
// Second article: https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf