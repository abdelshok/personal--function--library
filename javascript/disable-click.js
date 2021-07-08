/**
    * Disable right-click of mouse, F12 key, and save key combinations on page
    * By Arthur Gareginyan (https://www.arthurgareginyan.com)
    * For full source code, visit https://mycyberuniverse.com
*/


window.onload = function() {
    document.addEventListener("contextmenu", contextMenuHandler, false);
    document.addEventListener("keydown", keyDownHandler, false);
  };

function contextMenuHandler (e) {
    e.preventDefault();
}

function keyDownHandler (e) {
    // "I" key
    if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
        disabledEvent(e);
    }
    // "J" key
    if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
        disabledEvent(e);
    }
    // "S" key + macOS
    if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        disabledEvent(e);
    }
    // "U" key
    if (e.ctrlKey && e.keyCode == 85) {
        disabledEvent(e);
    }
    // "F12" key
    if (event.keyCode == 123) {
        disabledEvent(e);
    }
}

function disabledEvent(e){
    if (e.stopPropagation){
        e.stopPropagation();
    } else if (window.event){
        window.event.cancelBubble = true;
    }
    e.preventDefault();
    return false;
}