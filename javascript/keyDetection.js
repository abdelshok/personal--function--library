/**
 * 
 * As the name suggests, will hold functions that will be used for key detection
 * 
 * 
 */

/**
 * 
 * @detectEnterKey
 * 
 * @param {Object} event Passed from the event handler
 * @return {Boolean}
 * 
 */

function detectEnterKey (event) {
    if (event.key === 'Enter' || event.keyCode === 13) {
        return true;
    }
}

// Example in a JS application


document.getElementById(".input").on('keyup', function (e) {

    let enterKeyDetected = detectEnterKey(event);

    if (enterKeyDetected) {
        // Do something
    }
    
});