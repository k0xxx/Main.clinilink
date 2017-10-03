<template>
	<aside class="sideBar">
		<div class="w-100">
			<form>
				<div>
					<label for="">Пользователь</label>
					<select class="form_input w-100" v-model="filter.type" v-on:click="$emit('refreshFilter')">
						<option value="">Все</option>
						<option value="0">Только пациенты</option> 
						<option value="1">Только специалисты</option>
						<option value="3">Только врачи</option>
					</select>
				</div>
				<div>
					<label for="">Cтрана</label>
					<input type="search" class="form_input w-100" placeholder="Страна" v-model="filter.country" v-on:keyup="$emit('refreshFilter')">
				</div>
				<div>
					<label for="">Город</label>
					<input type="search" class="form_input w-100" placeholder="Город"  v-model="filter.city" v-on:keyup="$emit('refreshFilter')">
				</div>
				<div>
			  		<label for="">Навык/Интерес</label>
					<input type="search" class="form_input w-100" placeholder="Навык/Интерес" v-model="filter.key_words" v-on:keyup="$emit('refreshFilter')">
				</div>
				<div v-if="filter.type == '0'">
					<label for="">Заболевание</label>
					<input type="search" class="form_input w-100" placeholder="Заболевание" v-model="filter.pat_main_disease" v-on:keyup="$emit('refreshFilter')">
				</div>
				<div v-if="filter.type == '1'">
					<label for="">Должность</label>
					<select class="form_input w-100" v-model="filter.med_position" v-on:click="$emit('refreshFilter')">
						<option>Не выбрано</option>
						<option>Акушер</option> 
					  	<option>Врач</option>
					  	<option>Лор</option>
				  	</select>
				</div>
				<div v-if="filter.type == '3'">
			  		<label for="">Специализация</label>
					<select class="form_input w-100" v-model="filter.doc_specialization" v-on:click="$emit('refreshFilter')">
						<option>Не выбрано</option>
						<option>Акушер</option>
						<option>Врач</option>
						<option>Лор</option>
					</select>
				</div>
		   	</form>
		</div>
	</aside>
</template>

<script>
export default {
	name: 'searchSidebar',
	props: {
		filter: {
			type: Object,
      		required: true
		},
	},
  	data() {
    	return {
			
		}
	}
}
</script>