/***
 * 
 * 
 * Boilerplate code that can be used in order to trigger and use Speech Recognition
 * 
 * 
 */

/*
 * Voice Control Area 
 */

/**
 * 
 * CONSTANTS
 * 
 **/

 * CONSTANTS
 */

// Reminder: JS naming convention --> global JS variable @ top of file, camelCase if mutable, UPPERCASE if immutable

let userDecidedToDeactivate = false;

// voiceResultsCounter sometimes is higher than the actual count because the SpeechRecognition API does not run continuously for some reason 
let voiceResultsCounter = 0;
let currentSpeechSessionCounter = 0;

// Array that stores all the commands spoken by the user
let arrayOfUserCommands = [];

// Check if speech recognition API exists on the existing browser

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Variable that will be holding the speech recognition API
// @global : these need to be global variables.

let recognition;
let speechRecognitionListening = false;// Check if speech recognition API exists on the existing browser

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Variable that will be holding the speech recognition API
// @global : these need to be global variables.

let recognition;
let speechRecognitionListening = false;

/**
 * 
 * END OF CONSTANTS
 * 
 **/ 

const triggerEndOfSpeechRecognition = () => {

    // We reset it to 0 so that next time the user actually talks to the speech recognition API we know which index we're at
    // and where to get the latest actual command given

    if (enableLogging === true) {
        console.log('Speech recognition service has disconnected successfully');
        console.log('DID USER DECIDE TO DEACTIVATE', userDecidedToDeactivate);
    }

    currentSpeechSessionCounter = 0;

    if (userDecidedToDeactivate === false) {
        // Restart speech recognition
        speechRecognitionListening = true;
        startSpeechRecognition();
    } else if (userDecidedToDeactivate === true) {
        speechRecognitionListening = true; 
    }

    // Reset the constant above to false so that the user can click again
    userDecidedToDeactivate = false;

}

const triggerStartOfSpeechRecognition = () => {

    if (enableLogging === true) {
        console.log('Speech recognition service has started successfully');
    }

}


// If it is not undefined, we set all the event listeners in order to trigger the speech recognition
// In order to do so, we need 
if (typeof SpeechRecognition !== 'undefined') {
    
    console.log('Speech Recognition API is compatible with this browser')

    recognition = new SpeechRecognition;
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.addEventListener('end', triggerEndOfSpeechRecognition)
    recognition.addEventListener('start', triggerStartOfSpeechRecognition)

} else if (typeof SpeechRecognition === 'undefined') {

    const voiceControlElement = document.getElementById('voice--control--text');
    voiceControlElement.innerHTML = 'Voice Control not available in this browser';

    console.log('Voice control #voiceControl is not available in this browser');

}

/**
 * 
 * Events attached to the element triggering / stopping the speech recognition API
 *
 */

// Step 2.A : Honestly, do I really need to explain this one?

const startSpeechRecognition = () => {

    console.log('@startSpeechRecognition: Starting speech recognition')

    // Use this conditional in order to change the actual directions of the element 
    // Show the different directions the user can give to the analyzer
    if (speechRecognitionListening === false) {

        console.log('@startSpeechRecognition: Toggling the voice directions.');

        toggleVoiceControlDirections();

    }

    // Starts the analyzer
    recognition.start();
    
    console.log('@startSpeechRecognition: Listening.')

}

// Step 2.B : If the element toggling speech recognition is active then it will 
// As the name suggests

const stopSpeechRecognition = () => {

    recognition.stop();

    // Don't forget to change the boolean to false so the text can appear afterwards
    console.log('@stopSpeechRecognition: Speech recognition listening', speechRecognitionListening);
    console.log('@stopSpeechRecognition: Recognition stopped')

}


