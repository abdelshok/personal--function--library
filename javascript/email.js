/**
 * 
 *
 * Email Related Helper Functions.
 * 
 * e.g. Simple / complicated email validation, etc. 
 *
 * 
 */


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
