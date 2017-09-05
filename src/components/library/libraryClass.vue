<template>
	<ul class="libraryCategorys">
		<li v-for="category in categorysList">
			<router-link :to="{ name: 'libraryCategory', params: { categoryUrl: category.main_url }}"><strong class="mr-50">({{category.category_sub_index}})</strong>{{category.category_name}}</router-link>
			<router-view v-if="$route.params.categoryUrl == category.main_url"></router-view>
		</li>
	</ul>
</template>

<script>
import { baseAPI } from '../../config.js';
export default {
  name: 'libraryClass',
  data() {
    return {
      endpoint: baseAPI + 'library/'+this.$route.params.classUrl,
      categorysList: {}
    }
  },
  methods: {
	getClass: function(){
		this.$http.get(this.endpoint).then((response) => {
			console.log(response.data.libraryClassItem);
			this.categorysList = response.data.libraryClassItem.category_ref;
		}, function(err){
			console.log(err); 
		})
	},
  },
  created: function(){
		this.getClass();
	}
}
</script>

<style>

</style>