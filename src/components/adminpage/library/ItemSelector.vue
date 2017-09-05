<template>
	<div id="itemSelector">
		<h3>Список заболеваний</h3>
		<ul v-if="!$route.params.itemId">
			<li v-for="libItem in libraryItemsList" v-bind:key="libItem._id">
				<router-link :to="'/adminpage/library/libItem/'+libItem._id" >{{libItem.item_id}} - {{libItem.sub_index}} - {{libItem.name}}</router-link>
			</li>
		</ul>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'itemSelector',
	data() {
		return {
			endpointItems: 'https://api.clinilink.org/api/adminpage/library/getItems',
			libraryItemsList: []
		}
	},
	methods: {
		getItems: function(){
			this.$http.get(this.endpointItems).then((response) => {
				console.log(response.data);
				this.libraryItemsList = response.data;
			});
		},
    },
	created: function(){
		this.getItems();
	} 
}
</script>

<style>
    
</style>    