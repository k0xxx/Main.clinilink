<template>
	<div id="itemEditor" class="d-flex flex-column">
		<form  v-on:submit.prevent="updateItem" class="d-flex flex-column">
			<h3>Редактор заболевания</h3>
			<button>Сохранить</button>
			
			<label>Id заболевания</label>
			<textarea v-model="libItem.item_id">{{libItem.item_id}}</textarea>
			<label>Название заболевания</label>
			<textarea v-model="libItem.name">{{libItem.name}}</textarea>
			<label>Прямой URL заболевания</label>
			<textarea v-model="libItem.main_url">{{libItem.main_url}}</textarea>
			<label>Индекс по МКБ</label>
			<textarea v-model="libItem.sub_index">{{libItem.sub_index}}</textarea>
			<label>Индекс заболевания (сортировка)</label>
			<textarea v-model="libItem.index">{{libItem.index}}</textarea>
			<label>Тип заболевания</label>
			<select v-model="libItem.item_type">
				<option value="">Не выбрано</option>
				<option value="disease_disease">Заболевание</option>
				<option value="allergies">Алергия</option>
				<option value="injuries">Травма</option>
				<option value="operations">Операция</option>
			</select>
			<label>Ключевые слова</label>
			<textarea v-model="libItem.key_words">{{libItem.key_words}}</textarea>
			<label>Описание</label>
			<vue-editor id="description" v-model="libItem.description"></vue-editor>
			<label>Этиология</label>
			<vue-editor id="cause" v-model="libItem.cause"></vue-editor>
			<label>Клиническая картина</label>
			<vue-editor id="clinics" v-model="libItem.clinics"></vue-editor>
			
			<label>Лечение (?)</label>
			<vue-editor id="treatment" v-model="libItem.treatment"></vue-editor>
			
			<label>Основные синдромы(сиптомы):</label>
			<vue-editor id="symptom" v-model="libItem.symptom"></vue-editor>
			
			<label>Профилактика (?)</label>
			<vue-editor id="prophylaxis" v-model="libItem.prophylaxis"></vue-editor>
			
			<label>Прогноз (?)</label>
			<vue-editor id="prognosis" v-model="libItem.prognosis"></vue-editor>
			
			<label>Патогенез</label>
			<vue-editor id="pathogenesis" v-model="libItem.pathogenesis"></vue-editor>
			
			<label>Диагностика</label>
			<vue-editor id="diagnosis" v-model="libItem.diagnosis"></vue-editor>
	
			<!--<label>Разновидности</label>
			<textarea v-model="libItem.spec">{{libItem.spec}}</textarea>-->
			<!--<label>Статистика (?)</label>
			<textarea v-model="libItem.people_stat">{{libItem.people_stat}}</textarea>-->
			<!--<label>Препараты (не используется пока)</label>
			<textarea v-model="libItem.drugs">{{libItem.drugs}}</textarea>-->
		</form>
		
	</div>
</template>

<script>
import { VueEditor } from 'vue2-quill-editor'

export default {
	name: 'itemEditor',
	data() {
		return {
			endpointItem: 'https://api.clinilink.org/api/adminpage/library/getItems/'+this.$route.params.itemId,
			libItem: {},
		}
	},
	components: {VueEditor},
	methods: {
		getItemById: function(){
			this.$http.get(this.endpointItem).then((response) => {
				console.log(response.data);
				this.libItem = response.data;
			});
		},
		updateItem: function(){
			this.$http.put(this.endpointItem, this.libItem).then((response) => {
				console.log(response);
				//this.libItem = response.data;
			});
		}
    },
	created: function(){
		this.getItemById();
	} 
}
</script>

<style>
.quillWrapper{
	display: contents;
}
</style>    