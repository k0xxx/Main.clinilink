<template>
	<div id="categorySelector">
		<div v-if="!$route.params.categoryId">
			<h3>Список категорий</h3>
			<ul>
				<li v-for="libCategory in libraryCategoriesList" v-bind:key="libCategory._id">
					<router-link :to="'/adminpage/library/libCategory/'+libCategory._id" v-if="libCategory.items_list.length == 0">{{libCategory.category_id}} - {{libCategory.category_sub_index}} - {{libCategory.category_name}}</router-link>
				</li>
			</ul>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'CategorySelector',
	data() {
		return {
			endpointCategories: 'http://api.clinilink.org/api/adminpage/library/getCategories',
			libraryCategoriesList: []
		}
	},
	methods: {
		getCategories: function(){
			this.$http.get(this.endpointCategories).then((response) => {
				console.log(response.data);
				this.libraryCategoriesList = response.data;
			})
		},
    },
	created: function(){
		this.getCategories();
	} 
}
</script>

<style>
    
</style>    