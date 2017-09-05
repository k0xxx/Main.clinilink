<template>
	<div id="categoryEditor" class="d-flex flex-column">
		<form  v-on:submit.prevent="updateCategory" class="d-flex flex-column">
			<button>Сохранить</button>
			<h3>Редактор категории</h3>
			<label>Название категории</label>
			<textarea v-model="libCategory.category_name">{{libCategory.category_name}}</textarea>
			<label>Номера связанных заболеваний</label>
			<textarea v-model="libCategory.items_list">{{libCategory.items_list}}</textarea>
			<label>Id категории</label>
			<textarea v-model="libCategory.category_id">{{libCategory.category_id}}</textarea>
			<label>Индекс категории (для сортировки)</label>
			<textarea v-model="libCategory.category_index">{{libCategory.category_index}}</textarea>
			<label>Диапазон заболеваний</label>
			<textarea v-model="libCategory.category_sub_index">{{libCategory.category_sub_index}}</textarea>
			<label>Прямой URL категории</label>
			<textarea v-model="libCategory.main_url">{{libCategory.main_url}}</textarea>
		</form>
	</div>
</template>

<script>
export default {
	name: 'CategoryEditor',
	data() {
		return {
			endpointCategory: 'https://api.clinilink.org/api/adminpage/library/getCategories/'+this.$route.params.categoryId,
			libCategory: {}
		}
	},
	methods: {
		getCategoryById: function(){
			this.$http.get(this.endpointCategory).then((response) => {
				console.log(response.data);
				this.libCategory = response.data;
			})
		},
		updateCategory: function(){
			this.$http.put(this.endpointCategory, this.libCategory).then((response) => {
				console.log(response);
				//this.libItem = response.data;
			});
		}
    },
	created: function(){
		this.getCategoryById();
	} 
}
</script>

<style>
    
</style>    