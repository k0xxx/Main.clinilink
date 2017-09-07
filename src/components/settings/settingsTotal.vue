<template>
	<div>
		<div class="headerSettings p-100 d-flex align-i-center">  
			<h4 class="m-0">Общее</h4>
		</div>
		<div class="p-75">
			<form v-on:submit.prevent="saveSettings">
				<div class="p-50">
					<label for="lastName" class="pr-75">Фамилия</label>
					<input type="text" name="lastName" class="form_input" v-model="settings.lastName" placeholder="Введите вашу фамилию" autocomplete="off">
				</div>
				<div class="p-50">
					<label for="firstName" class="pr-75">Имя</label>
					<input type="text" name="firstName" class="form_input"  v-model="settings.firstName" placeholder="Введите ваше имя" autocomplete="off">
				</div>
				<div class="p-50">
					<label for="surName" class="pr-75">Отчество</label>
					<input type="text" name="surName" class="form_input"  v-model="settings.surName" placeholder="Введите ваше отчество" autocomplete="off">
				</div>
				<div class="p-50">
				<label for="gender" class="pr-75">Пол</label>
					<select name="gender" class="form_input" v-model="settings.gender">
						<option value="">Не выбрано</option>
						<option value="Мужской">Мужской</option>
						<option value="Женский">Женский</option>
					</select>
				</div>
				<div class="p-50">
					<label for="birthday" class="pr-75">Дата рождения</label>
					<input type="text" class="form_input"  name="birthday" v-model="settings.birthday">
				</div>
				<!--status 0-->
				<div class="p-50">
					<label for="bloodType" class="pr-75">Группа крови</label>
					<select name="bloodType" class="form_input"  v-model="settings.bloodType">
						<option value="">Не выбрано</option>
						<option v-for="blood_type in sub.blood_type_list">{{blood_type}}</option>
					</select>
				</div>
				<div class="p-50">
					<label for="familyStatus" class="pr-75">Семейное положение</label>
					<select name="familyStatus" class="form_input"  v-model="settings.familyStatus">
						<option value="">Не выбрано</option>
						<option v-for="family_status in sub.family_status_list">{{family_status}}</option>
					</select>
				</div>
				<!--status 1-->
				<div class="p-50">
					<label for="doc_work_place" class="pr-75">Основное место работы</label>
					<select name="doc_work_place" class="form_input"  v-model="settings.doc_work_place">
						<option value="">Не выбрано</option>
						<option v-for="work_place in sub.doc_work_place_list">{{work_place}}</option>
					</select>
				</div>
				<div class="p-50">
					<label for="doc_specialization_experience" class="pr-75">Рабочий стаж</label>
					<input type="number" name="doc_specialization_experience" class="form_input" min="0" max="80" maxlength="2" v-model="settings.doc_specialization_experience">
				</div>
				<div class="p-50">
					<label for="doc_category" class="pr-75">Категория</label>
					<select name="doc_category" class="form_input" v-model="settings.doc_category">
						<option value="">Не выбрано</option>
						<option v-for="category in sub.doc_category_list">{{category}}</option>
					</select>
				</div>	
				<div class="p-50">			
					<label for="med_position" class="pr-75">Должность</label>
					<select name="med_position" class="form_input" v-model="settings.med_position">
						<option v-for="position in sub.med_position_list">{{position}}</option>
					</select>
				</div>
				<div class="p-50 text-center">
					<button type="submit" class="btn btn-primary btn-large">Сохранить</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { baseAPI } from '../../config.js';

export default {
	name: 'settingsTotal',
	data() {
		return {
			userId: '',
			settings: {},
			endpoint: baseAPI + 'profileSettings/',
			sub: {
				blood_type_list: ["I(+)", "I(-)", "II(+)", "II(-)", "III(+)", "III(-)", "IV(+)", "IV(-)"],
				family_status_list: ["Женат / Замужем", "Не женат / Не замужем"],
				doc_work_place_list: ["Полная занятость", "Безработный"],
				doc_category_list: ["Вторая категория", "Первая категория", "Высшая категория"],
				med_position_list: ["Акушер", "Гигиенист стоматологический", "Заведующий молочной кухней", "Заведующий здравпунктом", "Заведующий фельдшерско-акушерским пунктом", 
				"Заведующий кабинетом медицинской профилактики", "Зубной техник", "Инструктор-дезинфектор", "Инструктор по гигиеническому воспитанию", "Инструктор по лечебной физкультуре", 
				"Лаборант", "Медицинская сестра", "Медицинская сестра-анестезист", "Медицинская сестра семейного врача", "Медицинская сестра диетическая", 
				"Медицинская сестра медико-социальной помощи", "Медицинская сестра палатная (постовая)", "Медицинская сестра патронажная", "Медицинская сестра перевязочной",
				"Медицинская сестра по косметологии", "Медицинская сестра по массажу", "Медицинская сестра приемного отделения", "Медицинская сестра процедурной", 
				"Медицинская сестра по реабилитации", "Медицинская сестра стерилизационной", "Медицинская сестра по физиотерапии", "Медицинский дезинфектор", "Медицинский оптик-оптометрист", 
				"Медицинский регистратор", "Операционная медицинская сестра", "Рентгенолаборант", "Старшая медицинская сестра", "Фельдшер", "Фельдшер скорой медицинской помощи", 
				"Младшая медицинская сестра по уходу за больными", "Санитар", "Санитар-водитель", "Сестра-хозяйк", "Провизор", "Фармацевт", "Фасовщик"]
			}
		}
	},
	components: {
		
	},
	methods: {
		getProfileSettings: function(){
			this.$http.get(this.endpoint).then((response) => {
				console.log(response.data.profileSettings);
				this.settings = response.data.profileSettings;
			}, function(err){
				console.log(err); 
			})
		},
		saveSettings: function(){
			this.$http.post(this.endpoint, this.settings).then((response) => {
				console.log(response);
				//this.settings = response.data.profileSettings;
			}, function(err){
				console.log(err); 
			})
		}
	},
	created: function(){
		this.userId = this.$auth.getUserId();
		this.getProfileSettings();
	}
}
</script>

<style>
.headerSettings{
	border-bottom: 1px solid #ddd;
	background: #329d81;
    color: white;
}
</style>