// Detect various scroll events

// It can be detected by storing the previous scrollTop value and comparing the current
// scrollTop value with it

var lastScrollTop = 0;

// Add the below function to the scroll event
// e.g. element.addEventListener('scroll', functionName, false)

function scrollEventHandler () {

    // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
    let st = window.pageYOffset || document.documentElement.scrollTop; 

    if (st > lastScrollTop){
       // downscroll code
    } else {
       // upscroll code
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    
}
