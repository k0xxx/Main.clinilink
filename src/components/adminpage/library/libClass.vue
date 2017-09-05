<template>
	<div id="libraryEdit">
		<ul>
			<li v-for="libClass in libraryClassList">{{libClass.class_sub_index}} - {{libClass.class_id}} <br/> <small>{{libClass.category_list}}</small></li>
		</ul>
		<ul>
			<li v-for="libCategory in libraryCategoryList">{{libCategory.category_sub_index}} {{libCategory.category_id}}</li>
		</ul>
		<ul>
			<li v-for="libItem in libraryItemList">{{libItem.sub_index}} {{libItem.item_id}}</li>
		</ul>
  </div>
</template>

<script>
import { baseAPI } from '../../../config';
export default {
  name: 'classItem',
  data() {
    return {
      msg: '�������� �����������',
	  endpointClasses: baseAPI + 'libraryAdminpage/getClasses',
	  endpointCategories: baseAPI + 'libraryAdminpage/getCategories',
	  endpointItems: baseAPi + 'libraryAdminpage/getItems',
	  libraryClassList: [],
	  libraryCategoryList: [],
	  libraryItemList: [],
    }
  },
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
		this.getClasses();
		this.getCategories();
		this.getItems();
	} 
}
</script>

<style>
    
</style>    