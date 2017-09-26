<template>
	<div id="view">
		<div class="d-flex">
			<div id="questions" class="withSideBar">
				<div class="card mb-50">
					<div class="selectQuestionBar">
						<a href="" v-on:click.prevent="changeQuestionTab('')" v-bind:class="{ active: currentQuestionTab == ''}">Лента вопросов</a>
						<a href="" v-on:click.prevent="changeQuestionTab('myQuestions')" v-bind:class="{ active: currentQuestionTab == 'myQuestions'}">Мои вопросы</a>
					</div>
					<div class="askQuestion p-75">     
						<form v-on:submit.prevent="newQuestion">
							<div class="d-flex flex-column">
								<textarea id="questionText" name="text" v-model="questionForm.text" class="form_input w-100" maxlength="250" placeholder="Задайте вопрос врачу..." rows="3"></textarea>
								<div class="text-right"><small>Осталось <span class="count_symbols">250</span> символов</small></div>
							</div>
							<div class="d-flex justify-content-end btn_group"> 
								<select name="type" v-model="questionForm.type" class="form_input">
									<option value="Вопрос для всех#All">Вопрос для всех</option>
									<optgroup label="Акушерство, гинекология">
										<option value="Акушерство, гинекология#Акушерство, гинекология">Акушерство, гинекология</option>
										<option value="Маммология#Акушерство, гинекология">Маммология</option>
										<option value="Эндокринная гинекология#Акушерство, гинекология">Эндокринная гинекология</option>
									</optgroup>
									<optgroup label="Хирургия">
										<option value="Амбулаторная хирургия#Хирургия">Амбулаторная хирургия</option>
										<option value="Кардиохирургия#Хирургия">Кардиохирургия</option>
										<option value="Детская хирургия#Хирургия">Детская хирургия</option>
										<option value="Колопроктология#Хирургия">Колопроктология</option>
										<option value="Нейрохирургия#Хирургия">Нейрохирургия</option>
										<option value="Пластическая хирургия#Хирургия">Пластическая хирургия</option>
										<option value="Сердечно-сосудистая хирургия#Хирургия">Сердечно-сосудистая хирургия</option>
										<option value="Торакальная хирургия#Хирургия">Торакальная хирургия</option>
										<option value="Урология#Хирургия">Урология</option>
										<option value="Хирургия#Хирургия">Хирургия</option>
										<option value="Челюстно-лицевая хирургия#Хирургия">Челюстно-лицевая хирургия</option>
										<option value="Эндокринная хирургия#Хирургия">Эндокринная хирургия</option>
									</optgroup>
									<optgroup label="Анестезиология и реаниматология">
										<option value="Анестезиология#Анестезиология и реаниматология">Анестезиология</option>
										<option value="Паллиативная медицинская помощь#Анестезиология и реаниматология">Паллиативная медицинская помощь</option>
										<option value="Реаниматология#Анестезиология и реаниматология">Реаниматология</option>
										<option value="Скорая медицинская помощь#Анестезиология и реаниматология">Скорая медицинская помощь</option>
										<option value="Токсикология#Анестезиология и реаниматология">Токсикология</option>
										<option value="Трансфузиология#Анестезиология и реаниматология">Трансфузиология</option>
									</optgroup>
									<optgroup label="Микробиология">
										<option value="Бактериология#Микробиология">Бактериология</option>
										<option value="Вирусология#Микробиология">Вирусология</option>
										<option value="Клиническая микология#Микробиология">Клиническая микология</option>
										<option value="Лабораторная микология#Микробиология">Лабораторная микология</option>
									</optgroup>
									<optgroup label="Спортивная медицина">
										<option value="Восстановительная медицина#Спортивная медицина">Восстановительная медицина</option>
										<option value="Лечебная физкультура#Спортивная медицина">Лечебная физкультура</option>
										<option value="Мануальная терапия#Спортивная медицина">Мануальная терапия</option>
										<option value="Рефлексотерапия#Спортивная медицина">Рефлексотерапия</option>
										<option value="Спортивная медицина#Спортивная медицина">Спортивная медицина</option>
										<option value="Функциональная диагностика#Спортивная медицина">Функциональная диагностика</option>
									</optgroup>
									<optgroup label="Терапия">
										<option value="Гастроэнтерология#Терапия">Гастроэнтерология</option>
										<option value="Гепатология#Терапия">Гепатология</option>
										<option value="Диетология#Терапия">Диетология</option>
										<option value="Кардиология#Терапия">Кардиология</option>
										<option value="Нефрология#Терапия">Нефрология</option>
										<option value="Общая врачебная практика#Терапия">Общая врачебная практика</option>
										<option value="Пульмонология#Терапия">Пульмонология</option>
										<option value="Ревматология#Терапия">Ревматология</option>
										<option value="Терапия#Терапия">Терапия</option>
									</optgroup>
									<optgroup label="Санитария и гигиена">
										<option value="Дезинфектология#Санитария и гигиена">Дезинфектология</option>
										<option value="Санитария и гигиена#Санитария и гигиена">Санитария и гигиена</option>
									</optgroup>
									<optgroup label="Дерматовенерология">
										<option value="Дерматовенерология#Дерматовенерология">Дерматовенерология</option>
									</optgroup>
									<optgroup label="Педиатрия">
										<option value="Детская гинекология#Педиатрия">Детская гинекология</option>
										<option value="Детская кардиология#Педиатрия">Детская кардиология</option>
										<option value="Детская онкология#Педиатрия">Детская онкология</option>
										<option value="Детская травматология и ортопедия#Педиатрия">Детская травматология и ортопедия</option>
										<option value="Детская урология-андрология#Педиатрия">Детская урология-андрология</option>
										<option value="Детская эндокрилогия#Педиатрия">Детская эндокрилогия</option>
										<option value="Неонатология#Педиатрия">Неонатология</option>
										<option value="Педиатрия#Педиатрия">Педиатрия</option>
										<option value="Детская психиатрия#Педиатрия">Детская психиатрия</option>
									</optgroup>
									<optgroup label="Инфекционные заболевания">
										<option value="Инфекционные заболевания#Инфекционные заболевания">Инфекционные заболевания</option>
										<option value="Эпидемиология#Инфекционные заболевания">Эпидемиология</option>
									</optgroup>
									<optgroup label="Радиология">
										<option value="Лучевая диагностика#Радиология">Лучевая диагностика</option>
										<option value="Радиология#Радиология">Радиология</option>
										<option value="Радиотерапия#Радиология">Радиотерапия</option>
										<option value="Рентгенология#Радиология">Рентгенология</option>
										<option value="Рентгенэндоваскулярные диагностика и лечение#Радиология">Рентгенэндоваскулярные диагностика и лечение</option>
										<option value="Ультразвуковая диагностика#Радиология">Ультразвуковая диагностика</option>
										<option value="Эндоскопия#Радиология">Эндоскопия</option>
									</optgroup>
									<optgroup label="Неврология">
										<option value="Детская неврология#Неврология">Детская неврология</option>
										<option value="Неврология#Неврология">Неврология</option>
									</optgroup>
									<optgroup label="Стоматология">
										<option value="Ортодонтия#Стоматология">Ортодонтия</option>
										<option value="Стоматология#Стоматология">Стоматология</option>
										<option value="Стоматология детская#Стоматология">Стоматология детская</option>
										<option value="Стоматология ортопедическая#Стоматология">Стоматология ортопедическая</option>
										<option value="Стоматология терапевтическая#Стоматология">Стоматология терапевтическая</option>
										<option value="Стоматология хирургическая#Стоматология">Стоматология хирургическая</option>
									</optgroup>
									<optgroup label="Травматология">
										<option value="Остеопатия#Травматология">Остеопатия</option>
										<option value="Травматология и ортопедия#Травматология">Травматология и ортопедия</option>
									</optgroup>
									<optgroup label="Оториноларингология">
										<option value="Оториноларингология#Оториноларингология">Оториноларингология</option>
									</optgroup>
									<optgroup label="Офтальмология">
										<option value="Офтальмология#Офтальмология">Офтальмология</option>
									</optgroup>
									<optgroup label="Психиатрия">
										<option value="Психиатрия#Психиатрия">Психиатрия</option>
										<option value="Психиатрия-наркология#Психиатрия">Психиатрия-наркология</option>
										<option value="Психотерапия#Психиатрия">Психотерапия</option>
										<option value="Судебно-психиатрическая экспертиза#Психиатрия">Судебно-психиатрическая экспертиза</option>
									</optgroup>
									<optgroup label="Судебно-медицинская экспертиза">
										<option value="Судебно-медицинская экспертиза#Судебно-медицинская экспертиза">Судебно-медицинская экспертиза</option>
									</optgroup>
									<optgroup label="Фтизиатрия">
										<option value="Фтизиатрия#Фтизиатрия">Фтизиатрия</option>
									</optgroup>
									<optgroup label="Эндокринология">
										<option value="Эндокринология#Эндокринология">Эндокринология</option>
									</optgroup>
									<optgroup label="Другое">
										<option value="Авиационная и космическая медицина#другое">Авиационная и космическая медицина</option>
										<option value="Аллергология и иммунология#Другое">Аллергология и иммунология</option>
										<option value="Водолазная медицина#Другое">Водолазная медицина</option>
										<option value="Гематология#Другое">Гематология</option>
										<option value="Генетика#Другое">Генетика</option>
										<option value="Гериатрия#Другое">Гериатрия</option>
										<option value="Косметология#Другое">Косметология</option>
										<option value="Лабораторная генетика#Другое">Лабораторная генетика</option>
										<option value="Медико-социальная экспертиза#Другое">Медико-социальная экспертиза</option>
										<option value="Медицинская статистика#Другое">Медицинская статистика</option>
										<option value="Организация здравоохранения#Другое">Организация здравоохранения</option>
										<option value="Паразитология#Другое">Паразитология</option>
										<option value="Профилактическая медицина#Другое">Профилактическая медицина</option>
										<option value="Профпатология#Другое">Профпатология</option>
										<option value="Репродуктология#Другое">Репродуктология</option>
										<option value="Сексология#Другое">Сексология</option>
										<option value="Сурдология#Другое">Сурдология</option>
										<option value="Клиническая фармакология#Другое">Клиническая фармакология</option>
										<option value="Клиническая лабораторная диагностика#Другое">Клиническая лабораторная диагностика</option>
										<option value="Физиотерапия#Другое">Физиотерапия</option>
										<option value="Патологическая анатомия#Другое">Патологическая анатомия</option>
									</optgroup>
								</select>
								<button type="button" class="btn btn-primary"><icon name="plus" scale="0.8"></icon></button>
								<button type="submit"class="btn btn-primary">Задать вопрос</button> 
							</div>
							<div class="text-right"> 
								<input type="checkbox"><small>Задать вопрос анонимно</small>
							</div>
						</form>
					</div>
				</div>
				<div id="questionList">
					<questionItem v-for="question in questions" v-bind:key="question._id" v-bind:question="question"></questionItem>
					<infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
						<span slot="no-more">Всё загружено!</span>
					</infinite-loading>
				</div>
			</div>
			<questionsSideBar @refreshFilter="refreshQuestions" :filter="filter"></questionsSideBar>	
		</div>
	</div>