const onSpeechRecognitionResult = (event) => {

    console.log('@onSpeechRecognitionResult: Event of results of recognition is', event);

    // Function returns an object that has the transcript of the user's speech, a confidence percentage of how accurate it is, and a boolean isFinal that 
    // indicates whether it is the last sentence mentioned by the user
    let finalResultObject = extractTextFromSpeech(event);

    // We push the object that shows the user command into an array in order to always be able to track all of the previous commands.
    // The SpeechRecognition API returns an array of objects continuously, constantly adding to the next index the new result, so we initially
    // used a counter in order to track how many commands were given. But the SpeechRecognition API also goes to sleep after a certain period (read seconds)
    // of inactivity, which means that it'll be easier for us to track all the commands through an array
    arrayOfUserCommands.push(finalResultObject);

    console.log('@onSpeechRecognitionResult: var(arrayOfUserCommands)', arrayOfUserCommands);

    // After we get the last speech string detected by the Speech Recognition API, we add it to the var(arrayOfUserCommands) <Array>. Since we are always tracking
    // through the counter how many directions were given, we are able to always access the last one - although, now that I think about it, we could simply access
    // by directly going for the last index [-1]
    let finalCommand = arrayOfUserCommands[voiceResultsCounter];

    console.log('@onSpeechRecognitionResult: var(voiceResultsCounter):', voiceResultsCounter);

    // Increment the counter every time so we know what's the index of the last element
    voiceResultsCounter += 1;

    console.log('@onSpeechRecognitionResult: Final Command Given by User: var(finalCommand)', finalCommand);

    // Only trigger the analysis of the speech when the boolean returns true & if the confidence level is above 85%;
    if (finalResultObject.isFinal === true && finalResultObject.confidence > 0.65) {

        // This function looks to see if there is specific commands inside of the last direction given
        analyzeSpeech(finalCommand);

    };

}


/**
 * 
 * @deprecated
 * 
 * Not used anymore within the application, as opposed to the deactivateVoiceControl function, which is still used
 * when the user gives the order to deactivate the Speech Recognition API
 * 
 */

const activateVoiceControl = () => {

    console.log('Activating voice control');
    let voiceControlElement = document.getElementById('disabilitiesRelatedText');

    if (typeof SpeechRecognition === 'undefined') {
        const voiceControlElement = document.getElementById('voiceControlText');
        voiceControlElement.innerHTML = 'Voice Control not available in this browser';
        console.log('Voice control #voiceControl is not available in this browser');
    } else {


        // Toggle The Voice Control Directions so the user knows what to say in order to navigate the website
        // toggleVoiceControlDirections();

        // let listening  = false;
        // const recognition = new SpeechRecognition;

        // const start = () => {

        // };

        // const stop = () => {

        // };

        // voiceControlElement.addEventListener('click', () => {
        //     listening ? stop() : start();
        //     listening = !listening;
        // });

    }


}


/**
 * 
 * Utility Function that extracts the final result from the speech recognition
 * Called in @onSpeechRecognitionResult - which is the callback associated with the 'result'
 * event of the Speech Recognition API
 * 
 * @return {Object} finalResult object with three properties: 1. the actual final speech 2. the confidence the analyzer has in it's own accuracy
 * and 3. whether or not the speech / string given is the final one  
 * 
 * */ 

const extractTextFromSpeech = (event) => {
    
    // Always gets the last result 
    // SpeechRecognition API adds all the results to the same array, so we have to make sure to always get the latest element of the array

    // voiceResultsCounter = counts the amount of commands given to the SpeechRecognition API. Used to keep track of the different indices of the
    // results so that we can access them every time
    let resultObject = event.results[currentSpeechSessionCounter][0];

    console.log('@extractTextFromSpeech: Last var(resultObject)', resultObject);

    // Tells you if this object / event is the final speech / directions given by the user
    let resultObjectFinal = event.results[currentSpeechSessionCounter].isFinal;

    console.log('@extractTextFromSpeech: Current speech session counter is', currentSpeechSessionCounter);

    // Increment the counter for the current session
    currentSpeechSessionCounter += 1;

    console.log('@extractTextFromSpeech: Result object is: var(resultObject) ', resultObject);

    let finalResult = {
        speech: resultObject.transcript,
        confidence: resultObject.confidence,
        isFinal: resultObjectFinal,
    }

    console.log('@extractTextFromSpeech: var(finalResult)', finalResult)
    console.log('@extractTextFromSpeech: Analyzing presence of string through index')

    const { speech } = finalResult;

    let isStringPresent = speech.indexOf('deactivate voice control');

    console.log('@extractTextFromSpeech: Is string present within speech', isStringPresent);

    // If the last analyzed speech is the final one decided by the analyzer, we return it. 
    // We don't return any object if Speech Recognition API has not deemed it.
    if (finalResult.isFinal === true ) {

        console.log('@extractTextFromSpeech: Object of speech results: var(finalResult) ', finalResult);
        return finalResult;

    };

    return finalResult;

};

