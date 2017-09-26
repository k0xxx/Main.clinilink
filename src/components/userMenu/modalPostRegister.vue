<template>
	<div id="modalPostRegister">
		<transition name="modal">
			<div class="modal-mask">
				<div class="modal-wrapper">
					<div class="modal-container">
						<div class="p-100">
							<h3 class="text-center">Добро пожаловать на медицинскую платформу Clinilink!</h3>
						</div>
						<div class="modal-body p-100">
							<p class="text-center">Для более удобного использования ресурса предлагаем вам выбрать тип вашего профиля:</p>
							<div class="profileTypeSelect d-flex justify-content-between" v-if="profileTypeStep == 1">
								<a href="#" v-on:click="switchType(0)" class="text-center p-75 mr-75" v-bind:class="{ active: profileType.patient.isActive }">
									<img src="../../assets/afterRegistration/reg_patient.png" class="reg_patient m-auto mb-50"> 
									<p class="lead mb-0">Я Пациент</p>
									<small>Для людей имеющих проблемы со здоровьем, и тех кто интересуется здоровым образом жизни</small>
								</a>
								<a href="#" v-on:click="switchType(1)" class="text-center p-75 mr-75" v-bind:class="{ active: profileType.specialist.isActive }">
									<img src="../../assets/afterRegistration/reg_medical.png" class="reg_medical m-auto mb-50">
									<p class="lead mb-0">Я Специалист</p>
									<small>Средний и младший медицинский или фармацевтический персонал</small>
								</a>
								<a href="#" v-on:click="switchType(2)" class="text-center p-75" v-bind:class="{ active: profileType.doctor.isActive }">
									<img src="../../assets/afterRegistration/reg_doctor.png" class="reg_doctor m-auto mb-50">
									<p class="lead mb-0">Я Врач</p>
									<small>Требуется подтверждение в виде фотографии диплома о высшем медицинском образовании или сертификата</small>
								</a>
							</div>
							<div v-if="profileType.status == 'patient' && profileTypeStep == 2">
								<p class="text-center">У Вас есть проблемы со здоровьем?</p>  
								<form>
									<div class="btn_group full_width">
										<button type="button" class="btn btn-outline-primary" v-on:click="patientHaveProblems" v-bind:class="{active: !profileType.patient.haveProblems}">Я здоров</button>
										<button type="button" class="btn btn-outline-primary" v-on:click="patientHaveProblems" v-bind:class="{active: profileType.patient.haveProblems}">Я болен</button>
									</div>
									<div v-if="profileType.patient.haveProblems">
										<p class="lead">Выберете одну из проблемм:</p>
										<ul class="btn_tab">
											<li class="btn_tab-item">
												<a href="#" v-on:click="patientProblems = 'disease'" v-bind:class="{active: patientProblems == 'disease'}">Заболевание</a>
											</li>
											<li class="btn_tab-item">
												<a href="#" v-on:click="patientProblems = 'operation'" v-bind:class="{active: patientProblems == 'operation'}">Операция</a>
											</li>
											<li class="btn_tab-item">
												<a href="#" v-on:click="patientProblems = 'allergy'" v-bind:class="{active: patientProblems == 'allergy'}">Аллергия</a>
											</li>
											<li class="btn_tab-item">
												<a href="#" v-on:click="patientProblems = 'injury'" v-bind:class="{active: patientProblems == 'injury'}">Травма</a>
											</li>
										</ul>
										<div class="btn_tab-content">
											<div class="btn_tab-content_item" v-if="patientProblems == 'disease'">
												<div class="form-group">
													<label class="sr-only" for="diseaseInput">Заболевание</label>
													<input type="text" class="form_input w-100" name="diseaseInput" id="diseaseInput" v-model="profileType.patient.diseaseInput" placeholder="Введите заболевание...">
												</div>
											</div>
											<div class="btn_tab-content_item" v-if="patientProblems == 'operation'">
												<div class="form-group">
													<label class="sr-only" for="operationInput">Операция</label>
													<input type="text" class="form_input w-100" name="operationInput" id="operationInput" v-model="profileType.patient.operationInput" placeholder="Введите операцию...">
												</div>
											</div>
											<div class="btn_tab-content_item" v-if="patientProblems == 'allergy'">
												<div class="form-group">
													<label class="sr-only" for="allergyInput">Аллергия</label>
													<input type="text" class="form_input w-100" name="allergyInput" id="allergyInput" v-model="profileType.patient.allergyInput" placeholder="Введите вид аллергии...">
												</div>
											</div>
											<div class="btn_tab-content_item" v-if="patientProblems == 'injury'">
												<div class="form-group">
													<label class="sr-only" for="injuryInput">Травма</label>
													<input type="text" class="form_input w-100" name="injuryInput" id="injuryInput" v-model="profileType.patient.injuryInput" placeholder="Укажите свою травму...">
												</div>
											</div>
										</div>
									</div>
								</form>
							</div>
							<div v-if="profileType.status == 'specialist' && profileTypeStep == 2">
								<p class="text-center">Заполните пожалуйста следующую информацию:</p>
								<form>
									<div>
										<label for="lastname">Ваша фамилия</label>
										<input type="text" class="form_input w-100" name="lastname" placeholder="Фамилия" v-model="profileType.specialist.lastname" required />
									</div>
									<div>
										<label for="name">Ваше имя</label>
										<input type="text" class="form_input w-100" name="name" placeholder="Имя" v-model="profileType.specialist.name" required />
									</div>
									<div>
										<label for="med_position">Ваша должность</label>
										<select class="form_input w-100" name="med_position" v-model="profileType.specialist.med_position" required>
											<option v-for="special in specialistList">{{ special }}</option>
										</select>
									</div>
								</form>
							</div>
							<div v-if="profileType.status == 'doctor' && profileTypeStep == 2">
								<p class="text-center">Заполните пожалуйста следующую информацию:</p>
								<form>
									<div>
										<label for="lastname">Ваша фамилия</label>
										<input type="text" class="form_input w-100" name="lastname" placeholder="Фамилия" v-model="profileType.doctor.lastname" required />
									</div>
									<div>
										<label for="name">Ваше имя</label>
										<input type="text" class="form_input w-100" name="name" placeholder="Имя" v-model="profileType.doctor.name" required />
									</div>
									<div>
										<label for="doc_specialization">Ваша специализация</label>
										<select class="form_input w-100" name="doc_specialization" v-model="profileType.doctor.doc_specialization" required>
											<option v-for="docCat in doctorList">{{docCat}}</option>
										</select>
									</div>
									<div>
										<label id="statusSubmitFile_label" class="btn btn-primary" for="statusSubmitFile" title="Добавить диплом">
											Прикрепить диплом
											<input id="statusSubmitFile" name="statusSubmitFile" style="display: none;" type="file" accept="image/jpeg,image/png,image/gif" />
										</label>
										<span id="SubmitFileName" class="text-center"></span>
										<a href="#" id="removeStatusSubmitFile" style="display: none;" title="Не прикреплять">
											<i class="fa fa-close fa-lg"></i>
										</a>
										<small class="form-text text-muted">* Вы можете добавить диплом после регистрации</small>
									</div>
								</form>
							</div>
							<div class="d-flex justify-content-between mt-100">
								<button type="button" class="btn btn-primary" v-if="profileTypeStep == 2" v-on:click="profileTypeStep = 1">Назад</button>
								<button type="button" class="btn btn-primary mx-auto w-25" v-if="profileTypeStep == 1 && profileType.status" v-on:click="profileTypeStep = 2">Далее</button>
								<button type="button" class="btn btn-primary" v-if="profileTypeStep == 2" v-on:click="submitProfile">Завершить регистрацию</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import { baseAPI } from '../../config.js';
