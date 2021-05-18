/**
 * 
 * Functions that are related to testing an image's format, content, etc.
 * 
 */


/**
 * 
 * Function below drastically improves rendering time.
 * As opposed to other functions that test for WebP, which are async, 
 * this one is actually a sync function
 * 
 * Works on Safari and Chrome. Firefox support unknown for now.
 * 
 */

function testWebP () {
    const canvas = typeof document === 'object' ? 
    document.createElement('canvas') : {};
    canvas.width = canvas.height = 1;
    return canvas.toDataURL ? canvas.toDataURL('image/webp').indexOf('image/webp') === 5 : false;
}