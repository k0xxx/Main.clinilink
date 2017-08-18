<template>
	<div id="messengerMain"> 
		<aside class="dialogSideBar">
			<div class="dialogSideBar_header d-flex justify-content-between align-i-center text-primary"> 
				<router-link :to="{name: 'news'}" class="d-flex py-50 px-75"><icon name="arrow-left"></icon></router-link>
				<div class="d-flex text-center py-50">Диалоги</div>
				<a href="#" class="d-flex py-50 px-75"><icon name="envelope-o"></icon></a>
			</div>
			<div class="dialogSideBar_search d-flex justify-content-between align-i-center text-primary p-50"> 
				<form class="dialogSideBar_searchInput d-flex">
					<input type="text" class="form-control px-50 input-middle input-calc-border-width" placeholder="Найти...">
					<icon name="search" class="form-input-icon text-primary"></icon>
				</form>
			</div>
			//gg
			<ul class="dialogSideBar_list">
				<li v-for="dialog in dialogList">
					<a href="#" v-on:click="selectDialog(dialog._id)">
						<div>
							<img :src="'http://new.clinilink.org/' + dialog.user_dialog_list_ref[0].img" class="dialogImg p-50">
						</div>
						<div class="dialogInfo py-50"> 
							<div class="d-flex justify-content-between align-i-center pr-50">
								<span>{{dialog.user_dialog_list_ref[0].fullName}}</span>
								<small>{{dialog.last_message_time | formatDialogTime}}</small>
							</div>
							<div class="short_message py-50">
								<span>{{dialog.last_message}}</span>
							</div>
						</div>
					</a>
				</li>
				<infinite-loading :on-infinite="loadDialogs" ref="infiniteLoading"></infinite-loading>
			</ul>
		</aside>
		<div class="dialogMainBlock">
			<div class="dialogMainBlock_header" v-if="currentDialogId">
				<div></div>
				<div class="d-flex align-i-center py-50">
					<icon v-if="currentDialog.userInfo.status.id > 2" name="plus-square" class="mr-50"></icon>
					<span>{{currentDialog.userInfo.fullName}}</span>
					<icon name="circle" class="text-primary ml-50"></icon>
				</div>
				<div class="d-flex align-i-center text-primary">
					<a href="#" class="d-flex py-50 px-75"><icon name="phone"></icon></a>
					<a href="#" class="d-flex py-50 px-75"><icon name="video-camera"></icon></a>
					<a href="#" class="d-flex py-50 px-75" v-on:click.prevent="toogleDialogProfile"><icon name="user"></icon></a>
				</div>
			</div>
			<div class="dialogMainBlock_content d-flex" v-if="currentDialogId">
				<div class="dialogMainBlock_contentMessages">
					<ul id="messageListContainer" class="messageList">
						<infinite-loading :on-infinite="loadMessageList" ref="infiniteLoading" direction="top">
							<span slot="no-more">Всё загружено!</span>
						</infinite-loading>
						<li class="messageItem" v-for="message in messageList">
							<div>
								<img :src="'http://new.clinilink.org/' + message.from_ref.img" class="messageAuthorImg p-50">
							</div>
							<div class="messageContent py-50"> 
								<div class="d-flex justify-content-between align-i-center pr-50">
									<span>{{message.from_ref.fullName}}</span>
									<small>{{message.date}}</small>
								</div>
								<div>
									<span>{{message.text}}</span>
								</div>
							</div>
						</li>
					</ul>
					<div class="dialogMainBlock_messageFormBlock">
						<form class="newMessageForm" v-on:submit.prevent="sendMessage">
							<button type="button"><icon name="plus"></icon></button>
							<textarea name="message" @keyup.enter="sendMessage" v-model="newMessageForm.message"></textarea>
							<button type="submit"><icon name="paper-plane-o"></icon></button>
						</form>
					</div>
				</div>
				<aside v-if="showDialogProfile" class="dialogMainBlock_contentUserInfo d-flex flex-column mb-100"> 
					<div class="d-flex justify-content-center">
						<img :src="'http://new.clinilink.org/' + currentDialog.userInfo.img"  alt="avatar" height="120px" width="120px" class="img-circle">
					</div>
					<div class="mt-75 px-75 text-center">
						<a href="#">{{currentDialog.userInfo.fullName}}</a>
					</div>
					<div class="short_profile_info mt-75 px-75 text-center">
						<div class="profession_short_profile">{{currentDialog.userInfo.doc_specialization}}</div>
						<div class="d-flex justify-content-center">
							<span class='mr-50 text-primary d-flex align-i-center'><icon name="thumbs-o-up"></icon></span>
							{{currentDialog.userInfo.grade.rating}}% ({{currentDialog.userInfo.grade.votes}} оценок)
						</div>
						<div v-if="currentDialog.userInfo.doc_specialization_experience">Cтаж {{currentDialog.userInfo.doc_specialization_experience }} лет / {{currentDialog.userInfo.doc_category}}</div>
						<div v-if="currentDialog.userInfo.doc_work_place">{{currentDialog.userInfo.doc_work_place}}</div>
						<div>{{currentDialog.userInfo.doc_work_place_adress}}</div>
					</div> 
				</aside>
			</div>
		</div>
	</div>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading"
