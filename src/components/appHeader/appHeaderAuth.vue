<template>
	<div id="header">
		<div class="wrapper">
			<img src="../../assets/logo.png" class="logo">
			<ul class="header_menu_items d-flex">
				<li class="d-flex align-i-center">
					<a href="#" class="mx-50 d-flex"><icon name="bell-o"></icon></a>
				</li>
				<li class="d-flex align-i-center">
					<a href="#" class="mx-50 d-flex"><icon name="question-circle-o"></icon></a>
				</li>
				<li class="d-flex align-i-center">
					<a href="#" v-on:click.stop.prevent="logout" class="ml-50 d-flex align-i-center"><icon name="sign-out" class="mr-50"></icon> <span>Выход</span></a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script> 
export default {
	name: 'appHeaderAuth',   
  	data() { 
    	return {
      		msg: 'Welcome to Your Vue.js App'
    	}
	},
	methods: {
		logout: function(){
			this.$auth.logout(this);
		}
	}
}
</script>

<style lang="scss" src="./header.scss"></style>