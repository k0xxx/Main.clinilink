<template>
	<div id="questionList">
		<questionItem v-for="question in questions" v-bind:key="question._id" v-bind:question="question"></questionItem>
		<infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
			<span slot="no-more">Всё загружено!</span>
		</infinite-loading>  
	</div>
</template>

<script>
import { baseAPI } from '../../config.js';
import InfiniteLoading from "vue-infinite-loading"
import questionItem from '../questions/questionItem.vue';      
 
export default {
  name: 'profileAnswers',
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
  components: {questionItem, InfiniteLoading},
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
	}
} 
</script> 

<style>
#questions{
     
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
}
</style>