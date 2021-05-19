/***
 * 
 * 
 * Consists of function that should be used anytime that we are using 'powerful features', which 
 * are Camera, midi, notifications, geolocation
 * 
 * 'Powerful features' are deemed powerful based on whether or not they require user 'permission' in order
 * to access the feature
 * 
 * 
 */

/***
 * 
 * 
 * Permissions API provides a consistent programmatic way to query the status of API permissions attributed
 * to the current context.
 * 
 * For instance, the Permissions API can be used to determine if permission to access a particular API has been granted or denied.
 * 
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API
 * 
 * 
 */

/***
 * 
 * Helper function that uses the still **experimental** Permissions API
 * Used to track changes in user permissions and set handlers based on changes in user permissions
 * 
 * The one below is a boilerplate
 * 
 */

function trackUserPermissionChanges () {

    // List of all permission names
    const permissionsNames = [
        "geolocation",
        "notifications",
        "push",
        "midi",
        "camera",
        "microphone",
        "speaker",
        "device-info",
        "background-fetch",
        "background-sync",
        "bluetooth",
        "persistent-storage",
        "ambient-light-sensor",
        "accelerometer",
        "gyroscope",
        "magnetometer",
        "clipboard",
        "display-capture",
        "nfc"
    ]

    let permissionName;

    navigator.permissions.query({name: permissionName}).then(response => {

        response.onchange = ((event)=>{

            // detecting if the event is a change
            if (Event.type === 'change'){

                // checking what the new permissionStatus state is
                const newState = event.target.state;

                if (newState === 'denied') {

                    deactivateUIElements();

                } else if (newState === 'granted') {

                    activateUIElements();
                    
                } else {

                    console.log('Thanks for reverting things back to normal')

                };

            }
        })

    })

}

/***
 * 
 * Same as the function above, but focuses on changes in microphone-related permissioins
 * 
 * 
 */

 function trackUserPermissionChanges () {

    navigator.permissions.query({name: 'microphone'}).then(response => {

        response.onchange = ((event)=>{

            // detecting if the event is a change
            if (Event.type === 'change'){

                // checking what the new permissionStatus state is
                const newState = event.target.state;

                if (newState === 'denied') {
                    console.log('why did you decide to block us?')
                } else if (newState === 'granted') {
                    console.log('We will be together forever!')
                } else {
                    console.log('Thanks for reverting things back to normal')
                };

            }
        })

    })

}

/***
 * 
 * Helper Functions to the one above
 * 
 * We'll be tracking changes to the user permissions in order to be able to react to them in some way
 * Most likely, we'll be making some changes to the UI, if the UI previously reflected the state of the API currently being used.
 * In other cases, we might use that opportunity to send messages to a different API, for example, to track how many users have enabled
 * microphone permission.
 * 
 * @example Spotify uses microphone access now in order to, I'm assuming, give song requests. Tracking the change in Permissions would then
 * be useful in order to show that the microphone has been deactivated were the user to do so by revoking all authorizations instead of simply
 * clicking on 'Off'
 * 
 * 
 */

function deactivateUIElements () {

    // Code here

}

function activateUIElements () {

    // Code here

}
