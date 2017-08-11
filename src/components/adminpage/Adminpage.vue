<template>
	<div id="view" class="noSideBar">
		<div id="adminpage" class="card p-100">
			<h3 class="text-center">{{title}}</h3>
			<router-link to="/adminpage/library">Редактор справочника</router-link>
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
export default {
	name: 'adminpage',
	data() {
		return {
			title: 'AdminPage',
		}
	},
	methods: {
	
    },
	created: function(){
	
	} 
}
</script>

<style>
    
</style>    