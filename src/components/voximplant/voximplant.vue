<template>
	<div>
        <input type="text" v-model="username" placeholder="логин">
        <input type="text" v-model="password" placeholder="пароль">
        <div id="voximplant_container"></div>
        <button type="button" v-on:click="login">Авторизироватся</button>
        <input type="text" v-model="callTo" placeholder="кому звоним">
        <button type="button" v-on:click="createCall">Позвонить</button>
    </div>
</template>

<script>
var VoxImplant = require('voximplant-websdk');

export default {
    data() {  
		return {
            voxApi: VoxImplant.getInstance(),
            currentCall: null,
            username: 'test1',
            callTo: 'test2',
            application_name: 'videocall',
            account_name: 'clinilink',
            password: 'qwe123'
        }
    },
    mounted: function(){
        this.voxApi.addEventListener(VoxImplant.Events.SDKReady, this.onSdkReady);
        this.voxApi.addEventListener(VoxImplant.Events.ConnectionEstablished, this.handleConnectionEstablished);
        this.voxApi.addEventListener(VoxImplant.Events.ConnectionFailed, this.handleConnectionFailed);
        this.voxApi.addEventListener(VoxImplant.Events.ConnectionClosed, this.handleConnectionClosed);
        this.voxApi.addEventListener(VoxImplant.Events.AuthResult, this.onAuthResult);
        this.voxApi.addEventListener(VoxImplant.Events.MicAccessResult, this.onMicAccessResult);
        this.voxApi.addEventListener(VoxImplant.Events.IncomingCall, this.onIncomingCall);
        try {
            this.voxApi.init({
                useRTCOnly: true, // force usage of WebRTC
                micRequired: false, // ask mic/cam access before connection to VoxImplant
                videoSupport: true,  // enable video support
                progressTone: true, // play progress tone
                localVideoContainerId: "voximplant_container", // element id for local video from camera or screen sharing
                remoteVideoContainerId: "voximplant_container"
            });
        } catch(e) {
            console.log(e);
            // showing the message if browser doesn't support WebRTC
            if (e.message == "NO_WEBRTC_SUPPORT") alert("WebRTC support isn't available");
        }
    },
    methods: {
        onSdkReady(){
            console.log("onSDKReady version " + VoxImplant.version);
            console.log("WebRTC supported: " + this.voxApi.isRTCsupported()); 
            this.connect();
        },
        handleConnectionEstablished() {
            console.log('hi');
            if (typeof console != "undefined") console.log("Connected to VoxImplant:" + vox.connected());
        },
        handleConnectionFailed(e) {
            console.log(e);
            if (typeof console != "undefined") console.log("Connection to VoxImplant failed:" + e.message);
        },
        handleConnectionClosed() {
            if (typeof console != "undefined") console.log("Connected to VoxImplant:" + vox.closed());
        },
        onAuthResult(e){
            console.log(e);
            if (e.result) { 
                // Authorized successfully         
             //   dialog.close();
             //   var title = $('.panel-title').html() + ': logged in as ' + username;
             //   $('.panel-title').html(title);
             //   $('#controls').slideDown();
                this.showLocalVideo(true);      
            } else {
                // Wrong username or password
                //if (!$('div.alert.alert-danger').length) $('#authForm').prepend('<div class="alert alert-danger" role="alert">Wrong username or password was specified</div>');
                console.log("Code: "+e.code);
            }
        },
        onMicAccessResult(e) {
            console.log(e);
            //console.log("Mic/Cam access allowed: "+e.result);
            /*if (e.result) {       
                // Access was allowed   
                if (mode == 'webrtc') dialog.close();  
            } else {
                   // Access was denied
                $('div.bootstrap-dialog').addClass('type-danger');
                dialog.setMessage('You have to allow access to your microphone to use the service');
            }*/
        },
        login() {
            console.log(this.username+"@"+this.application_name+"."+this.account_name+".voximplant.com");
            this.voxApi.login(this.username+"@"+this.application_name+"."+this.account_name+".voximplant.com", this.password);
        },
        showLocalVideo(flag) {
            this.voxApi.showLocalVideo(flag);
        },
        createCall() {
            // application_username - app username that will be dialed (with video)
            this.currentCall = this.voxApi.call(this.callTo, true, null, {"X-DirectCall": "true"});
            // add event listeners
            this.currentCall.addEventListener(VoxImplant.CallEvents.Connected, this.onCallConnected);
            this.currentCall.addEventListener(VoxImplant.CallEvents.Disconnected, this.onCallDisconnected);
            this.currentCall.addEventListener(VoxImplant.CallEvents.Failed, this.onCallFailed);
        },
        onIncomingCall(e) {
            console.log(e);
            this.currentCall = e.call;
            // add event listeners
            this.currentCall.addEventListener(VoxImplant.CallEvents.Connected, this.onCallConnected);
            this.currentCall.addEventListener(VoxImplant.CallEvents.Disconnected, this.onCallDisconnected);
            this.currentCall.addEventListener(VoxImplant.CallEvents.Failed, this.onCallFailed);
            // Answer automatically. It's better to show the dialog to let answer/reject the call in real app.
            currentCall.answer();
        },
        onCallConnected(e) {  
            // Start sending video and show incoming video    
            this.voxApi.sendVideo(true);
            this.currentCall.showRemoteVideo(true);
        },
        onCallDisconnected(e) {
            this.currentCall = null;
        },
        onCallFailed(e) {
            console.log(e); // Error code -  e.code, error reason - e.reason
        },
        connect() {
            console.log("Establishing connection...");
            this.voxApi.connect();
            /*if (mode == 'webrtc' && voxAPI.isRTCsupported()) {
                dialog = new BootstrapDialog({
                title: 'Camera/Microphone access',
                message: 'Please click Allow to allow access to your camera and microphone',
                closable: false      
                });
                dialog.open();  
            }*/
        }
    },
    created: function(){
        
        console.log(VoxImplant);
        console.log(this.voxApi);
    }
}
/*
// Create VoxImplant instance
var voxAPI = VoxImplant.getInstance();
// Add event listeners
voxAPI.addEventListener(VoxImplant.Events.SDKReady, onSdkReady);
voxAPI.addEventListener(VoxImplant.Events.ConnectionEstablished, onConnectionEstablished);
voxAPI.addEventListener(VoxImplant.Events.ConnectionFailed, onConnectionFailed);
voxAPI.addEventListener(VoxImplant.Events.ConnectionClosed, onConnectionClosed);
voxAPI.addEventListener(VoxImplant.Events.AuthResult, onAuthResult);
voxAPI.addEventListener(VoxImplant.Events.IncomingCall, onIncomingCall);
voxAPI.addEventListener(VoxImplant.Events.MicAccessResult, onMicAccessResult);
 
// Initialize the SDK
try {
    voxAPI.init({ 
        useRTCOnly: true, // force usage of WebRTC
        micRequired: true, // ask mic/cam access before connection to VoxImplant
        videoSupport: true  // enable video support
    });
} catch(e) {
    // showing the message if browser doesn't support WebRTC
    if (e.message == "NO_WEBRTC_SUPPORT") alert("WebRTC support isn't available");
}
 
// Now we can use SDK functions - establish connection with VoxImplant
function onSdkReady(){        
    voxAPI.connect(); // mic/cam access dialog will be shown after the function call
}
 
// Process mic/cam dialog input result
function onMicAccessResult(e) {
    if (e.result) {
        // access was allowed
    } else {
        // access was denined - no connection will happen
    }
}
 
// Establishing connection with VoxImplant
function onConnectionEstablished() {
    // Authorization - show the dialog for user to let enter username/password and use login function
    // Change application_user, application_name, account_name and application_user_password to your data for testing
    voxAPI.login(application_user+"@"+application_name+"."+account_name+".voximplant.com", application_user_password);
}
 
// Couldn't establish connection with VoxImplant
function onConnectionFailed() {
    // Websockets or UDP connection is unavailable
}
 
// Connection with VoxImplant was closed
function onConnectionClosed() {
    // Can call connect here to reconnect
}
 
function onAuthResult(e) {
    if (e.result) { 
        // authorization was successful - can make/receive calls now
    } else {
        // authorization failed - check e.code to see the error code
    }
}
 
var currentCall = null; // current call
 
// handle incoming call
function onIncomingCall(e) {
    currentCall = e.call;
    // add event listeners
    currentCall.addEventListener(VoxImplant.CallEvents.Connected, onCallConnected);
    currentCall.addEventListener(VoxImplant.CallEvents.Disconnected, onCallDisconnected);
    currentCall.addEventListener(VoxImplant.CallEvents.Failed, onCallFailed);
    // Answer automatically. It's better to show the dialog to let answer/reject the call in real app.
    currentCall.answer();
}
 
// Make outbound call
function createCall() {
    // application_username - app username that will be dialed (with video)
    currentCall = voxAPI.call(application_username, true, null, {"X-DirectCall": "true"});
    // add event listeners
    currentCall.addEventListener(VoxImplant.CallEvents.Connected, onCallConnected);
    currentCall.addEventListener(VoxImplant.CallEvents.Disconnected, onCallDisconnected);
    currentCall.addEventListener(VoxImplant.CallEvents.Failed, onCallFailed);
}
 
// Call connected
function onCallConnected(e) {  
  // Start sending video and show incoming video    
  voxAPI.sendVideo(true);
  currentCall.showRemoteVideo(true);
}
 
// Call disconnected
function onCallDisconnected(e) {
  currentCall = null;
}
 
// Call failed
function onCallFailed(e) {
  // Error code -  e.code, error reason - e.reason
}
*/
</script>