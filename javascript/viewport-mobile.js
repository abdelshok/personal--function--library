/***
 * 
 * Boilerplate code necessary in order to set the viewport on mobiles easily
 * 
 * 
 */


// Step 1: Set --bodyVH, --vh, in root and give it a value of 100vh

// Step 2: Set the parent element's style to 

.my-element {
    height: 100vh; /* Fallback for browsers that do not support Custom Properties */
    height: calc(var(--bodyVH, 1vh) * 100);
}

// Step 3: In JS code, run the code below

function resizeBodyBH () {

    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--bodyVH', `${vh}px`);

}

// Step 4: In JS Code, add this event listener

// We listen to the resize event
window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

/***
 * 
 * Note / Addendum:
 * 
 * It is important to ensure that all of the elements that are children of the parent element have a height of 100%, which will be calculated dynamically
 * as the user device is resized. If the .child of .my-element has also height set to --bodyVH, then it will initially be set to the calculated --bodyVH
 * but it will not be recalculated.
 * 
 * 
 */