<template>
	<div class="measurementItem card">
		<div class="measurementItemTitle p-75">
			<a href="#" @click.prevent="$emit('toogle')">
				<span v-if="isFullWidget"><icon name="arrow-left"></icon>Назад</span>
				<span><icon :name=item.icon class="mr-50"></icon>{{item.title}}</span>
				<button class="btn btn-primary d-flex btn-middle" v-on:click="showModal = true"><icon name="pencil"></icon></button>
			</a>
		</div>
		<div v-if="!isFullWidget" class="p-75">
			Уровень активности - Подвижный, Физическая культура - Баскетболл
		</div>
		<div v-if="isFullWidget" class="p-75">
			<form v-on:submit.prevent="saveGeneralInformation">
				<div class="d-flex mb-75">
					<label for="activity_level" class="mr-50">Уровень активности</label>
					<select id="activity_level" name="activity_level" v-model="generalInformationForm.activity_level" class="input-middle px-50">
						<option value="">Не выбрано</option>
						<option value="Подвижный">Подвижный</option>
						<option value="Малоподвижный">Малоподвижный</option>
						<option value="Сидячий">Сидячий</option>
						<option value="Работаю на даче">Работаю на даче</option>
					</select>
				</div>
				<div class="d-flex flex-column mb-75">
					<label for="physical_culture">Физическая культура</label>
					<textarea id="physical_culture" name="physical_culture" v-model="generalInformationForm.physical_culture" class="" rows="2" placeholder="Опишите ваши занятия спортом..."></textarea>
				</div>
				<div class="d-flex flex-column mb-75">
					<label for="food_settings">Питание</label>
					<textarea id="food_settings" name="food_settings" v-model="generalInformationForm.food_settings" class="" rows="2" placeholder="Примерное меню на день..."></textarea>
				</div>
				<div class="d-flex mb-75">
					<label for="work_type" class="mr-50">Уровень тяжести работы</label>
					<select id="work_type" class="input-middle px-50" name="work_type" v-model="generalInformationForm.work_type">
						<option value="">Не выбрано</option>
						<option value="Легкий">Легкий</option>
						<option value="Средний">Средний</option>
						<option value="Тяжелый">Тяжелый</option>
					</select>
				</div>
				<div class="d-flex mb-75">
					<label for="sleep_type" class="mr-50">Качество сна</label>
					<select id="sleep_type" name="sleep_type" class="input-middle px-50" v-model="generalInformationForm.sleep_type">
						<option value="">Не выбрано</option>
						<option value="Быстрое засыпание">Быстрое засыпание</option>
						<option value="Медленное засыпание">Медленное засыпание</option>
					</select>
				</div>
				<div class="d-flex mb-75">
					<label for="sleep_duration" class="mr-50">Продолжительность сна</label>
					<div class="input-group">
						<input id="sleep_duration" name="sleep_duration" type="number" class="input-middle px-50" value="120" v-model="generalInformationForm.sleep_duration">
						<span class="input-group-addon" id="sleep_duration-addon">Часов в сутки</span>
					</div>
				</div>
				<div class="d-flex mb-75">
					<label for="stress_type" class="mr-50">Стрессовые ситуации</label>
					<select id="stress_type" class="input-middle px-50" name="stress_type" v-model="generalInformationForm.stress_type">
						<option value="">Не выбрано</option>
						<option value="Частые">Частые</option>
						<option value="Не частые">Не частые</option>
						<option value="Редкие">Редкие</option>
						<option value="Постоянные">Постоянные</option>
					</select>
				</div>
				<div class="d-flex mb-75">
					<label for="sex_life" class="mr-50">Половая жизнь</label>
					<select id="sex_life" class="input-middle px-50" name="sex_life" v-model="generalInformationForm.sex_life">
						<option value="">Не выбрано</option>
						<option value="Наличие постоянного партнера">Наличие постоянного партнера</option>
						<option value="Беспорядочные половые связи">Беспорядочные половые связи</option>
						<option value="Отсутствие половой жизни">Отсутствие половой жизни</option>
					</select>
				</div>
				<div class="d-flex mb-75">
					<label for="sex_contraception" class="mr-50">Методы контрацепции</label>
					<select class="input-middle px-50" name="sex_contraception" v-model="generalInformationForm.sex_contraception">
						<option value="">Не выбрано</option>
						<option value="Презервативы">Презервативы</option>
						<option value="Гормональные средства">Гормональные средства</option>
						<option value="Спермициды">Спермициды</option>
						<option value="Без предохранения">Без предохранения</option>
						<option value="Другое">Другое</option>
					</select>
				</div>
				<div class="d-flex mb-75">
					<label for="home_pets" class="mr-50">Наличие домашних животных</label>
					<select id="home_pets" class="input-middle px-50" name="home_pets" v-model="generalInformationForm.home_pets">
						<option value="">Не выбрано</option>
						<option value="Есть животные">Есть животные</option>
						<option value="Нет животных">Нет животных</option>
					</select>
				</div>
				
				<div class="card p-75">
					<label for="bad_habbits">Вредные привычки</label>
					<div class="form-group">
						<label for="smoking_years" class="col-sm-2 control-label" style="text-align: left;">Курение</label>
						<div class="col-sm-4">
							<div class="input-group">
								<input type="number" class="form-control" name="smoking_years" v-model="generalInformationForm.smoking_years" id="smoking_years" min="0" max="99" maxlength="2" value="10">
								<span class="input-group-addon" id="smoking_years-addon">Лет</span>
							</div>
						</div>
						<div class="col-sm-6">
							<div class="input-group">
								<input type="number" class="form-control" name="smoking_counter" v-model="generalInformationForm.smoking_counter" id="smoking_counter" min="0" max="99" maxlength="2" value="2">
								<span class="input-group-addon" id="smoking_counter-addon">Пачек в день</span>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="alcohol_years" class="col-sm-3 control-label" style="text-align: left;">Алкоголь</label>
						<div class="col-sm-9">
							<div class="input-group">
								<input type="number" class="form-control" name="alcohol_years" v-model="generalInformationForm.alcohol_years" id="alcohol_years" min="0" max="99" maxlength="2" value="1">
								<span class="input-group-addon" id="alcohol_years-addon">Лет</span>
							</div>
						</div>
					</div>
					<div class="form-group">
						<label for="drugs_years" class="col-sm-3 control-label" style="text-align: left;">Наркотики</label>
						<div class="col-sm-9">
							<div class="input-group">
								<input type="number" class="form-control" name="drugs_years" v-model="generalInformationForm.drugs_years" id="drugs_years" min="0" max="99" maxlength="2" value="0">
								<span class="input-group-addon" id="drugs_years-addon">Лет</span>
							</div>
						</div>
					</div>
				</div>
				<button class="btn btn-primary" type="submit">Сохранить</button>	
			</form>
		</div>
	</div>
