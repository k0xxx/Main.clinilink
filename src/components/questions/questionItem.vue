<template>
	<div class="card my-2 mx-1 vopros_otvet p-75">
		<div class="card-block">
			<div class="user_info d-flex w-100">
				<div class="avatar_container_dialog"> <img :src="question.from_ref.img" alt="dialog avatar" class="avatar_dialog" height="54px" width="54px"> </div>
				<div class="user_info_title w-100">
					<div class="pl-50"><a href="#"><strong>{{ question.from_ref.fullName }}</strong></a></div>
					<div class="pl-50 data_Question text-muted"><small>Тематика вопроса: <strong>{{ question.type }}</strong></small></div>
				</div>
			</div>
			<div class="text_of_dialog w-100 pt-50">
				<small>{{ question.text }}</small>
			</div>
		</div>
		<div class="count_answer text-center">Ответов: <span>{{ question.response.length }}</span></div>
		<div class="card-block doctor_answer mb-75">
			<div class="user_info d-flex w-100">
				<div class="avatar_container_dialog"> <img src="http://storyfox.ru/wp-content/uploads/2016/06/urolog1.jpg" alt="dialog avatar" class="avatar_dialog" height="54px" width="54px"> </div>
				<div class="user_info_title w-100">
					<div class="pl-50"><a href="#"><i class="fa fa-plus-square accepted_doctor mr-1"></i><strong>Валентин Петрович Белый</strong></a></div>
					<div class="pl-50 data_Question text-muted"><small>Анастезиология</small> <small class="pr-1"><i class="fa fa-thumbs-o-up"></i> <span class="cout_like">98% (130 оценок)</span></small></div>
					<div class="pl-50 data_Question text-muted"><small>20 Февраля в 12:34</small></div> 
				</div>
			</div>
			<div class="text_of_dialog w-100 pt-75"><small>Добрый день, это может быть у Вас какая-то аллергическая реакция на продукты питания или на что-то другое, возможно, это может быть связано с грибковым поражением, я бы не рекомендовала его мазать йодом, а в ближайшем времени обратится к соответствующему специалисту ( дерматовенеролог).</small></div>
			<div class="text-right px-50">
				<div class="text_of_dialog text-right px-50">
					<form id="add_response_grade-'+for_tab+'-'+question_id+'-'+response.response_id+'" class="add_grade" action="questions/add_response_grade" onsubmit="return add_response_grade(this)" enctype="multipart/form-data" method="post">
						<div class="btn-group" role="group" aria-label="Оценить ответ">
							<div class="star-rating_wrap">
								<input class="star-rating_input" form="add_response_grade-'+for_tab+'-'+question_id+'-'+response.response_id+'" id="'+for_tab+'-'+question_id+'-star-rating-5-'+response.response_id+'" type="radio" name="rating" value="5" required="">
								<label class="star-rating_ico fa fa-star-o" for="'+for_tab+'-'+question_id+'-star-rating-5-'+response.response_id+'" title="5 из 5 звезд"></label>
								<input class="star-rating_input" form="add_response_grade-'+for_tab+'-'+question_id+'-'+response.response_id+'" id="'+for_tab+'-'+question_id+'-star-rating-4-'+response.response_id+'" type="radio" name="rating" value="4">
								<label class="star-rating_ico fa fa-star-o" for="'+for_tab+'-'+question_id+'-star-rating-4-'+response.response_id+'" title="4 из 5 звезд"></label>
								<input class="star-rating_input" form="add_response_grade-'+for_tab+'-'+question_id+'-'+response.response_id+'" id="'+for_tab+'-'+question_id+'-star-rating-3-'+response.response_id+'" type="radio" name="rating" value="3">
								<label class="star-rating_ico fa fa-star-o" for="'+for_tab+'-'+question_id+'-star-rating-3-'+response.response_id+'" title="3 из 5 звезд"></label>
								<input class="star-rating_input" form="add_response_grade-'+for_tab+'-'+question_id+'-'+response.response_id+'" id="'+for_tab+'-'+question_id+'-star-rating-2-'+response.response_id+'" type="radio" name="rating" value="2">
								<label class="star-rating_ico fa fa-star-o" for="'+for_tab+'-'+question_id+'-star-rating-2-'+response.response_id+'" title="2 из 5 звезд"></label>
								<input class="star-rating_input" form="add_response_grade-'+for_tab+'-'+question_id+'-'+response.response_id+'" id="'+for_tab+'-'+question_id+'-star-rating-1-'+response.response_id+'" type="radio" name="rating" value="1">
								<label class="star-rating_ico fa fa-star-o" for="'+for_tab+'-'+question_id+'-star-rating-1-'+response.response_id+'" title="1 из 5 звезд"></label>
							</div>
							<input type="hidden" name="question_id" value="'+question_id+'">
							<input type="hidden" name="response_id" value="'+response.response_id+'">
							<input type="hidden" name="response_user_id" value="'+response.user_ref._id.$id+'">
							<input type="hidden" name="for_tab" value="'+for_tab+'">
							<button type="submit" class="btn btn-primary btn-sm">Оценить ответ</button>
						</div>
					</form>
				</div>
			</div>
		</div>
		<div class="buttons_show_question my-2">
			<div class="row no-gutters text-primary d-flex">
				<a  class="text-center w-50 justify-content-center"> <icon name="th-list" class="mr-50"></icon> Все ответы </a>
				<a  class="text-center w-50 justify-content-center" v-on:click="OpenAnswerForm"> <icon name="pencil-square-o"  class="mr-50"></icon> Ответить </a>
			</div>
		</div>
		<div class="group p-75 answer_form d-flex flex-column" v-if="isOpened"> 
			<div class="title_repost text-center"> <strong>Ваш ответ</strong> </div>
			<form class="d-flex flex-column">
				<textarea class="input-calc-border-width" id="area_comment_repost" cols="30" rows="2"></textarea>
				<div class="w-100 d-flex justify-content-end mt-50">
					<button class="btn btn-primary" type="submit">Ответить</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	name: 'questionItem',
	props: ['question'],
	data() {
		return {
			isOpened: false,
		}
	},
	methods: {
		OpenAnswerForm: function(){
			if(this.isOpened){
				this.isOpened = false;
				console.log('sSj');
			}else{
				this.isOpened = true;
				console.log('j');
			}
		}
	},
	created: function(){
		console.log(this.question);
	}
}
</script>

<style>
/*#questions .questonTopBar{
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
.star-rating_wrap{
    display: inline-block;
    float: left;
    margin-right: 5px;
    margin-top: 2px;
}
.star-rating_ico{
    display: inline-block;
    float: right;
    padding-left: 2px;
    cursor: pointer;
    color: #FFB300;
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 0;
}
.star-rating_input{
    display: none;
}
.star-rating_ico:hover:before,
.star-rating_ico:hover ~ .star-rating_ico:before,
.star-rating_input:checked ~ .star-rating_ico:before,
.star-rating_input:checked:before{
    content: "\f005";
}
.openedForm{
	display: flex !important;
}*/
</style>