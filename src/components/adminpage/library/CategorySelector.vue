<template>
	<div id="categorySelector">
		<div v-if="!$route.params.categoryId">
			<h3>Список категорий</h3>
			<ul>
				<li v-for="libCategory in libraryCategoriesList" v-bind:key="libCategory._id">
					<router-link :to="'/adminpage/library/libCategory/'+libCategory._id">{{libCategory.category_id}} - {{libCategory.category_sub_index}} - {{libCategory.category_name}}</router-link>
				</li>
			</ul>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
import { baseAPI } from '../../config.js';
export default {
	name: 'CategorySelector',
	data() {
		return {
			endpointCategories: baseAPI + 'adminpage/library/getCategories',
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