</template>

<script>
export default {
	name: 'widgetGeneralInformation',
	data() {
		return {
			endpoint: 'http://api.clinilink.org/api/measurements/',
			item: {title: 'Общая информация', icon: 'bed', type: 'generalInformation'},
			generalInformationForm: {
				activity_level: '',
				physical_culture: '',
				food_settings: '',
				work_type: '',
				sleep_type: '',
				sleep_duration: '',
				stress_type: '',
				sex_life: '',
				sex_contraception: '',
				home_pets: '',
				smoking_years: '',
				smoking_counter: '',
				alcohol_years: '',
				drugs_years: '',
			},
		}
	},
	props: ['showWidget', 'isFullWidget'],
	methods: {
		saveGeneralInformation: function(){
			/*this.$http.put(this.endpoint + this.bloodpressureForm.type, this.bloodpressureForm).then((response) => {
				console.log(response);
				this.bloodpressureForm.date = '';
				this.showModal = false;
				this.measurementsList.push(response.data.measurement);
			}, function(err){
				console.log(err);
			})*/
		},
		getGeneralInformation: function(){
			/*this.$http.get(this.endpoint + this.bloodpressureForm.type).then((response) => {
				console.log(response);
				this.measurementsList = response.data.measurementsList;
			}, function(err){
				console.log(err);
			})*/
		}
	},
	created: function(){
		this.getGeneralInformation();
	},
}
</script>

<style>

</style>