const deactivateVoiceControl = () => {

    // First we reset all the counters to 0, flush out the array, and after that we stop the voice control
    voiceResultsCounter = 0;
    currentSpeechSessionCounter = 0;
    arrayOfUserCommands = [];

    stopSpeechRecognition();

    // Second we toggle the class so that it looks like what it is supposed to look with 'Activate Voice Control'
    // document.getElementById('directionsVoiceControl').classList.toggle('showing');
    // document.getElementById('disabilitiesRelatedText').classList.toggle('showing');

    // Toggle the HTML elements

};

// Animation in order to show / hide the voice control for the website
// HTML / CSS event related functions

const toggleVoiceControl = () => {

    // Variable used in order to track whether the actual activate voice text is displayed on the user page
    ACTIVATE_VOICE_SHOWN = !ACTIVATE_VOICE_SHOWN;

    let voiceControlElement = document.getElementById('disabilitiesRelatedText');
    voiceControlElement.classList.toggle('showing');

};

// Animation to show the directions that can be used to control the website 

const toggleVoiceControlDirections = () => {

    // Variable used to track whether the directions are displayed
    DIRECTIONS_VOICE_SHOWN = !DIRECTIONS_VOICE_SHOWN;

    // First we hide the element that says 'Activate Voice Control'
    let voiceControlElement = document.getElementById('disabilitiesRelatedText');
    voiceControlElement.classList.toggle('showing');

    // Second we show the element that gives the user directions as to how to use voice control
    let directionsVoiceControlElement = document.getElementById('directionsVoiceControl');
    directionsVoiceControlElement.classList.toggle('showing');

};


/***
 * 
 * Utility function that tracks to see whether certain keywords are present in the last speech string retrieved by the Speech Recogition
 * API, and in turn triggers certain events within the web page
 * 
 * @param {speechResultObject} : Contains three properties, the most important one of which is the speech string representing the user's 
 * last command
 * 
 * @return {Void}
 * 
 * 
 */