export default {
	name: 'messages', 
	components: {InfiniteLoading},
	data() {  
		return {
			endpoint: 'http://api.clinilink.org/api/messages/',
			dialogPage: 1,
			messagePage: 1,
			dialogList: [],
			showDialogProfile: true,
			currentDialogId: '',
			currentDialog: {
				userInfo: {
					img: '',
					status: {
						id: 0
					},
					grade: {
						votes: 0,
						rating: 0,
					}
				}
			},
			newMessageForm: {
				message: ''
			},
			messageList: [],
		}
	},
	methods: {
		loadDialogs() {
			var options = {
				params: {page: this.dialogPage}
			}
			this.$http.get(this.endpoint, options).then((response) => {
				//console.log(response.data.dialogList);
				if (response.data.dialogList.length) {
					this.dialogList = this.dialogList.concat(response.data.dialogList);
					this.dialogPage++;
					this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
				} else {
					this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
				}
		  });
		},
		loadMessageList: function(){
			var options = {
				params: {page: this.messagePage}
			}
			this.$http.get(this.endpoint + this.currentDialogId + '/messages/', options).then((response) => {
				console.log('page-loaded'+this.messagePage);
				if (response.data.messageList.length) {
					
					for (var i=0; i < response.data.messageList.length; i++) {
						this.messageList.unshift( response.data.messageList[i] );
					}

					var messageListContainer = this.$el.querySelector("#messageListContainer");
					messageListContainer.scrollTop = messageListContainer.scrollHeight;
					
					this.messagePage++;
					this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
				} else {
					this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
				}
			});
		},
		selectDialog: function(dialogId){
			this.messageList = [];
			this.messagePage = 1;
			this.currentDialogId = dialogId;
			this.$nextTick(() => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
      });
			this.loadDialogInfo();
			
		},
		loadDialogInfo: function(){
			this.$http.get(this.endpoint + this.currentDialogId).then((response) => {
				console.log(response.data);
				if (response.data.dialogInfo) {
					this.currentDialog.userInfo = response.data.dialogInfo.user_dialog_list_ref[0];
				}
			});
		},
		toogleDialogProfile: function(){
			if(this.showDialogProfile){
				this.showDialogProfile = false;
			}else{
				this.showDialogProfile = true;
			}
		},
		sendMessage: function(){
			this.$http.put(this.endpoint + this.currentDialogId + '/messages/', this.newMessageForm).then((response) => {
				console.log(response);
				if(response.data.message){
					this.messageList.push(response.data.message);
					var messageListContainer = this.$el.querySelector("#messageListContainer");
					messageListContainer.scrollTop = messageListContainer.scrollHeight;
				}
				this.newMessageForm.message = '';
			}, function(err){
				console.log(err);
			})
		}
	},
	created: function(){
		
	}
}
</script> 

<style>
#messengerMain{
    display: flex;
	position: fixed;
	top: 50px;
	left:0;
	right:0;
	bottom:0;
	background: white; 
}
#messengerMain .dialogSideBar{
	width: 25%;
	border-right: 1px solid #ddd;
}
#messengerMain .dialogSideBar_header{
	border-bottom: 1px solid #ddd;
	min-height: 40px;
}
#messengerMain .dialogSideBar_search{
	border-bottom: 1px solid #ddd;
}
#messengerMain .dialogSideBar_searchInput{
    position: relative;
	width: 100%;
}
#messengerMain .dialogSideBar_searchInput .form-input-icon{
	position: absolute;
	top: 5px;
	right: 8px;
}
#messengerMain .dialogSideBar_list{
	margin: 0;
	padding: 0;
}
#messengerMain .dialogSideBar_list > li > a{
	display: flex;
	width: 100%;
	border-bottom: 1px solid #ddd;
}
#messengerMain .dialogSideBar_list > li > a:hover{
	background: #f9f9f9;
}
#messengerMain .dialogSideBar_list > li > a img.dialogImg{
	width: 45px;
    height: 45px;
    border: 1px solid transparent;
    border-radius: 100rem;
}
#messengerMain .dialogSideBar_list > li > a .dialogInfo{
	width: 100%;
}

#messengerMain .dialogMainBlock{
    display: flex;
    flex-direction: column;
    width: 100%;
}
#messengerMain .dialogMainBlock .dialogMainBlock_header{
	display: flex;
    justify-content: space-between;
	border-bottom: 1px solid #ddd;
	min-height: 40px;
}
#messengerMain .dialogMainBlock .dialogMainBlock_content{
	height: 100%;
}
#messengerMain .dialogMainBlock_contentMessages{
	width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
}
#messengerMain .dialogMainBlock_messageFormBlock{
	border-top: 1px solid #ddd;
}
#messengerMain .dialogMainBlock_messageFormBlock .newMessageForm{
	display: flex;
	justify-content: space-between;
}
#messengerMain .dialogMainBlock_messageFormBlock .newMessageForm textarea{
	width: 100%;
}
#messengerMain .dialogMainBlock_contentMessages .messageList{
	overflow-y: scroll;
	height: 100%;
}
#messengerMain .dialogMainBlock_contentMessages .messageList .messageItem{
	display: flex;
}
#messengerMain .dialogMainBlock_contentMessages .messageList .messageItem .messageContent{
	width: 100%;
}
#messengerMain .dialogMainBlock_contentMessages .messageList .messageItem img.messageAuthorImg{
	width: 45px;
    height: 45px;
    border: 1px solid transparent;
    border-radius: 100rem;
}
#messengerMain .dialogMainBlock_contentUserInfo{
	width: 40%;
	border-left: 1px solid #ddd;
	margin-top: 3rem;
}
</style>