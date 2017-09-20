<template>
	<div>
        <input type="text" v-model="username" placeholder="логин">
        <input type="text" v-model="password" placeholder="пароль">
        <button type="button" v-on:click="loginVox">Авторизация</button>
        <input type="text" v-model="callTo" placeholder="кому звоним">
        <button type="button" v-on:click="createCall">Позвонить</button>
        <div id="call2video_container">
            <div id="local_video_container"></div>
            <div id="remote_video_container"></div>
            <div class="it_remote"></div>
            <button type="button" v-on:click="answerCall">Ответить</button>
            <button type="button" v-on:click="cancelCall">Отклонить</button>
        </div>
    </div>
</template>
<script>
var VoxImplant = require('voximplant-websdk');

export default {
    data() {  
		return {
            voxApi: VoxImplant.getInstance(),
            localvideo: null,
            remotevideo: null,
            currentCall: null,
            username: 'test1',
            callTo: 'test1',
            application_name: 'videocall',
            account_name: 'clinilink',
            password: 'qwe123'
        }
    },
    mounted: function(){
        this.voxApi.addEventListener(VoxImplant.Events.SDKReady, this.onSdkReady);
        this.voxApi.addEventListener(VoxImplant.Events.ConnectionEstablished, this.onConnectionEstablished);
        this.voxApi.addEventListener(VoxImplant.Events.ConnectionFailed, this.onConnectionFailed);
        this.voxApi.addEventListener(VoxImplant.Events.ConnectionClosed, this.onConnectionClosed);
        this.voxApi.addEventListener(VoxImplant.Events.MicAccessResult, this.onMicAccessResult);

        try {
            this.voxApi.init({
                //useRTCOnly: true, // force usage of WebRTC
                micRequired: true, // ask mic/cam access before connection to VoxImplant
                videoSupport: true,  // enable video support
                progressTone: true, // play progress tone
                //localVideoContainerId: "local_video_container", // element id for local video from camera or screen sharing
                //remoteVideoContainerId: "remote_video_container"
            });
        } catch(e) {
            console.log(e);
        }
    },
    methods: {
        onSdkReady(){
            console.log("onSDKReady version " + VoxImplant.version + " WebRTC supported: " + this.voxApi.isRTCsupported());
            if (navigator.webkitGetUserMedia) {
                navigator.webkitGetUserMedia( 
                    // Desired stream parameters
                    { 
                    audio: true,
                    video: true
                    },
                    // Callback if success
                    function(stream) {
                    console.log('Stream:', stream);
                    },
                    // Callback if error
                    function(error) {
                    console.log('Error:', error);
                    }
                );
                } else {
                console.log('navigator.webkitGetUserMedia not supported. Are you using latest Chrome/Chromium?');
                }

            this.voxApi.connect();
        },
        onConnectionEstablished(){
            console.log('ConnectionEstablished!');
            //this.loginVox(); //автоматическа авторизация
        },
        onConnectionFailed(e){
            console.log('ConnectionFailed!');
            console.log(e);
        },
        onConnectionClosed(){
            console.log('is closed!');
        },
        onMicAccessResult(e){
            console.log(e);
        },
        loginVox(){
            this.voxApi.addEventListener(VoxImplant.Events.AuthResult, this.onAuthResult);
            this.voxApi.login(this.username+"@"+this.application_name+"."+this.account_name+".voximplant.com", this.password);
        },
        onAuthResult(e){
            console.log(e);
            if(e.result){
                console.log('is connected succsesful!');
                this.voxApi.addEventListener(VoxImplant.Events.IncomingCall, this.onIncomingCall);
                //this.currentCall = this.voxApi.call('test1');
                /*this.currentCall.addEventListener(VoxImplant.CallEvents.Connected, function () {
                    this.currentCall.addEventListener(VoxImplant.CallEvents.MessageReceived,function(e){
                        if(e.text=="CONNECTED"){
                            document.querySelector('.it_local_video').style.display = "block";
                            document.querySelector('.it_local_video').appendChild(this.localvideo);
                            document.querySelector('.it_connecting').style.display = "none";
                            this.localvideo.style.height = "140px";
                            this.localvideo.style.marginLeft = "-40px";
                            this.localvideo.play();
                            this.remotevideo = document.getElementById(this.currentCall.getVideoElementId());

                            document.querySelector('.it_remote_video').appendChild(this.remotevideo);
                            this.remotevideo.style.height = "100%";
                            this.remotevideo.removeAttribute("height");
                            this.remotevideo.removeAttribute("width");


                            this.remotevideo.play();
                        }
                    });
                });*/
            }else{
                console.log('cant auth!');
            }
        },
        createCall() {
            // application_username - app username that will be dialed (with video)
            this.currentCall = this.voxApi.call(this.callTo, true);
            this.currentCall.addEventListener(VoxImplant.CallEvents.Connected, this.onOutCallConnected);
            
            this.voxApi.showLocalVideo(true);
            
            this.localvideo = document.querySelector('#voximplantlocalvideo');
            //document.querySelector('#local_video_container').appendChild(this.localvideo);
            //this.localvideo.style.height = "60px";
            //this.localvideo.play();
            
            //this.currentCall.addEventListener(VoxImplant.CallEvents.Connected, this.onCallConnected);
            //

            // add event listeners
            /*
            this.currentCall.addEventListener(VoxImplant.CallEvents.Disconnected, this.onCallDisconnected);
            this.currentCall.addEventListener(VoxImplant.CallEvents.Failed, this.onCallFailed);
            this.currentCall.addEventListener(VoxImplant.CallEvents.MediaElementCreated, this.onMediaElement);
            this.currentCall.addEventListener(VoxImplant.CallEvents.LocalVideoStreamAdded, this.onLocalVideoStream);*/
        },
        onOutCallConnected(){
            console.log('call is conected');
            this.currentCall.addEventListener(VoxImplant.CallEvents.MessageReceived, this.onOutMessageReceived);
        },
        onOutMessageReceived(e){
            console.log(e);
            if(e.text=="CONNECTED"){
                
                this.remotevideo = document.getElementById(this.currentCall.getVideoElementId());
                console.log(this.remotevideo);
                document.querySelector('#remote_video_container').appendChild(this.remotevideo);
                this.remotevideo.style.height = "150px";
                this.remotevideo.play();
                /*document.querySelector('.it_local_video').style.display = "block";
                document.querySelector('.it_local_video').appendChild(localvideo);
                document.querySelector('.it_connecting').style.display = "none";
                localvideo.style.height = "140px";
                localvideo.style.marginLeft = "-40px";
                localvideo.play();
                var remotevideo = document.getElementById(call.getVideoElementId());

                document.querySelector('.it_remote_video').appendChild(remotevideo);
                remotevideo.style.height = "100%";
                remotevideo.removeAttribute("height");
                remotevideo.removeAttribute("width");

                remotevideo.play();*/
                console.log('hi, im connected');
            }
        },
        onIncomingCall(e) {
            //console.log(e);
            this.currentCall = e.call;
            //this.currentCall.addEventListener(VoxImplant.CallEvents.MessageReceived, this.onMessageReceived);
            //this.currentCall.addEventListener(VoxImplant.CallEvents.MediaElementCreated, this.onMediaElement);
            //this.currentCall.addEventListener(VoxImplant.CallEvents.LocalVideoStreamAdded, this.onLocalVideoStream);
        },
        onIncomeCallConnected(e) {
            //console.log(e);
            this.voxApi.sendVideo(true);
            this.currentCall.showRemoteVideo(true);

            //console.log(this.currentCall);
            // Start sending video and show incoming video    
            //this.voxApi.sendVideo(true);
            //this.currentCall.showRemoteVideo(true);
            //console.log(e);
            //console.log(this.currentCall);
            /*this.remotevideo = document.getElementById(this.currentCall.getVideoElementId());
            document.querySelector('.it_remote').appendChild(this.remotevideo);
            this.remotevideo.play();*/
        },
        onIncomeCallDisconnected(e) {
            this.currentCall = null;
        },
        onIncomeCallFailed(e) {
            console.log(e); // Error code -  e.code, error reason - e.reason
        },
        onMessageReceived(e){
            console.log(e);
             if(e.text=="CONNECTED"){
                this.remotevideo = document.getElementById(this.currentCall.getVideoElementId());
                document.querySelector('#remote_video_container').appendChild(this.remotevideo);
                this.remotevideo.style.height = "150px";
                this.remotevideo.play();
             }
            //
            //console.log(this.remotevideo);
            
        },
        /*onMediaElement(e) {
            console.log(e);
            // For WebRTC just using JS/CSS for transformation
            //var video = document.createElement(e.element);
            //var video = e.element.outerHTML;
            //console.log(video);
            //document.getElementById('voximplant_container').innerHTML = video;
            /*document.getElementById('voximplant_container').appendChild(video);
            video.play();
            /*$video = $(e.element);
            $video.appendTo('#voximplant_container');
            $video.css('margin-left', '10px').css('width', '320px').css('height', '240px').css('float', 'left');
            $video[0].play();*/
            //$video = $(e.element);
            //$video.appendTo('#voximplant_container');
            //$video.css('margin-left', '10px').css('width', '320px').css('height', '240px').css('float', 'left');
            //$video[0].play();
        //},
        /*onLocalVideoStream(e) {
            console.log("LOCAL VIDEO STREAM");
            console.log(e);
            /*if (e.type == "sharing") {
                $('#shareButton').html('Stop Sharing');
                $('#shareButton').off('click').click(function() {
                currentCall.stopSharingScreen();
                $('#shareButton').html('Share Screen');
                $('#shareButton').off('click').click(function() {
                    currentCall.shareScreen(true);
                });
                });
            }*/
        //},
        answerCall(){
            this.currentCall.answer();
            
            this.currentCall.addEventListener(VoxImplant.CallEvents.Connected, this.onIncomeCallConnected);
            this.currentCall.addEventListener(VoxImplant.CallEvents.Disconnected, this.onIncomeCallDisconnected);
            this.currentCall.addEventListener(VoxImplant.CallEvents.Failed, this.onIncomeCallFailed);

            this.voxApi.showLocalVideo(true);
            
            this.localvideo = document.querySelector('#voximplantlocalvideo');
            document.querySelector('#local_video_container').appendChild(this.localvideo);
            this.localvideo.style.height = "150px";
            this.localvideo.play();

            this.remotevideo = document.getElementById(this.currentCall.getVideoElementId());
            document.querySelector('#remote_video_container').appendChild(this.remotevideo);
            this.remotevideo.style.height = "150px";
            this.remotevideo.play();

            this.currentCall.sendAudio(true);
            this.currentCall.sendVideo(true);
            this.currentCall.sendMessage('CONNECTED');
            //this.remotevideo = document.getElementById(this.currentCall.getVideoElementId());
            //document.querySelector('.it_remote_video').appendChild(remotevideo);
            //this.remotevideo.style.height = "50px";
            //this.remotevideo.removeAttribute("height");
            //this.remotevideo.removeAttribute("width");
            //this.remotevideo.play();
            //document.querySelector('.it_exit_link').style.marginLeft = '-40px';
            //document.querySelector('.it_start_link').style.display = 'none';
            //this.voxApi.showLocalVideo(true);
            //this.localvideo = document.querySelector('#voximplantlocalvideo');
            //document.querySelector('.it_local_video').appendChild(this.localvideo);
            //document.querySelector('.it_local_video').style.display = 'block';
            //document.querySelector('.it_connecting').style.display = "none";
            //this.localvideo.style.height = "140px";
            //this.localvideo.style.marginLeft = "-40px";
            //this.localvideo.play();
            //this.currentCall.unmutePlayback();
            //this.currentCall.sendAudio(true);
            //this.currentCall.sendVideo(true);
            //this.currentCall.sendMessage('CONNECTED');
            //this.voxApi.sendVideo(true);
            //this.currentCall.showRemoteVideo(true);
            //console.log(this.currentCall);
        },
        cancelCall() {
            if(typeof this.currentCall!="undefined")
                this.currentCall.hangup();
            /*document.querySelector('.it_remote_video').removeChild(document.querySelector('.it_remote_video').childNodes[0]);
            document.querySelector('.it_connecting').style.display = "block";
            document.querySelector('.it_exit_link').style.marginLeft = '-110px';
            document.querySelector('.it_start_link').style.display = 'block';
            document.querySelector('.callpopup').style.display = 'none';
            document.querySelector('.it_local_video').style.display = 'none';*/
        },
    },
    created: function(){
        
    }
}
</script>