</template>

<script>
import { baseAPI } from '../../config.js';
import InfiniteLoading from "vue-infinite-loading"
import questionItem from './questionItem.vue';
import questionsSideBar from './questionsSideBar.vue';

export default {
	name: 'questions',
	data() {
		return {
			filter: {
				search: '',
				type: ''
			},
			questionForm: {
				text: '',
				type: 'Вопрос для всех#All'
			},
			page: 1,
			currentQuestionTab: '',
			endpoint: baseAPI + 'questions',
			questions: []
		}
	},
	components: {questionItem, questionsSideBar, InfiniteLoading},
	methods: {
		onInfinite() {
			var options = {
				params: {
					page: this.page,
					qurrentTab: this.currentQuestionTab,
					qurrentFilter: this.filter.type,
					search: this.filter.search,
				}
			}
			this.$http.get(this.endpoint + '/' + this.currentQuestionTab, options).then((response) => {
				if (response.data.questionList.length) {
					this.questions = this.questions.concat(response.data.questionList);
					this.page++;
					this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
				} else {
					this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
				}
		  });
		},
		newQuestion: function(){
			this.$http.put(this.endpoint, this.questionForm).then((response) => {
				console.log(response);
				this.questions.unshift(response.data.question);
			}, function(err){
				console.log(err);
			})
		},
		changeQuestionTab: function(type){
			this.currentQuestionTab = type;
			this.refreshQuestions();
		},
		refreshQuestions(){
			this.questions = [];
			this.page = 1;
      		this.$nextTick(() => {
        		this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
      		});
		},
	},
	created: function(){

	},
	
}
</script> 

<style>
.selectQuestionBar{
	display: flex;
	border-bottom: 1px solid #ddd;
}
.selectQuestionBar a{
	flex: 1 1;
    padding: 0.5rem;
    text-align: center;   
}
.selectQuestionBar a.active{
	background: #329d81;
	color: #fff;
}
.selectQuestionBar a:first-child{
	border-top-left-radius: 0.25rem;
	border-right: none;
}
.selectQuestionBar a:last-child{
	border-top-right-radius: 0.25rem;
}
    
/*#questions{
     
}
    questionsSidebar{
        width:20%;
    }
#questions .questonTopBar{
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    margin-bottom: 1rem;
}
#questions .selectQuestionBar{
	display: flex;
    flex-wrap: nowrap;
    border: 1px solid #329d81;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
}
#questions .selectQuestionBar a{
	width: 100%;
    text-align: center;
    padding: 0.25rem 0.5rem;
    border-right: 1px solid #329d81;
    flex: 0 1 auto;
}
#questions .selectQuestionBar a:last-child{
	border-right: none;
}*/
</style>