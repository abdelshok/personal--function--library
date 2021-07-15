/***
 * 
 * Function libbrary that converts base64 string back into PNG
 * 
 * 
 */



// Steps
// 1. Take the base 64 string, strip the header
// 2. Use fs to convertit into png


/**
 * 
 * @param {String} base64String Base 64 string returned from our previous function e.g. merge.js
 * @returns The binanry representation of the image with the header 'base64' before it
 * which allows us to then convert it into an image
 * 
 */

let base64Image;

function stripBase64Header (base64String) {

    base64Image = base64String.split(';base64,').pop();

    return base64Image;

}

// Second step

import fs from 'fs';

fs.writeFile('image.png', base64Image, {encoding: 'base64'}, function(err) {
    console.log('File created');
});