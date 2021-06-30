/**
 * 
 * 
 * Time Related Functions
 * 
 */


function convertTimeStringToMilliseconds (timeString) {

    let arrayStrings = timeString.split('s');
    let stringOfSeconds = arrayStrings[0];
    let seconds = parseInt(stringOfSeconds)

    return seconds * 1000;

}