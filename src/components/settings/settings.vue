<template>
	<div id="view" class="withSideBar">
		<div id="settings" class="card">
			<div class="settingsContent">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'settings',
	data() {
		return {
		
		}
	},
	methods: {
		
	},
	created: function(){
		
	}
}
</script>

<style>
#settings .settingsBar{
	display: flex;
	border-bottom: 1px solid #ddd;
}
#settings .settingsBar a{
	padding: 0.5rem 0.5rem;
    margin: 0 0.75rem;
}
#settings .settingsBar a.router-link-exact-active{
    border-bottom: 2px solid #329d81;
}
</style>