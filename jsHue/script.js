var hue = jsHue();
var bridge;
var user = bridge.user("iC9CWPlzRsdwZLme1gpYrdJp7hAgeCf5BxHvs9aB");
var lights;

function setup(){
    if (bridge == null){
        document.getElementById("setup-info").innerHTML = "Could not find Phillips Hue bridge";
        discoverBridges();
    }
    if(bridge){ 
        document.getElementById("setup-info").innerHTML = "Bridge found at IP address " + bridge.internalipaddress +"<br> Please press button on Bridge";
        createUser();
    }
    if (getCookie("username")){        
        user = bridge.user(getCookie("username"));
        document.getElementById("setup-info").innerHTML = "Web App is already set up!";
    }
    if(user == null) {
       window.setTimeout(setup, 100); /* this checks if we have a user every 100 milliseconds*/
    }
}

function findLights(){
    user.getLights().then(l => {
        console.log("Lights Found:", l);
        lights = l;
        displayLights();
    })
}

function displayLights(){
    Object.keys(lights).forEach(l => {
       var lightDiv = document.createElement("div"); 
        lightDiv.id = "light"+l;
        lightDiv.innerHTML = lights[l].name;
        document.getElementById("lightsConfig").appendChild(lightDiv);
    });
}




function discoverBridges(){
    hue.discover().then(bridges => {
        if(bridges.length === 0) {
            console.log('No bridges found. :(');
        }
        else {
            bridges.forEach(b => console.log('Bridge found at IP address %s.', b.internalipaddress));
            bridge = hue.bridge(bridges[0].internalipaddress);
        }
    }).catch(e => console.log('Error finding bridges', e));
}

function createUser(){
    //var bridge = hue.bridge('192.168.1.2');

    // create user account (requires link button to be pressed)
    bridge.createUser('myApp#testdevice').then(data => {
        // extract bridge-generated username from returned data
        var username = data[0].success.username;
        setCookie("username", username, 500);

        console.log('New username:', username);
        document.getElementById("setup-info").innerHTML = "Web App is set up!";

        // instantiate user object with username
        user = bridge.user(username);
    }).catch(e => console.log('Error creating user', e));
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}