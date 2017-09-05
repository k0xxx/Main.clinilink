<template>
	<div id="view" class="withSideBar">
		<div id="userPage" class="card p-75"> 
			<div class="header_profile p-3">
				<div class="d-flex pb-75">
					<div class="contain-image"> <img :src="profile.img"  alt="Фото профиля" height="170px" width="170px"> </div> 
					<div class="profile_detals">
						<h2>{{ profile.fullName }}</h2>
						<h3>{{profile.doc_specialization}}</h3>
						<div class="d-flex"><span class='mr-50 text-primary d-flex align-i-center'><icon name="thumbs-o-up"></icon></span>{{profile.grade.rating}}% ({{profile.grade.votes}} оценок)</div>
						<div v-if="profile.doc_specialization_experience">Cтаж {{profile.doc_specialization_experience }} лет / {{profile.doc_category}}</div>
						<div v-if="profile.doc_work_place">{{profile.doc_work_place}}</div>
						<div>{{profile.doc_work_place_adress}}</div>
					</div>  
				</div> 
				<div v-if="profile._id != $auth.getUserId()" class="header_profile_buttons d-flex justify-content-end align-i-cetner">
					<a href="#" v-on:click.prevent="newMessage = true" class="contact_icons mx-50 text-primary "><icon name="envelope" scale="1.2"></icon></a>
					<newMessageModal v-if="newMessage" @close="newMessage = false" :contact_id="profile._id"></newMessageModal>
					<div class="contact_icons mx-50 text-primary "><icon name="phone" scale="1.2"></icon></div>
					<div class="contact_icons mx-50 text-primary "><icon name="video-camera" scale="1.2"></icon></div>
					<div class="contact_icons_button d-flex mx-50 align-i-center">   
						<button type="button" class="btn btn-primary"> Добавить </button>  
					</div>
				</div>
			</div>
			<div id="profileInfo">
				<div class="profileTabs">   
					<router-link :to="'/'+ profileUrl">Информация</router-link>
					<router-link :to="'/'+ profileUrl+'/answers'">Ответы</router-link>
					<router-link :to="'/'+ profileUrl+'/rewievs'" v-if="profile.status.id != 0">Отзывы</router-link>
					<router-link :to="'/'+ profileUrl+'/blog'">Блог</router-link>
					<router-link :to="'/'+ profileUrl+'/files'" v-if="profile.status.id != 0">Файлы</router-link>
				</div>
				<div id="profileInfoContent"> 
					<router-view></router-view>
				</div>
			</div> 
		</div>
	</div>
</template>

<script>
import { baseAPI } from '../../config.js';
import newMessageModal from '../messages/newMessageModal.vue';
export default {
	name: 'profile',
	components: {newMessageModal},
	props: ['profileUrl'],
	data() {
		return {
			endpoint: baseAPI + 'profile/'+ this.profileUrl,
			newMessage: false,
			profile: {
				img: 'http://cdn.clinilink.org/images/defaultProfile.png',
				status: {
					id: 0
				},
				grade: {
					rating: 0,
					votes: 0
				}
			}
		}
	},
	methods: {
		getProfile: function(){
			this.$http.get(this.endpoint).then((response) => {
				console.log(response.data.profile);
				this.profile = response.data.profile;
			}, function(err){
				console.log(err); 
			})
		},
    },
	created: function(){
		this.getProfile();
	} 
}
</script>

<style>
#userPage{
	display: flex;
    flex-direction: column;
}
#profileInfo .profileTabs{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
#profileInfo .profileTabs a{
	display: flex;
    width: 100%;
    justify-content: center;
    padding: 0.5rem 0;
	border-bottom: 1px solid #ddd;
}
#profileInfo .profileTabs a.router-link-exact-active{
	border: 1px solid #ddd;
	border-bottom: none;
	border-top-right-radius: 0.25rem;
    border-top-left-radius: 0.25rem;
}
#profileInfoContent{
    border: 1px solid #ddd;
    border-top: none;
}

    .header_profile_buttons{
        font-size: 20px;
    }
    .profile_detals{
        margin-left: 1rem;
		width: 100%;
    }
    .header_profile_buttons .contact_icons{
        align-self: center;
    }
    .contact_icons{
        margin-top: 0.40rem;  
    }
    .contact_icons_button{
        margin-top: 0.10rem;  
    }
    .list-detail .p-100{  
        border-bottom: 1px solid #ddd;
    }
</style>    