/***
 * 
 * File which will contain all kind of helper functions that can / will be used throughout the application 
 * 
 * e.g. Functions that take an array of IDs, queries the elements and adds a specific class or data-attribute to all of them
 * 
 */

/**
 * 
 * Takes an array of IDs and adds the specified string as a data-attribute to the HTML elements
 * 
 * @param {Array} arrayOfElementIDs Array of IDs of the elements that we are trying to target
 * @param {String} attributeName Name of the attribute that we are trying to add. e.g. If we want 
 * to add the data attribute 'data-splitting', the attributeName should be 'splitting'
 * 
 */

function addAttributeToElements(arrayOfElementIDs, attributeName) {

    let lengthOfArray = arrayOfElementIDs.length;

    for (let i=0; i<lengthOfArray; i++) {

        let currentElementID = arrayOfElementIDs[i];

        let element = document.getElementById(currentElementID);
        
        element.dataset[attributeName] = '';

    }

};

/**
 * 
 * Takes an array of IDs and adds the specified string as a class to the elements
 * 
 * @param {Array} arrayOfElementIDs Array of IDs of the elements that we are trying to target
 * @param {String} className Name of the class that we are trying to add to the aforementioned elements
 * 
 */

function addClassToElements (arrayOfElementIDs, className) {

    let lengthOfArray = arrayOfElementIDs.length;

    for (let i=0; i<lengthOfArray; i++) {

        let currentElementID = arrayOfElementIDs[i];

        let element = document.getElementById(currentElementID);

        element.classList.add(className)

    }

}

/**
 * 
 * @param {String} elementID Name of the element we are trying to target
 * @param {String} event Name of the event that we are trying to react to e.g. 'click', 'start', 'end', 'touchstart', etc. 
 * @param {String} functionToTrigger Name of the event handler
 * 
 */

function addEvent(elementID, event, functionToTrigger) {
    document.getElementById(elementID).addEventListener(event, functionToTrigger);
}

/**
 * 
 * @param {String} elementID Id of the element we are trying to target
 * @param {String} className Name of the class we are trying to add to this element
 * 
 */

function addClass(elementID, className) {
    document.getElementById(elementID).classList.add(className);
}

/**
 * 
 * @param {String} elementID Id of the element we are trying to target
 * @param {String} className Name of the class we are trying to remove from this element
 */

function removeClass(elementID, className) {
    document.getElementById(elementID).classList.remove(className);
}
