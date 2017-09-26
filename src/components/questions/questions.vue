<template>
	<div id="view">
		<div class="d-flex">
			<div id="questions" class="withSideBar">
				<div class="card mb-50">
					<div class="selectQuestionBar">
						<a href="" class="active">Лента вопросов</a>
						<a href="" class="">Мои вопросы</a>
					</div>
					<div class="askQuestion p-75">     
						<form v-on:submit.prevent="newQuestion">
							<div class="d-flex flex-column">
								<textarea id="questionText" name="text" v-model="questionForm.text" class="form_input w-100" maxlength="250" placeholder="Задайте вопрос врачу..." rows="3"></textarea>
								<div class="text-right"><small>Осталось <span class="count_symbols">250</span> символов</small></div>
							</div>
							<div class="d-flex justify-content-end btn_group"> 
								<select name="type" v-model="questionForm.type" class="form_input">
									<option>Тематика вопроса</option>
									<option value="1">First</option>
									<option value="2">Second</option>
									<option value="3">Threed</option> 
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
			<questionsSideBar></questionsSideBar>	
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
			questionForm: {
				text: '',
				type: ''
			},
			page: 1,
			endpoint: baseAPI + 'questions',
			questions: []
		}
	},
	components: {questionItem, questionsSideBar, InfiniteLoading},
	methods: {
		onInfinite() {
			var options = {
				params: {page: this.page}
			}
			this.$http.get(this.endpoint, options).then((response) => {
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
		}
	},
	created: function(){
		
	}
	
}
</script> 

<style>
.selectQuestionBar{
	display: flex;
}
.selectQuestionBar a{
	flex: 1 1;
    padding: 0.25rem 0.5rem;
    border: 1px solid #329d81;
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