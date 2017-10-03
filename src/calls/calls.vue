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
#videoCall video{
    width: 100%;
    height: auto;
}
#remote_video_container{
    width: 75%;
}
#local_video_container{
    width: 25%;
}
</style>

<template>
	<div id="callsHeaderBlock">
        <div class="calls_overlay" v-if="isCalling" @click="dismiss($event)">
            <div class="calls_block p-75">
                <div class="userCallInfo">
                    <p>Информация о пользователе кому звоним</p>
                    <img src="http://cdn.clinilink.org/images/profile/defaultProfile.png" alt="" width="50px" height="50px">
                </div>
                <div id="videoCall">
                    <div id="remote_video_container"></div>
                    <div id="local_video_container"></div>
                </div>
                <div v-if="callType == 'inCall'">
                    Входящий звонок
                    <button type="button" class="btn btn-primary" v-on:click="answerCall">Ответить</button>
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
            callType: 'outCall',
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
        })
    },
    mounted: function(){
        this.voxApi.addEventListener(VoxImplant.Events.SDKReady, this.onSdkReady);
    },
    methods: {
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
        },
        onConnectionFailed(e){console.log('ConnectionFailed!')},
        onConnectionClosed(){console.log('is closed!')},
        onAuthResult(e){
            if (e.result) {
                console.log('login success!')
                this.voxApi.addEventListener(VoxImplant.Events.IncomingCall, this.onIncomingCall);
            } else {
                if (e.code == 302){
                    console.log('direct login falied, try ask own server...')
                    this.$http.post(this.endpoint, {"key":e.key}).then((response) => {
                        this.voxApi.loginWithOneTimeKey(this.user_login+"@"+this.application_name+"."+this.account_name+".voximplant.com", response.data);
                    });
                }
            }
        },
        createCall(){
            this.callType = 'outCall';
            
            this.voxApi.attachRecordingDevice(()=> {
                //sdk.showLocalVideo(true);
                this.voxApi.showLocalVideo(true)
            
                this.localvideo = document.querySelector('#voximplantlocalvideo');
                if(this.localvideo){
                    document.querySelector('#local_video_container').appendChild(this.localvideo);
                    var playPromise = this.localvideo.play()
                    if (playPromise !== undefined) {
                        playPromise.then(_ => {
                            // Automatic playback started!
                            // Show playing UI.
                        })
                        .catch(error => {
                            // Auto-play was prevented
                            // Show paused UI.
                        });
                    }
                }else{
                    var noVideo = document.createTextNode('Нет видео');
                    document.querySelector('#local_video_container').appendChild(noVideo);
                    console.log('Нет доступа к видеокамере');
                }
            })
            
            //sdk.call('participant',{sendVideo:true,receiveVideo:true});
            this.currentCall.addEventListener(VoxImplant.CallEvents.Connected, this.onOutCallConnected);
            this.currentCall.addEventListener(VoxImplant.CallEvents.Disconnected, this.onOutCallDisconnected);
            this.currentCall.addEventListener(VoxImplant.CallEvents.Failed, this.onOutCallFailed);

            this.currentCall = this.voxApi.call(this.callTo, {sendVideo:true, receiveVideo:true});
        },
        onOutCallConnected(e) {  
            // Start sending video and show incoming video
            console.log(this.currentCall);
            this.voxApi.sendVideo(true);
            this.currentCall.showRemoteVideo(true);
            console.log(this.currentCall.showRemoteVideo(true));
            console.log(this.currentCall.getVideoElementId());

            /*this.localvideo = document.querySelector('#voximplantlocalvideo');
            console.log(this.localvideo)
            document.querySelector('#local_video_container').appendChild(this.localvideo);
            this.localvideo.style.height = "150px";
            this.localvideo.play();*/

            this.remotevideo = document.getElementById(this.currentCall.getVideoElementId());
            console.log(this.remotevideo);
            document.querySelector('#remote_video_container').appendChild(this.remotevideo);
            this.remotevideo.style.height = "150px";
            this.remotevideo.play();

        },
        onOutCallDisconnected(e) {
            this.currentCall = null;
        },
        onOutCallFailed(e) {
            // Error code -  e.code, error reason - e.reason
        },

        onIncomingCall(e){
            this.callType = 'inCall';
            this.isCalling = true;
            
            this.currentCall = e.call;
            
            // Answer automatically. It's better to show the dialog to let answer/reject the call in real app.
            //this.currentCall.answer();
        },
        answerCall(){
            console.log('we ask the microphone');    
            this.voxApi.attachRecordingDevice(()=> {
                console.log('we are answer call');    
                this.voxApi.showLocalVideo(true)
                
                this.localvideo = document.querySelector('#voximplantlocalvideo');
                if(this.localvideo){
                    document.querySelector('#local_video_container').appendChild(this.localvideo);
                    var playPromise = this.localvideo.play()
                    if (playPromise !== undefined) {
                        playPromise.then(_ => {
                            // Automatic playback started!
                            // Show playing UI.
                        })
                        .catch(error => {
                            // Auto-play was prevented
                            // Show paused UI.
                        });
                    }
                }else{
                    var noVideo = document.createTextNode('Нет видео');
                    document.querySelector('#local_video_container').appendChild(noVideo);
                    console.log('Нет доступа к видеокамере');
                }
            })

            this.currentCall.addEventListener(VoxImplant.CallEvents.Connected, this.onInCallConnected);
            this.currentCall.addEventListener(VoxImplant.CallEvents.Disconnected, this.onInCallDisconnected);
            this.currentCall.addEventListener(VoxImplant.CallEvents.Failed, this.onInCallFailed);

            this.currentCall.answer();
        },
        onInCallConnected(e) {  
            // Start sending video and show incoming video
            this.voxApi.sendVideo(true);
            this.currentCall.showRemoteVideo(true);
            
            console.log(this.currentCall.getVideoElementId());

            /*this.localvideo = document.querySelector('#voximplantlocalvideo');
            console.log(this.localvideo)
            document.querySelector('#local_video_container').appendChild(this.localvideo);
            this.localvideo.style.height = "150px";
            this.localvideo.play();
            */
            this.remotevideo = document.getElementById(this.currentCall.getVideoElementId());
            console.log(this.remotevideo);
            document.querySelector('#remote_video_container').appendChild(this.remotevideo);
            //this.remotevideo.style.height = "150px";
            this.remotevideo.play();

        },
        onInCallDisconnected(e) {
            this.currentCall = null;
        },
        onInCallFailed(e) {
            // Error code -  e.code, error reason - e.reason
        },
        dismiss(evt) {
			if (evt.target.className === 'calls_overlay') {
				this.isCalling = null
			}
		},
    },
    created: function(){
        //this.getUserVoxInfo();
        try {
            this.voxApi.init({
                useRTCOnly: true, // force usage of WebRTC
                micRequired: false, // ask mic/cam access before connection to VoxImplant
                videoSupport: true,  // enable video support
                //localVideoContainerId: 'local_video_container',
                //remoteVideoContainerId: 'remote_video_container',
                progressTone: true, // play progress tone
            });
        } catch(e) {
            console.log(e);
        }
    }
}
</script>

