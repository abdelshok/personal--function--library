
/**
 * 
 * This file will start off as a single file and as the project and library progresses will become subdivided into different files
 * that group functions of the same type. E.g. functions that solely focus on animations, functions that focus on the sequence of how 
 * animations are done, etc.
 * 
 * 
 */

 
/**
 * 
 * @mouseMove related event handler
 * Tracks the position (layerX and layerY) of the mouse and creates a 3D rotation effect on the element that it is attached to 
 * Accompanied by the @deactivate3DImageRotation below
 */

function handle3DImageRotation (e) {

   /*
    * Get position of mouse cursor with respect to tehj element on mouse over
    */

    const height = this.clientHeight
    const width = this.clientWidth

    const xVal = e.layerX;
    const yVal = e.layerY;

    // Calculate the rotation value along the Y axis. Multiplier is set to 5 to limit the mouse rotationm
    // It can definitely increased to cause a higher rotational effect.

    const yRotation = 5 * ((xVal - width / 2) / width)

    /* Calculate the rotation along the X-axis */
    const xRotation = -5 * ((yVal - height / 2) / height)
    

    /* Generate string for CSS transform property */
    const effectString = `perspective(500px) scale(1.05) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`
    const transitionPropertyString = `transform .2s ease-in`;
    /* Apply the calculated transformation */
    // this.style.transition = transitionPropertyString;
    this.style.transform = effectString; // Should be able to access the element if 

}

/**
 * 
 * @mouseout related event handler
 * Attached to mouse out in order to return the element animated by the above function to it's initial state
 * 
 */


function deactivate3DImageRotation (e) {

    this.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)';

}