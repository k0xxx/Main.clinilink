<template>
	<div class="modal">
		<transition name="modal">
			<div class="modal-mask">
				<div class="modal-wrapper">
					<div class="modal-container">
						<div class="modal-header">
							<h3 class="px-100 text-center">Новое сообщение</h3>
							<a href="#" class="close-icon" v-on:click.prevent="$emit('close')">
								<icon name="times" scale="1"></icon> 
							</a>
						</div>
						<div class="modal-body">
							<div class="p-100">
								<form v-on:submit.prevent="newMessage">
									<div>
										<textarea type="text" class="form_input w-100" name="message" v-model="newMessageForm.text"></textarea>
									</div>
									<button class="btn btn-primary mx-auto" type="submit">Отправить</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import { baseAPI } from '../../config.js';
export default {
	name: 'newMessageModal', 
	data() {  
		return {
			endpoint: baseAPI + 'messages',
			newMessageForm: {
				message: '',
				contact_id: this.contact_id,
			}
		}
	},
	props: ['contact_id'],
	methods: {
		newMessage: function(){
			this.$http.put(this.endpoint, this.newMessageForm).then((response) => {
				console.log(response);
				this.$emit('close');
			}, function(err){
				console.log(err);
			})
		}
	}
}
</script> 

<style>
/*#newMessageModal{
    display: block;
}
.message_overlay{
	position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1050;
}
.message_block{
	display: block;
    z-index: 1060;
    background: #fff;
    width: 800px;
    margin: 0 auto;
    margin-top: 7%;
    overflow: hidden;
    max-width: 100%;
}
/*#newMessageModal .modal-mask {
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

#newMessageModal .modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

#newMessageModal .modal-container {
  width: 600px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  position: relative;
} 

#newMessageModal .profileTypeSelect a{
	
}
#newMessageModal .profileTypeSelect a img:after{
	content: ''
}
#newMessageModal .profileTypeSelect a.active img{
	
}

#newMessageModal .modal-enter {
  opacity: 0;
}

#newMessageModal .modal-leave-active {
  opacity: 0;
}

#newMessageModal .modal-enter .modal-container,
#newMessageModal .modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
#closeModalRegister{
        position: absolute;
        top: 6px;
        right: 9px;
        color: white;
        cursor: pointer;  
}*/ 
</style>