<template>
	<div id="classEditor" class="d-flex flex-column">
		<form  v-on:submit.prevent="updateClass" class="d-flex flex-column">
			<h3>Редактор класса</h3>
			<button>Сохранить</button>
			<label>Название класса</label>
			<textarea v-model="libClass.class_name">{{libClass.class_name}}</textarea>
			<label>Номера связанных категорий</label>
			<textarea v-model="libClass.category_list">{{libClass.category_list}}</textarea>
			<label>Связанные категории MongoId</label>
			<textarea v-model="libClass.category_ref">{{libClass.category_ref}}</textarea>
			<label>Id класса</label>
			<textarea v-model="libClass.class_id">{{libClass.class_id}}</textarea>
			<label>Индекс класса (для сортировки)</label>
			<textarea v-model="libClass.class_index">{{libClass.class_index}}</textarea>
			<label>Диапазон категорий</label>
			<textarea v-model="libClass.class_sub_index">{{libClass.class_sub_index}}</textarea>
			<label>Прямой URL класса</label>
			<textarea v-model="libClass.main_url">{{libClass.main_url}}</textarea>
		</form>
	</div>
</template>

<script>
export default {
	name: 'ClassEditor',
	data() {
		return {      
			endpointClass: 'http://api.clinilink.org/api/adminpage/library/getClasses/'+this.$route.params.classId,
			libClass: {}
		}
	},
	methods: {
		getClassById: function(){
			this.$http.get(this.endpointClass).then((response) => {
				console.log(response.data);
				this.libClass = response.data;
			})
		},
		updateClass: function(){
			this.$http.put(this.endpointClass, this.libClass).then((response) => {
				console.log(response);
				//this.libItem = response.data;
			});
		}
    },
	created: function(){
		this.getClassById();
	} 
}
</script>

<style>
    
</style>    