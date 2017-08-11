<template>
	<div id="modal-template">
		<transition name="modal">
			<div class="modal-mask">
				<div class="modal-wrapper">
					<div class="modal-container text-center">
						<div id="closeModalRegister" class="d-flex" @click="$emit('close')">
							<icon name="times" scale="1"></icon> 
						</div>
						<div class="modal-header-register p-100">
							<h3>Регистрация</h3>
						</div>
						<div class="modal-body-register p-100">
							<div v-if="!isRegister">
								<span>Пожалуйста, укажите Ваш<br>E-mail и пароль</span>
								<form class="d-flex flex-column" v-on:submit.prevent="signup">
									<div class="input-container"> 
										<label for="registerEmail" class="text-center text-w-bold">E-mail</label> 
										<input type="email" name="email" id="registerEmail" v-model="register.email" class="input-large" placeholder="Введите Ваш e-mail"> 
									</div>
									<div class="input-container">
										<label for="registerPassword" class="text-center text-w-bold">Пароль</label>
										<input type="password" name="password" id="registerPassword" v-model="register.password" class="input-large" placeholder="Введите Ваш пароль"> 
									</div>
									<button type="submit" class="btn-primary btn-xlarge mt-100">Зарегестрироваться</button>
								</form>
							</div>
							<div v-else>
								Вы зарегистрированы! Пожалуйста проверте свою почту для подтверждения регистрации!
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'modalRegister', 
	data() {  
		return {
			register: {
				email: '',
				password: ''
			},
			isRegister: false
		}
	},
	methods: {
		signup: function(){
			this.$auth.signup(this, this.register);
		}
	}
}
</script> 

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  position: relative;
} 
.modal-header-register h3{
  margin: 0px !important;  
}
.modal-header-register{
  background-color: #329d81;
  color: white;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
#closeModalRegister{
        position: absolute;
        top: 6px;
        right: 9px;
        color: white;
        cursor: pointer;  
}    
</style>