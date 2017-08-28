<template>
	<div class="contactItem card p-75">
		<div class="contactItemImg mr-75">
			<img :src="'http://new.clinilink.org/' + profile.img" >
		</div>
		<div class="contactItemInfoFull">
			<div class="contactItemInfo">
				<ul>
					<li>
						<router-link :to="{ name: 'profile', params: { profileUrl: profile.url }}">
							<icon v-if="profile.status.id > 2" name="plus-square" class="mr-50"></icon>
							<strong>{{profile.fullName}}</strong>
						</router-link>
					</li>
					<li><small>{{profile.city}}{{profile.country}}</small></li>
					<li><small><strong>{{profile.med_position}}</strong></small></li>
					<li><small><strong>{{profile.pat_main_disease}}</strong></small></li>
				</ul>
				<div class="d-flex">
					<button type="button" v-on:click="newMessage = true" class="d-flex btn btn-primary btn-middle border-left-radius"><icon name="comment" class="mr-50"></icon>Написать</button>
					<newMessageModal v-if="newMessage" @close="newMessage = false" :contact_id="profile._id"></newMessageModal> 
					<button v-if="statusContact == 0" type="button" v-on:click="addContact" class="d-flex btn btn-primary btn-middle no-border-radius">
						<icon name="user-plus" class="mr-50"></icon>Добавить
					</button>
					<button v-if="statusContact == 1" type="button" v-on:click="removeContact" class="d-flex btn btn-primary btn-middle no-border-radius">
						<icon name="user-plus" class="mr-50"></icon>Отменить заявку
					</button>
					<button v-if="statusContact == 2" type="button" v-on:click="approveContact" class="d-flex btn btn-primary btn-middle no-border-radius">
						<icon name="user-plus" class="mr-50"></icon>Подтвердить
					</button>
					<button v-if="statusContact == 2" type="button" v-on:click="removeContact" class="d-flex btn btn-primary btn-middle no-border-radius">
						<icon name="user-plus" class="mr-50"></icon>Отклонить
					</button>
					<button v-if="statusContact == 3" type="button" v-on:click="removeContact" class="d-flex btn btn-primary btn-middle no-border-radius">
						<icon name="user-plus" class="mr-50"></icon>Удалить из контактов
					</button>
					<button v-if="statusSubscribe == 0" type="button" v-on:click="addSubscribe" class="d-flex btn btn-primary btn-middle border-right-radius">
						<icon name="user-plus" class="mr-50"></icon>Подписаться
					</button>
					<button v-if="statusSubscribe == 1" type="button" v-on:click="unSubscribe" class="d-flex btn btn-danger btn-middle border-right-radius">
						<icon name="user-plus" class="mr-50"></icon>Отписаться
					</button>
				</div>
			</div>
			<div class="contactItemInfoDoc" v-if="profile.status.id == '3'">
				<ul>
					<li><small><icon name="thumbs-o-up" class="mr-50"></icon>{{profile.grade.rating}}%({{profile.grade.total}})</small></li>
					<li><small><icon name="comment" class="mr-50"></icon>{{profile.grade.total}} отз.</small></li>
					<li><small><icon name="credit-card" class="mr-50"></icon>{{profile.grade.total}} руб.</small></li>
				</ul>
				<div class="btn-group">
					<button type="button" class="d-flex btn btn-primary btn-middle"><icon name="calendar" class="mr-50"></icon>Записаться</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import newMessageModal from '../messages/newMessageModal.vue';
export default{
	name: "contactItem",
	data() {
		return {
			newMessage: false,
			endpoint: 'http://api.clinilink.org/api/contacts/',
			statusContact: 0,
			statusSubscribe: false,
			profile: {
				id: '',
				img: 'asd.png',
				fullName: '',
			}
		}
	},
	components: {newMessageModal},
	props: ['contact', 'contactStatus', 'isSubscribe'],
	methods: {
		addContact: function(){
			this.$http.put(this.endpoint, {contactId: this.profile.id}).then((response) => {
				console.log(response);
				if(response.data.isContact){
					this.contactStatus = 1;
				}
			}, function(err){
				console.log(err);
			})
		},
		approveContact: function(){
			this.$http.post(this.endpoint, {contactId: this.profile.id}).then((response) => {
				if(response.data.update){
					this.contactStatus = 3;
				}
			}, function(err){
				console.log(err);
			})
		},
		removeContact: function(){
			var options = {
    			params: {
     	 			contactId: this.profile.id
    			}
  			};
			this.$http.delete(this.endpoint, options).then((response) => {
				if(response.data.isRemoved){
					this.contactStatus = 0;
				}
			}, function(err){
				console.log(err);
			})
		},
		addSubscribe: function(){
			console.log('hi');
		},
		unSubscribe: function(){
			console.log('hi');
		}
	},
	created: function(){
		this.profile = this.contact;
		this.statusContact = this.contactStatus;
		this.statusSubscribe = this.isSubscribe;
	}
}  
</script>
<style>
.contactItem{
	display: flex;
	flex-direction: row;
}
.contactItem .contactItemImg img{
	width: 120px;
	height: 120px;
	border: 2px solid white;
    -webkit-box-shadow: 0px 0px 2px black;
    box-shadow: 0px 0px 2px black;
}
.contactItem .contactItemInfoFull{
	display: flex;
    justify-content: space-between;
    width: 100%;
}
.contactItem .contactItemInfo{
	display: flex;
    flex-direction: column;
    justify-content: space-between;
	width: 100%;
}
.contactItem .contactItemInfo ul{
	margin: 0;
	padding: 0;
	list-style: none;
}
.contactItem .contactItemInfoDoc{
	display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.contactItem .contactItemInfoDoc ul{
	margin: 0;
	padding: 0;
	list-style: none;
}
</style>