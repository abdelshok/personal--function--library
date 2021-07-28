/**
 * 
 * Boilerplate code in order to test out FPS of website and animation performance
 * Code includes HTML &* JS directions
 * 
 * 
 */


// Incorporate the line below in the HTML code

<script src="/public/assets/stats.js"></script>


// Add the functions below to the JS code

let stats = new Stats();

const createStats = () => {
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0';
    stats.domElement.style.top = '0';
    return stats;
};

const addStatsToScreen = () => {

    stats = createStats();
    document.body.appendChild(stats.domElement);

}