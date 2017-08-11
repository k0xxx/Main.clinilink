<template>
	<div id="libraryEdit">
		<h3>Сперва нужно выбрать что мы сегодня редактируем...</h3>
		<router-link to="/adminpage/library/libClass">Редактор классов</router-link>
		<router-link to="/adminpage/library/libCategory">Редактор категорий</router-link>
		<router-link to="/adminpage/library/libItem">Редактор заболеваний</router-link>
		<router-view></router-view>
	</div>
</template>

<script>
//import libClass from './library/libClass.vue'
//import libCategory from './library/libCategory.vue'
//import libItem from './library/libItem.vue'

export default {
  name: 'library',
  data() {
    return {
      msg: 'Редактор справочника',
	 // endpointClasses: 'http://api.clinilink.org/api/libraryAdminpage/getClasses',
	 // endpointCategories: 'http://api.clinilink.org/api/libraryAdminpage/getCategories',
	 // endpointItems: 'http://api.clinilink.org/api/libraryAdminpage/getItems',
	 // libraryClassList: [],
	 // libraryCategoryList: [],
	 // libraryItemList: [],
    }
  },
  //components: {libClass, libCategory, libItem},
  methods: {
		getItems: function(){
			this.$http.get(this.endpointItems).then(function(response){
				console.log(response.data.libraryItemList);
				this.libraryItemList = response.data.libraryItemList;
			}, function(err){
				console.log(err); 
			})
		},
		getCategories: function(){
			this.$http.get(this.endpointCategories).then(function(response){
				console.log(response.data.libraryCategoryList);
				this.libraryCategoryList = response.data.libraryCategoryList;
			}, function(err){
				console.log(err); 
			})
		},
		getClasses: function(){
			this.$http.get(this.endpointClasses).then(function(response){
				console.log(response.data.libraryClassList);
				this.libraryClassList = response.data.libraryClassList;
			}, function(err){
				console.log(err); 
			})
		},
    },
	created: function(){
		//this.getClasses();
		//this.getCategories();
		//this.getItems();
	} 
}
</script>

<style>
    
</style>    