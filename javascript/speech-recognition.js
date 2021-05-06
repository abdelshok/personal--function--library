/***
 * 
 * 
 * Boilerplate code that can be used in order to trigger and use Speech Recognition
 * 
 * 
 */

// VOICE_RESULTS_COUNTER sometimes is higher than the actual count because the SpeechRecognition API does not run continuously for some reason 

let VOICE_RESULTS_COUNTER = 0;
let CURRENT_SPEECH_SESSION_COUNTER = 0;

// Array that stores all the commands spoken by the user

let arrayOfUserCommands = [];

// Check if speech recognition API exists on the existing browser

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Variable that will be holding the speech recognition API
// @global : these need to be global variables.

let recognition;
let speechRecognitionListening = false;

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

// Event that triggers the speech to text recognition when the voice control is clicked 

const stopSpeechRecognition = () => {

    recognition.stop();

    // Don't forget to change the boolean to false so the text can appear afterwards
    console.log('@stopSpeechRecognition: Speech recognition listening', speechRecognitionListening);
    console.log('@stopSpeechRecognition: Recognition stopped')

}

const startSpeechRecognition = () => {

    console.log('@startSpeechRecognition: Starting speech recognition')

    if (speechRecognitionListening === false) {

        console.log('@startSpeechRecognition: Toggling the voice directions.');

        toggleVoiceControlDirections();

    }

    recognition.start();

    console.log('@startSpeechRecognition: Listening.')

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

    let finalCommand = arrayOfUserCommands[VOICE_RESULTS_COUNTER];

    console.log('@onSpeechRecognitionResult: var(VOICE_RESULTS_COUNTER):', VOICE_RESULTS_COUNTER);

    // Increment the counter every time so we know what's the index of the last element
    VOICE_RESULTS_COUNTER += 1;

    console.log('@onSpeechRecognitionResult: Final Command Given by User: var(finalCommand)', finalCommand);

    // Only trigger the analysis of the speech when the boolean returns true & if the confidence level is above 85%;
    if (finalResultObject.isFinal === true && finalResultObject.confidence > 0.65) {
        analyzeSpeech(finalCommand);
    };

}

// Add Event listener to speech recognition
// recognition.addEventListener('result', onSpeechRecognitionResult);

// const activateVoiceControl = () => {

//     console.log('Activating voice control');
//     let voiceControlElement = document.getElementById('disabilitiesRelatedText');

//     if (typeof SpeechRecognition === 'undefined') {
//         const voiceControlElement = document.getElementById('voiceControlText');
//         voiceControlElement.innerHTML = 'Voice Control not available in this browser';
//         console.log('Voice control #voiceControl is not available in this browser');
//     } else {


//         // Toggle The Voice Control Directions so the user knows what to say in order to navigate the website
//         // toggleVoiceControlDirections();

//         // let listening  = false;
//         // const recognition = new SpeechRecognition;

//         // const start = () => {

//         // };

//         // const stop = () => {

//         // };



        

//         // voiceControlElement.addEventListener('click', () => {
//         //     listening ? stop() : start();
//         //     listening = !listening;
//         // });

//     }


// }


// Utility Function that extracts the final result from the speech recognition

const extractTextFromSpeech = (event) => {
    
    // Always gets the last result 
    // SpeechRecognition API adds all the results to the same array, so we have to make sure to always get the latest element of the array

    // VOICE_RESULTS_COUNTER = counts the amount of commands given to the SpeechRecognition API. Used to keep track of the different indices of the
    // results so that we can access them every time
    let resultObject = event.results[CURRENT_SPEECH_SESSION_COUNTER][0];

    console.log('@extractTextFromSpeech: Last var(resultObject)', resultObject);

    // Tells you if this event is the final speech given by the user
    let resultObjectFinal = event.results[CURRENT_SPEECH_SESSION_COUNTER].isFinal;

    console.log('@extractTextFromSpeech: Current speech session counter is', CURRENT_SPEECH_SESSION_COUNTER);

    // Increment the counter for the current session
    CURRENT_SPEECH_SESSION_COUNTER += 1;

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

    if (finalResult.isFinal === true ) {

        console.log('@extractTextFromSpeech: Object of speech results: var(finalResult) ', finalResult);

        return finalResult;

    };

    return finalResult;

}

const deactivateVoiceControl = () => {

    // First we reset all the counters to 0, flush out the array, and after that we stop the voice control
    VOICE_RESULTS_COUNTER = 0;
    CURRENT_SPEECH_SESSION_COUNTER = 0;
    arrayOfUserCommands = [];

    stopSpeechRecognition();

    // Second we toggle the class so that it looks like what it is supposed to look with 'Activate Voice Control'
    document.getElementById('directionsVoiceControl').classList.toggle('showing');
    document.getElementById('disabilitiesRelatedText').classList.toggle('showing');

};

// Animation in order to show / hide the voice control for the website

const toggleVoiceControl = () => {

    // Variable used in order to track whether the actual activate voice text is displayed on the user page
    ACTIVATE_VOICE_SHOWN = !ACTIVATE_VOICE_SHOWN;

    let voiceControlElement = document.getElementById('disabilitiesRelatedText');
    voiceControlElement.classList.toggle('showing');

}

// Animation to show the second part of voice control for the website

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
    //     USER_DECIDED_TO_DEACTIVATE = true;
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
        toggleGeneralPageTransition('menuPage');
    } else if (aboutPageFinder != -1) {
        toggleGeneralPageTransition('aboutPage');
    } else if (contactPageFinder != -1) {
        toggleGeneralPageTransition('contactPage');
    } else if (clientPageFinder != -1) {
        toggleGeneralPageTransition('clientPage');
    } else if (homePageFinder != -1 || homePageFinder2 != -1) {
        toggleGeneralPageTransition('homePage');
    } else if (speech === deactivateSpeech) {
        USER_DECIDED_TO_DEACTIVATE = true;
        deactivateVoiceControl();
    }

}
