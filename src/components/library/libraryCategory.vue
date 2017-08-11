<template>
	<ul class="libraryItems">
		<li v-for="item in itemsList">
			<router-link :to="{ name: 'libraryItem', params: { itemUrl: item.main_url }}"><strong class="mr-50">({{item.sub_index}})</strong>{{item.name}}</router-link>
		</li>
	</ul>
</template>

<script>
export default {
  name: 'libraryCategory',
  data() {
    return {
      endpoint: 'http://api.clinilink.org/api/library/'+this.$route.params.classUrl+'/'+this.$route.params.categoryUrl,
      itemsList: {}
    }
  },
  methods: {
	getCategory: function(){
		this.$http.get(this.endpoint).then((response) => {
			console.log(response.data.libraryCategoryItem);
			this.itemsList = response.data.libraryCategoryItem.items_ref;
		}, function(err){
			console.log(err); 
		})
	},
  },
  created: function(){
		this.getCategory();
	}
}
</script>

<style>

</style>