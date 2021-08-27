/**
 * 
 * 
 * This boilerplate contains functions that are used in conjunction with the merge-images npm package
 * which is used in order to merge images together after using the node canvas API
 * 
 * Note For Future Self (NFFS): The merge-images npm package outputs a b64 encoding that represents the image 
 * it just created. That encoding starts with --> 'data:image/png; base64...'
 * 
 * You need to remove the string before 'base64' in order to simply have the image data
 * 
 * 
 */


// Requirements
// merge-images.js


async function mergeImages () {
    
    // Example code.

    let bodyObject = {
        src: body, x: 0, y: 0,
    }

    let mouthObject = {
        src: mouth, x: 0, y: 0, 
    }

    let hairObject = {
        src: hair, x: 0, y: 0,
    }
    
    let clothingObject = {
        src: clothing, x: 0, y: 0,
    }

    let eyesObject = {
        src: eyes, x: 0, y: 0,
    }

    let arrayOfImages = [bodyObject, eyesObject, mouthObject, clothingObject, hairObject]


    mergeImages(arrayOfImages, {
        Canvas: Canvas,
        Image: Image
    })
    .then(b64 => {

    
        base64Image = stripBase64Header(b64);
        // base64Image = b64;

        let filePath = `./folder/filename.png`;

        // Increase counter
        counter += 1;
        
        fs.writeFileSync(filePath, base64Image, {encoding: 'base64'}, async function(err) {

            console.log('File created');

            // After here, the file is created - do what you need to 

        });
    
    });
    
}



/**
 * 
 * Helper function used to format the b64 encoding that we pass to our fs.writeFile() function in order to store
 * the image locally (or another similar function)
 * 
 * @param {String} string Representing the image that was just merged by the merge-images.js API 
 * @returns The string stripped of the header information 
 */


function stripBase64Header (string) {

    let newArray = string.split('base64')
    let firstElement = newArray[0];
    let secondElement = newArray[1];

    // return secondElement;
    return secondElement;

}
