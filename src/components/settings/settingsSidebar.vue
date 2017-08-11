<template>
	<aside class="sideBar">
		<div class="settingsBar">
			<router-link to="/settings" class='list-item-filter p-50'>Общие</router-link>
			<router-link to="/settings/contacts" class='list-item-filter p-50'>Контакты</router-link>
			<router-link to="/settings/security" class='list-item-filter p-50'>Безопасность</router-link>
			<router-link to="/settings/privacy" class='list-item-filter p-50'>Приватность</router-link>
		</div>
	</aside> 
</template>

<script>
export default {  
  name: 'settingsBar', 
  data () {  
    return {
     
    }
  },
	methods: {
	
	}  
}
</script>

<style>
.sideBar .settingsBar a.router-link-exact-active{ 
	background-color: #329d81 !important;
	color: white !important; 
}
</style>