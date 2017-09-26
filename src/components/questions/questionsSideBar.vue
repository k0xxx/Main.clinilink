<template>
	<aside class="sideBar">
		<div id="Question_filter">
			<div class="filter_search mb-50 d-flex">
				<input type="text" v-on:keyup="$emit('refreshFilter')" v-model="filter.search" name="question_search" class="form_input w-100" placeholder="Поиск по тексту">
			</div>
			<ul class="questionFilter">
				<li v-for="(questionType, index) in questionTypeList" v-bind:key="index">
					<a href="#" v-on:click.prevent="changeQuestionType(questionType.type)" v-bind:class="{ active: questionType.type == filter.type}">{{questionType.name}}</a>
				</li>
			</ul>
		</div>	
	</aside>
</template> 

<script>
export default {
	name: 'questionsSideBar',
	props: {
		filter: {
			type: Object,
      		required: true
		},
	},
  	data() {
    	return {
			//currentQuestionType: this.filter.type,
			//currentQuestionSearch: this.filter.search,
   			questionTypeList: [
				{type: '', name: 'Все'},
				{type: 'Акушерство, гинекология', name: 'Акушерство, гинекология'},
				{type: 'Хирургия', name: 'Хирургия'},
				{type: 'Анестезиология и реаниматология', name: 'Анестезиология и реаниматология'},
				{type: 'Микробиология', name: 'Микробиология'},
				{type: 'Спортивная медицина', name: 'Спортивная медицина'},
				{type: 'Терапия', name: 'Терапия'},
				{type: 'Санитария и гигиена', name: 'Санитария и гигиена'},
				{type: 'Дерматовенерология', name: 'Дерматовенерология'},
				{type: 'Педиатрия', name: 'Педиатрия'},
				{type: 'Инфекционные заболевания', name: 'Инфекционные заболевания'},
				{type: 'Радиология', name: 'Радиология'},
				{type: 'Неврология', name: 'Неврология'},
				{type: 'Стоматология', name: 'Стоматология'},
				{type: 'Травматология', name: 'Травматология'},
				{type: 'Оториноларингология', name: 'Оториноларингология'},
				{type: 'Офтальмология', name: 'Офтальмология'},
				{type: 'Психиатрия', name: 'Психиатрия'},
				{type: 'Судебно-медицинская экспертиза', name: 'Судебно-медицинская экспертиза'},
				{type: 'Фтизиатрия', name: 'Фтизиатрия'},
				{type: 'Эндокринология', name: 'Эндокринология'},
				{type: 'Другое', name: 'Другое'},
			],
    	}
  	},
	methods: {
		changeQuestionType: function(type){
			this.filter.type = type;
			this.$emit('refreshFilter');
		}
	}
}
</script>

<style>
.questionFilter{
	display: block;
	padding: 0;
	margin: 0;
	background: #fff;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
}
.questionFilter > li a{
	display: block;
	width: 100%;
	padding: 0.5rem 0.25rem 0.5rem 0.75rem;
	border-bottom: 1px solid #ddd;
	font-size: 14px;
    color: #333;
}
.questionFilter > li a:hover{
	background: #f7f7f9;
}
.questionFilter > li a.active{
	background: #329d81;
	color: #fff;
}
.questionFilter > li a::last-child{
	border-bottom: none;
}
</style>