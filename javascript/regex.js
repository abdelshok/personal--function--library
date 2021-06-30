/***
 * 
 * 
 * Regex Validation Functions
 * 
 * 
 */



/**
 * 
 * @param {String} ipaddress IP address needed to be validated
 * @returns Boolean that tells us whether it's a valid IP address
 * 
 */

function validateIPAddress(ipaddress) {  
if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {  
    return (true)  
}  
alert("You have entered an invalid IP address!")  
return (false)  
}  


/**
 * 
 * 
 * @param {String} string 
 * @returns 
 */
function checkIfStringOnlyContainsNumbers (string) {

    if (/^[0-9]*$)/.test(string)) {
        return true;
    } else {
        return false
    }

}


/**
 * 
 * @param {string} phoneNumber String to check against 
 * @returns Boolean confirming whether it is a validate phone number
 */
function validateUSPhoneNumber (phoneNumber) {

    if (/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$)/.test(phoneNumber)) {
        return true;
    } else {
        return false;
    }

}


/**
 * 
 * Simple email validation for strings such as 'anystring@anystring.anystring'
 * 
 * @param {string} email Do I really need to explain.
 * @returns Boolean, specifying whether the email has the right pattern
 * 
 */
 function validateEmail(email) 
 {
     var re = /\S+@\S+\.\S+/;
     return re.test(email);
 } 
 