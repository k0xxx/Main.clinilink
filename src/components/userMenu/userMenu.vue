<template>
	<aside id="menuWrap">
		<div id="profileMenu" v-if="isAuth">
			<div class="profileMenuInfo">
				<div class="avatar">
					<img :src="menu.img" alt="image profile" />
					<div class="login">
						<router-link :to="{ name: 'profile', params: { profileUrl: menu.profileUrl }}">{{ menu.displayName }}</router-link> 
					</div>
				</div>
				<div class="status">{{ menu.status }}</div>
			</div>
			<nav>
				<router-link :to="{ name: 'profile', params: { profileUrl: menu.profileUrl }}">Профиль</router-link>
				<router-link to="/measurements">Измерения</router-link>
				<router-link to="/medicalRecords">Мед.карта</router-link>
				<router-link to="/consultations">Консультации</router-link>
				<router-link to="/news">Новости</router-link>
				<router-link to="/questions">Вопрос врачу</router-link>
				<router-link to="/messages">Сообщения</router-link>
				<router-link to="/search">Найти контакты</router-link>
				<router-link to="/contacts">Контакты</router-link>
				<router-link to="/groups">Группы</router-link>
				<router-link to="/organizations">Организации</router-link>
				<router-link to="/library">Справочник</router-link> 
				<router-link to="/settings">Настройки</router-link> 
				<router-link to="/adminpage">Админ панель</router-link> 
				<button type="button" v-on:click="logout">Выход!</button> 
			</nav>
			<modalPostRegister v-if="!isSubmited" @submit="isSubmited = true"></modalPostRegister> 
		</div> 
		<div class="card p-100" id="authorizingMenu" v-else>
			<form class="d-flex flex-column" v-on:submit.prevent="login">
				<div class="input-container">
					<label for="credentialsEmail" class="text-center">E-mail</label> 
					<input type="email" name="email" v-model="credentials.email" id="credentialsEmail" class="input-large" placeholder="Ваш e-mail" required> 
				</div>
				<div class="input-container">
					<label for="credentialsPassword" class="text-center">Пароль</label>
					<input type="password" name="password" v-model="credentials.password" id="credentialsPassword" class="input-large mb-50" placeholder="Ваш пароль" required> 
				</div>
				<button type="submit" class=" btn-primary btn-large mb-75">Войти</button>
				<p v-if="credentials.error.message">{{ credentials.error.message }}</p>
			</form> 
			<button type="submit" v-on:click="openModal" class="btn-primary btn-large mb-75">Регистрация</button>
			<div id="socialNetworks" class="align-i-middle d-flex justify-content-between">
				<a href="" class="btn btn-outline-danger btn-middle"><icon name='google-plus' scale="1.1"></icon></a>
				<a href="" class="btn btn-outline-info btn-middle social-small"><icon name='facebook' scale="1.1"></icon></a>
				<a href="" class="btn btn-outline-warning btn-middle social-small"><icon name='odnoklassniki' scale="1.1"></icon></a>
				<a href="" class="btn btn-outline-info btn-middle"><icon name='vk' scale="1.1"></icon></a>
			</div>
			<div class="d-flex justify-content-center mt-75 text-small">
				<a href="?">Забыли пароль?</a>
			</div>
			<modalRegister v-if="showRegisterModal" @auth="isAuth = true" @close="showRegisterModal = false"></modalRegister> 
		</div>
	 </aside>
</template> 

<script>   
import modalRegister from './modalRegister.vue';
import modalPostRegister from './modalPostRegister.vue';

export default {
	name: 'userMenu', 
	data() {  
		return {
			credentials: {
				email: '',
				password: '',
				error: {},
			},
			isSubmited: false,
			isAuth: this.$auth.check(),
			showRegisterModal: false,
			menu: {
				img: 'http://cdn.clinilink.org/images/defaultProfile.png',
				displayName: 'Аноним',
				status: 'Не указано',
				profileUrl: '',
			},
		} 
	},
	components: {modalRegister, modalPostRegister},
	methods: {
		openModal: function(){
			this.showRegisterModal = true;
		},
		login: function(){
			this.$auth.login(this, this.credentials);
		},
		logout: function(){
			this.$auth.logout(this, this.credentials, "profile/",);
		}
	},
	created: function(){
		var userMenu = this.$auth.getUser();
		if(userMenu){
			this.menu.displayName = userMenu.fullName;
			this.menu.profileUrl = userMenu.url;
			this.menu.status = userMenu.status.name_rus;
			this.isSubmited = userMenu.isRegister;
		}
		console.log(userMenu);
	}
	
}
</script> 

<style>
#profileMenu,#authSidebar{
    position: absolute;
    top: 1rem;
    left: 0.5rem;
    right: 0.5rem;
    flex-direction: column;
    background: #fff;
    border: 1px solid #ddd;
}
#profileMenu .profileMenuInfo .avatar{
	position: relative;
}
#profileMenu .profileMenuInfo .avatar img{
	display: block;
	width: 100%;
	height: auto;
}
#profileMenu .profileMenuInfo .avatar .login{
	position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 0.25rem 0px;
    font-size: 18px;
    font-weight: bold;
    white-space: nowrap;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
}
#profileMenu .profileMenuInfo .status{
	font-size: 14px;
	text-align: center;
	padding: 0.25rem 0.25rem;
	background: #eee;
    font-weight: lighter;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
	user-select: none;
    cursor: default;
}
#profileMenu nav a{
	display: list-item;
    list-style: none;
    font-size: 14px;
    color: #333;
    padding: 0.25rem 0.5rem;
    text-decoration: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}
#profileMenu nav a:hover{
	color: #464a4c;
    background-color: #f7f7f9;
}
/*===========AUTH MENU============*/
    .input-auth{
       width:100%; 
    }
    .social-small{
        padding-top: 0.2rem !important;
        padding-left: 0.6rem !important;
        padding-right: 0.6rem !important;
        padding-bottom: 0.1rem !important;
    }
</style>