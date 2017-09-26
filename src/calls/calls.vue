<style>
#callHeaderBlock{
    display: block;
}
.calls_overlay{
	position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1050;
}
.calls_block{
	display: block;
    z-index: 1060;
    background: #fff;
    width: 800px;
    margin: 0 auto;
    margin-top: 7%;
    overflow: hidden;
    max-width: 100%;
}
</style>

<template>
	<div id="callsHeaderBlock">
        <div class="calls_overlay" v-if="isCalling" @click="dismiss($event)">
            <div class="calls_block p-75">
                <div id="local_video_container"></div>
                <div id="remote_video_container"></div>
                <div v-if="callType == 'inCall'">
                    Входящий звонок
                    <button type="button" class="btn btn-primary" v-on:click="createCall">Ответить</button>
                    <button type="button" class="btn btn-danger">Отклонить</button>
                </div>
                <div v-if="callType == 'outCall'">
                    Исходящий звонок
                    <button type="button" class="btn btn-primary" v-on:click="createCall">Позвонить</button>
                    <button type="button" class="btn btn-danger">Отклонить</button>
                </div>
                <!--<input type="text" v-model="callTo" placeholder="кому звоним">
                
                <div id="call2video_container">
                    
                    <div class="it_remote"></div>
                    <button type="button" v-on:click="answerCall">Ответить</button>
                    <button type="button" v-on:click="cancelCall">Отклонить</button>
                </div>-->
            </div>
        </div>
    </div>
</template>

<script>
import { baseAPI } from './../config.js';
import Calls from './index.js';
var VoxImplant = require('voximplant-websdk');

export default {
    data() {  
		return {
            isCalling: false,
            callType: 'outCall',//inCall
            callState: false,
            voxApi: VoxImplant.getInstance(),
            endpoint: baseAPI + 'auth/call_auth',
            localvideo: null,
            remotevideo: null,
            currentCall: null,
            application_name: 'videocall',
            account_name: 'clinilink',
            callTo: '',
            user_login: this.$auth.getUserId(),
            user_password: '',
        }
    },
    beforeMount() {
        Calls.event.$on('call', (callTo, state) => {
            this.callTo = callTo;
            this.isCalling = true;
            console.log('and now we are make call '+state)        
        })
    },
    mounted: function(){
        this.voxApi.addEventListener(VoxImplant.Events.SDKReady, this.onSdkReady);
        //this.voxApi.addEventListener(VoxImplant.Events.MicAccessResult, this.onMicAccessResult);
    },
    methods: {
        /*getUserVoxInfo(){
            this.$http.get(this.endpoint).then((response) => {
                if (response.data.isRegister){
                    this.user_login = response.data.login;
                    this.user_password = response.data.password;
                    console.log(response.data)
                    
				}else{
                    console.log(response.data);
                }
		    });
        },*/
        onSdkReady(){
            console.log("onSDKReady version " + VoxImplant.version + " WebRTC supported: " + this.voxApi.isRTCsupported());
            this.voxApi.addEventListener(VoxImplant.Events.ConnectionEstablished, this.onConnectionEstablished);
            this.voxApi.addEventListener(VoxImplant.Events.ConnectionFailed, this.onConnectionFailed);
            this.voxApi.addEventListener(VoxImplant.Events.ConnectionClosed, this.onConnectionClosed);
            this.voxApi.connect();
        },
        onConnectionEstablished(){
            console.log('ConnectionEstablished!');
            this.voxApi.addEventListener(VoxImplant.Events.AuthResult, this.onAuthResult);
            this.voxApi.requestOneTimeLoginKey(this.user_login+"@"+this.application_name+"."+this.account_name+".voximplant.com");
            //this.loginVox(); //автоматическа авторизация
        },
        onConnectionFailed(e){
            console.log('ConnectionFailed!');
            console.log(e);
        },
        onConnectionClosed(){
            console.log('is closed!');
        },
        call(){
            console.log('asdasd');
        },
        /*loginVox(){
            this.voxApi.addEventListener(VoxImplant.Events.AuthResult, this.onAuthResult);
            this.voxApi.login(this.username+"@"+this.application_name+"."+this.account_name+".voximplant.com", this.password);
        },*/
        onAuthResult(e){
            console.log("AuthResult: "+e.result);
            if (e.result) {
                console.log('login success!')
                this.voxApi.addEventListener(VoxImplant.Events.IncomingCall, this.onIncomingCall);
            } else {
                if (e.code == 302){
                    //IMPORTANT: You should always calculate the token on your backend!
                    console.log('post to server and get key')
                    this.$http.post(this.endpoint, {"key":e.key}).then((response) => {
                        console.log(response);
                        this.voxApi.loginWithOneTimeKey(this.user_login+"@"+this.application_name+"."+this.account_name+".voximplant.com", response.data);
                    });
                    /*$.post('/calckey/',{"key":e.key},function(token){
                        VoxImplant.getInstance().loginWithOneTimeKey("myuser@myapp.myaccount.voximplant.com", token);
                    },'text');*/
                }
            }
            /*if(e.result){
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
            /*}else{
                console.log('cant auth!');
            }*/
        },
        onMicAccessResult(e){
            console.log(e);
        },
        createCall() {
            this.callType = 'outCall';
            this.callState = true;
            // application_username - app username that will be dialed (with video)
            this.currentCall = this.voxApi.call(this.callTo, true);
            this.currentCall.addEventListener(VoxImplant.CallEvents.Connected, this.onOutCallConnected);
            
            this.voxApi.showLocalVideo(true);
            
            this.localvideo = document.querySelector('#voximplantlocalvideo');
            console.log(this.localvideo);
            if(this.localvideo){
                document.querySelector('#local_video_container').appendChild(this.localvideo);
            }else{
                console.log('Нет доступа к видеокамере');
            }
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
            console.log(e);

            this.callType = 'inCall';
            this.callState = true;

            this.isCalling = true;

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
        
        // Отменить звонок
		dismiss(evt) {
			if (evt.target.className === 'calls_overlay') {
				this.isCalling = false
			}
		},
    },
    created: function(){
        //this.getUserVoxInfo();
        try {
            this.voxApi.init({
                useRTCOnly: true, // force usage of WebRTC
                micRequired: false, // ask mic/cam access before connection to VoxImplant
                videoSupport: false,  // enable video support
                progressTone: true, // play progress tone
            });
        } catch(e) {
            console.log(e);
        }
    }
}
</script>