const analyzeSpeech = (speechResultObject) => {

    console.log('@analyzeSpeech: About to analyzes speech');
    console.log('@analyzeSpeech: Object outputted from analyzer is', speechResultObject);    

    let { speech } = speechResultObject;

    speech = speech.toLowerCase();
    speech = speech.trim();

    console.log('@analyzeSpeech: var(Speech) extracted is', speech);

    const mainMenuSpeech = 'go to main menu';
    const mainMenuSpeech2 = 'main menu';
    const mainMenuSpeech3 = 'mainmenu';
    const mainMenuSpeech4 = 'go to mainmenu';
    const mainMenuSpeech5 = 'go back to main menu';

    const aboutPageSpeech = 'go to about page';
    const aboutPageSpeech2 = 'go to aboutpage';
    const aboutPageSpeech3 = 'about page';
    const aboutPageSpeech4 = 'aboutpage';
    const aboutPageSpeech5 = 'go back to about page';

    const contactPageSpeech = 'go to contact page';
    const contactPageSpeech2 = 'go to contactpage';
    const contactPageSpeech3 = 'contact page';
    const contactPageSpeech4 = 'contactpage';
    const contactPageSpeech5 = 'go back to contact page';

    const clientPageSpeech = 'go to client page';
    const clientPageSpeech2 = 'go to clientpage';
    const clientPageSpeech3 = 'client page';
    const clientPageSpeech4 = 'clientpage';
    const clientPageSpeech5 = 'go back to client page';

    const homePageSpeech = 'go to home page';
    const homePageSpeech2 = 'go to homepage';
    const homePageSpeech3 = 'homepage';
    const homePageSpeech4 = 'home page';
    const homePageSpeech5 = 'go back to home page';

    const deactivateSpeech = 'deactivate voice control';
    const deactivateSpeech2 = 'Deactivate voice control';
    const deactivateSpeech3 = 'deactivate voicecontrol';

    // if (speech === mainMenuSpeech || speech === mainMenuSpeech2 || speech === mainMenuSpeech3 || speech === mainMenuSpeech4 || speech === mainMenuSpeech5) {
    //     toggleMenuAnimation();
    // } else if (speech === aboutPageSpeech || speech === aboutPageSpeech2 || speech === aboutPageSpeech3 || speech === aboutPageSpeech4 || speech === aboutPageSpeech5) {
    //     toggleGeneralPageTransition('aboutPage');
    // } else if (speech === contactPageSpeech || speech === contactPageSpeech2 || speech === contactPageSpeech3 || speech === contactPageSpeech4 || speech === contactPageSpeech5) {
    //     toggleGeneralPageTransition('contactPage');
    // } else if (speech === clientPageSpeech || speech === clientPageSpeech2 || speech === clientPageSpeech3 || speech === clientPageSpeech4 || speech === clientPageSpeech5) {
    //     toggleGeneralPageTransition('clientPage');
    // } else if (speech === homePageSpeech || speech === homePageSpeech2 || speech === homePageSpeech3 || speech === homePageSpeech4 || speech === homePageSpeech5) {
    //     toggleMenuAnimation();
    // } else if (speech === deactivateSpeech || speech === deactivateSpeech2 || speech === deactivateSpeech3) {
    //     // By switching this to true, we prevent it from starting again automatically
    //     userDecidedToDeactivate = true;
    //     deactivateVoiceControl();
    // }

    let mainMenuFinder = speech.indexOf('main menu');
    let aboutPageFinder = speech.indexOf('about page');
    let contactPageFinder = speech.indexOf('contact page');
    let clientPageFinder = speech.indexOf('client page');
    let homePageFinder = speech.indexOf('home page');
    let homePageFinder2 = speech.indexOf('homepage');

    console.log('Main Menu Finder', mainMenuFinder);
    console.log('About Page Finder', aboutPageFinder);
    console.log('Contact Page Finder', contactPageFinder);
    console.log('Client Page Finder', clientPageFinder);
    console.log('Home Page 1 Finder', homePageFinder);
    console.log('Home Page 2 Finder', homePageFinder2);
    
    // Replace @toggleGeneralPageTransition with whichever function is used to transition / switch between pages
    // Note: If any of these values is ≠ than 1, then the word has been been detected within the speec recognition 
    // analyzer
    if (mainMenuFinder != -1) {
        // Replace any of the one below with the correct event handler - this is just boilerplate

    } else if (aboutPageFinder != -1) {

    } else if (contactPageFinder != -1) {

    } else if (clientPageFinder != -1) {

    } else if (homePageFinder != -1 || homePageFinder2 != -1) {

    } else if (speech === deactivateSpeech) {
        userDecidedToDeactivate = true;
        deactivateVoiceControl();
    }

};


// You have to apply the same logic when you attach the event listeners to whichever element is going to trigger the 
// start of the speech recognition

// Step 1.
document.getElementById(idOfElement).addEventListener('touchstart', () => {

    // Based on whether it is already listening / active or not, we decide to start or stop the speech recognition
    speechRecognitionListening ? stopSpeechRecognition() : startSpeechRecognition();
    speechRecognitionListening = !speechRecognitionListening;

    if (enableLogging === true) {
        console.log('Speech recognition listening', speechRecognitionListening);
    }

}, {passive: true});


// Step 1.5: Attach event listener to the recognition API so that when it gets the results, it actually
// does something with it
// ***Very*** important: 

recognition.addEventListener('result', onSpeechRecognitionResult);
