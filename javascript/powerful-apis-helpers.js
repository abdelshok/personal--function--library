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