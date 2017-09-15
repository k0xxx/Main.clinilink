<template>
	<div id="main_page" class="d-flex justify-content-between text-center">
		<div class="main_page_logo">
			<img src="./../../assets/mainPage/Ipad.png" class="img-fluid">
			<h1 class="text-center">
				Медицинская социальная платформа<br><small>для взаимодействия пациентов, врачей и специалистов в области здравоохранения</small>
			</h1>
		</div>
		<div class="main_page_auth">
			<div class="card p-75 my-100">
				<form id="auth_form" class="d-flex flex-column" v-on:submit.prevent="login">
					<legend class="text-center mb-75">Вход</legend>
					<input type="email" v-model="credentials.email" class="form_input" placeholder="Ваш email">
					<br>
					<input type="password" v-model="credentials.password" class="form_input" placeholder="Пароль">
					<br>
					<button type="submit" class="btn btn-primary mb-50">Вход</button>
					<div id="socialNetworks" class="d-flex justify-content-center"> 
						<a href="#" class="btn btn-outline-danger">
							<icon name="google-plus"></icon>
						</a>
						<a href="#" class="btn btn-outline-info">
							<icon name="facebook"></icon>
						</a>
						<a href="#" class="btn btn-outline-warning">
							<icon name="odnoklassniki"></icon>
						</a>
						<a href="#" class="btn btn-outline-info">
							<icon name="vk"></icon>
						</a>
					</div>
					<a href="#" class="mt-50">Забыли пароль?</a>
				</form>
			</div>
			<div class="card p-75">
				<form id="register_form" class="d-flex flex-column" v-on:submit.prevent="signup">
					<legend class="text-center mb-75">Регистрация</legend>
					<input type="email" v-model="register.email" class="form_input" placeholder="Ваш email">
					<br>
					<input type="password" v-model="register.password" class="form_input" placeholder="Пароль">
					<br>
					<button type="submit" class="btn btn-primary mb-50">Зарегистрироваться</button>
					<small class="text-center"> Регистрируясь, Вы соглашаетесь с нашими условиями<br> <a>пользовательского соглашения</a> </small>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import { baseAPI } from '../../config.js';
export default {
	name: 'defaultView', 
	data() {  
		return {
			endpoint: baseAPI + 'auth/profileInfo/',
			credentials: {
				email: '',
				password: '',
				error: {},
			},
			register: {
				email: '',
				password: '',
				isRegister: false,
				error: ''
			},
		}
	},
	methods: {
		login: function(){
			this.$auth.login(this, this.credentials);
		},
		signup: function(){
			this.$auth.signup(this, this.register);
			console.log(this.register);
		}
	},
	
}
</script>