export default {
	name: 'modalPostRegister', 
	data() {  
		return {
			endpoint: baseAPI + 'auth/afterRegistration',
			profileTypeStep: 1,
			patientProblems: 'disease',
			profileType: {
				status: '',
				patient: {
					haveProblems: false,
					isActive: false,
					diseaseInput: '',
					operationInput: '',
					allergyInput: '',
					injuryInput: '',
				},
				specialist: {
					isActive: false,
					lastname: '',
					name: '',
					med_position: '',
				},
				doctor: {
					isActive: false,
					lastname: '',
					name: '',
					doc_specialization: '',
				}
			},
			specialistList: ["Акушер", "Гигиенист стоматологический", "Заведующий молочной кухней", "Заведующий здравпунктом", 
							 "Заведующий фельдшерско-акушерским пунктом", "Заведующий кабинетом медицинской профилактики", "Зубной техник", 
							 "Инструктор-дезинфектор", "Инструктор по гигиеническому воспитанию", "Инструктор по лечебной физкультуре", 
							 "Лаборант", "Медицинская сестра", "Медицинская сестра-анестезист", "Медицинская сестра семейного врача",
							 "Медицинская сестра диетическая", "Медицинская сестра медико-социальной помощи", "Медицинская сестра палатная (постовая)",
							 "Медицинская сестра патронажная", "Медицинская сестра перевязочной", "Медицинская сестра по косметологии",
							 "Медицинская сестра по массажу", "Медицинская сестра приемного отделения", "Медицинская сестра процедурной",
							 "Медицинская сестра по реабилитации", "Медицинская сестра стерилизационной", "Медицинская сестра по физиотерапии",
							 "Медицинский дезинфектор","Медицинский оптик-оптометрист", "Медицинский регистратор", "Операционная медицинская сестра",
							 "Рентгенолаборант", "Старшая медицинская сестра", "Фельдшер", "Фельдшер скорой медицинской помощи",
							 "Младшая медицинская сестра по уходу за больными", "Санитар", "Санитар-водитель", "Сестра-хозяйка", "Провизор",
							 "Фармацевт", "Фасовщик"],
			doctorList: ["Авиационная и космическая медицина", "Акушерство, гинекология", "Аллергология и иммунология", "Амбулаторная хирургия",
					     "Анестезиология", "Бактериология", "Вирусология", "Водолазная медицина", "Восстановительная медицина", "Гастроэнтерология",
						 "Гематология", "Генетика", "Гепатология", "Гериатрия", "Дезинфектология", "Дерматовенерология", "Детская гинекология",
						 "Детская кардиология", "Детская неврология", "Детская онкология", "Детская психиатрия", "Детская травматология и ортопедия", 
						 "Детская урология-андрология", "Детская хирургия", "Детская эндокрилогия", "Диетология", "Инфекционные заболевания", "Кардиология",
						 "Кардиохирургия", "Клиническая лабораторная диагностика", "Клиническая микология", "Клиническая фармакология", "Колопроктология",
						 "Косметология", "Лабораторная генетика", "Лабораторная микология", "Лечебная физкультура", "Лучевая диагностика", "Маммология",
						 "Мануальная терапия", "Медико-социальная экспертиза", "Медицинская статистика", "Неврология", "Нейрохирургия", "Неонатология",
						 "Нефрология", "Общая врачебная практика", "Онкология", "Организация здравоохранения", "Ортодонтия", "Остеопатия", "Оториноларингология", 
						 "Офтальмология", "Паллиативная медицинская помощь", "Паразитология", "Патологическая анатомия", "Педиатрия", "Пластическая хирургия",
						 "Профилактическая медицина", "Профпатология", "Психиатрия", "Психиатрия-наркология", "Психотерапия", "Пульмонология", "Радиология", 
						 "Радиотерапия", "Реаниматология", "Ревматология", "Рентгенология", "Рентгенэндоваскулярные диагностика и лечение", "Репродуктология",
						 "Рефлексотерапия", "Санитария и гигиена", "Сексология", "Сердечно-сосудистая хирургия", "Скорая медицинская помощь", "Спортивная медицина",
						 "Стоматология", "Стоматология детская", "Стоматология ортопедическая", "Стоматология терапевтическая", "Стоматология хирургическая",
						 "Судебно-медицинская экспертиза", "Судебно-психиатрическая экспертиза", "Сурдология", "Терапия", "Токсикология", "Торакальная хирургия",
						 "Травматология и ортопедия", "Трансфузиология", "Ультразвуковая диагностика", "Урология", "Физиотерапия", "Фтизиатрия", "Функциональная диагностика",
						 "Хирургия", "Челюстно-лицевая хирургия", "Эндокринная гинекология", "Эндокринная хирургия", "Эндокринология", "Эндоскопия", "Эпидемиология"],
		}
	},
	methods: {
		switchType: function(type){
			switch (type) {
				case 0:
					this.profileType.status = 'patient';
					this.profileType.patient.isActive = true;
					this.profileType.specialist.isActive = false;
					this.profileType.doctor.isActive = false;
					break;
				case 1:
					this.profileType.status = 'specialist';
					this.profileType.patient.isActive = false;
					this.profileType.specialist.isActive = true;
					this.profileType.doctor.isActive = false;
					break;
				case 2:
					this.profileType.status = 'doctor';
					this.profileType.patient.isActive = false;
					this.profileType.specialist.isActive = false;
					this.profileType.doctor.isActive = true;
					break;
				default:
					break;
			}
		},
		patientHaveProblems: function(){
			if(this.profileType.patient.haveProblems){
				this.profileType.patient.haveProblems = false;
			}else{
				this.profileType.patient.haveProblems = true;
			}
		},
		submitProfile: function(){
			this.$http.post(this.endpoint, this.profileType).then((response) => {
				console.log(response);
				//this.$auth.updateUserData();
				this.$emit('submit');
			}, function(err){
				console.log(err);
			})
		}
	}
}
</script> 

<style>
#modalPostRegister .modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, .5);
	display: table;
	transition: opacity .3s ease;
}

#modalPostRegister .modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

#modalPostRegister .modal-container {
  width: 800px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  position: relative;
} 

#modalPostRegister .profileTypeSelect a.active,
#modalPostRegister .profileTypeSelect a:hover{
	background: #329d81;
	color: white; 
	border-radius: 4px; 
}

#modalPostRegister .profileTypeSelect a img:after{
	content: ''
}
#modalPostRegister .profileTypeSelect a.active img{
	
}

#modalPostRegister .modal-enter {
  opacity: 0;
}

#modalPostRegister .modal-leave-active {
  opacity: 0;
}

#modalPostRegister .modal-enter .modal-container,
#modalPostRegister .modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
#closeModalRegister{
        position: absolute;
        top: 6px;
        right: 9px;
        color: white;
        cursor: pointer;  
}    
</style>