<style>
body{
	background-color: #fff;
}
.main_page_logo{
	max-width: 65%;
}
#socialNetworks a{
	justify-content: center;
    display: flex;
	align-items: center;
	width: 40px;
	height: 32px;
    margin-right: 0.5rem;
}
#socialNetworks a::last-child{
	margin-right: 0;
}
/*.main_page_auth{
	width: 40%;
}
	/*	body{
				margin: 0px;
				
				font-family: Roboto, sans-serif;
				color: #292b2c;
			}
		.d-flex{
			display: flex;
		}
		.flex-column{
			flex-direction: column;
		}
		#mainContainer{
				margin-top: 50px;
			}
		.section_block{
			width:50%;
			padding-left: 15px;
			padding-right: 15px;
		}
		.img-fluid{
			max-width: 100%;
			height:auto;
		}
		h1,h2,h3,h4,h5,h6{
			margin-top: 0;
			font-family: inherit;
			font-weight: 500;
			line-height: 1.1;
			color: inherit;
		}
		h3{
			font-size: 1.75rem;
		}
		h5{
			font-size: 1.25rem;
		}
		form{
			box-sizing: border-box; 
		}
		.text-center{
			text-align: center;
		}
		.text-justify{
			text-align: justify;
		}
		.card{
			padding: 1rem;
			background-color: #fff;
    	border: 1px solid rgba(0, 0, 0, 0.125);
    	border-radius: 0.25rem;
		}
		.btn{
			display: inline-block;
			font-weight: normal;
			line-height: 1.25;
			text-align: center;
			white-space: nowrap;
			vertical-align: middle;
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			border: 1px solid transparent;
			padding: 0.5rem 1rem;
			font-size: 1rem;
			border-radius: 0.25rem;
			-webkit-transition: all 0.2s ease-in-out;
			-o-transition: all 0.2s ease-in-out;
			transition: all 0.2s ease-in-out;
			cursor: pointer;
		}
		#socialNetworks{
			display: flex;
			justify-content: center;
		}
		#socialNetworks .mx-50{
			height: 33px;
			width: 33px;
			display: flex;
			align-items: center; 
			border-radius: 3px;
			justify-content: center;
		}
		.text-primary{
			color: #329d81; 
		}
		.btn-primary{
			color: #329d81;
			background: white;
			border-color: #329d81;
		}
		.btn-primary:hover{
			background: #329d81;
			border-color: #329d81;
			color: white;
		}
		.btn-outline-danger{
			color: #d9534f;
			border:1px solid #d9534f; 
		}
		.btn-outline-danger:hover{
			color: white;
			border-color: #d9534f;
			background-color: #d9534f; 
		}
		.btn-outline-info{
			color: #5bc0de;
			border:1px solid #5bc0de; 
		}
		.btn-outline-info:hover{
			color: white;
			border-color: #5bc0de;
			background-color: #5bc0de; 
		}
		.btn-outline-warning{
			color: #f0ad4e;
			border:1px solid #f0ad4e; 
		}
		.btn-outline-warning:hover{
			color: white;
			border-color: #f0ad4e;
			background-color: #f0ad4e; 
		}
		.btn-block{
			display: block;
		}
		.mx-50{
			margin-left: 0.50rem;
			margin-right: 0.50rem;
		}
		.mb-0{
			margin-bottom: 0 !important;
		}
		.mb-50{
			margin-bottom: 0.50rem;
		}
		.mb-100{
			margin-bottom: 1rem;
		}
		.mt-100{
			margin-top: 1rem;
		}
		.form_input{
			display: block;
			padding: 0.5rem 0.75rem;
			font-size: 1rem;
			line-height: 1.25;
			color: #464a4c;
			background-color: #fff;
			background-image: none;
			-webkit-background-clip: padding-box;
			background-clip: padding-box;
			border: 1px solid rgba(0, 0, 0, 0.15);
			border-radius: 0.25rem;
			-webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
			transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
			-o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
			transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
			transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;
		}
		a{
			text-decoration: none;
			color:#267661;
		}






		#header{  
				position: fixed;
				height: 50px;
				top: 0;
				right: 0;
				left: 0;
				z-index: 1030;
				background-color: #329d81;
		}
		#GreetingsSection{
			display: flex;
		}
		#forDoctorsSection{
			display: flex;
			align-items: center;
		}
		#header .wrapper{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				width: calc(1140px - 1rem);
				max-width: 100%;
				margin: 0 auto;
		}
		#header .wrapper ul.header_menu_items{
			display: flex;
				flex-direction: row;
		}
		#header .wrapper ul.header_menu_items li a{
			display: block;
			color: #fff;
			line-height: 50px;
		}
		#header .wrapper .logo{
			display: block;
				height: 40px;
				margin: 5px 0;
		}
		#loadingBar {
				font-family: Roboto, sans-serif;
			font-size: 1rem;
			font-weight: normal;
			line-height: 1.5;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 100%;
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			text-align: center;
			color: #329d81;
			background: #fff;
			z-index: 99999;
		}
		.spinner > div {
			width: 18px;
			height: 18px;
			background-color: #329d81;

			border-radius: 100%;
			display: inline-block;
			-webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
			animation: sk-bouncedelay 1.4s infinite ease-in-out both;
		}
		.spinner .bounce1 {
			-webkit-animation-delay: -0.32s;
			animation-delay: -0.32s;
		}
		.spinner .bounce2 {
			-webkit-animation-delay: -0.16s;
			animation-delay: -0.16s;
		}
		@-webkit-keyframes sk-bouncedelay {
			0%, 80%, 100% { -webkit-transform: scale(0) }
			40% { -webkit-transform: scale(1.0) }
		}
		@keyframes sk-bouncedelay {
			0%, 80%, 100% { 
			-webkit-transform: scale(0);
			transform: scale(0);
			} 40% { 
			-webkit-transform: scale(1.0);
			transform: scale(1.0);
			}
		}
			@media (min-width: 992px) {
					.container{
						width: 960px;
						max-width: 100%;
						margin-left: auto; 
						margin-right: auto;
					}
			}
			@media (min-width: 1200px) {
					.container{
						width: 1140px;
						max-width: 100%;
						margin-left: auto; 
						margin-right: auto;
					}
			}*/
		</style>