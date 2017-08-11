<template>
	<aside class="sideBar">
		<div id="Question_filter">
			<div class="filter_search mb-50 d-flex">
				<input type="text" id="question_search" name="question_search" class="input-large input-calc-border-width px-50" placeholder="Поиск по тексту">
			</div>
			<div class="list-group list-group-flush">
				<a href="#" class="list-item-filter  p-50 active_filter">Все</a> 
				<a href="#" class="list-item-filter  p-50">Акушерство</a>
				<a href="#" class="list-item-filter  p-50">Гинекология</a>
				<a href="#" class="list-item-filter  p-50">Все</a> 
				<a href="#" class="list-item-filter  p-50">Акушерство</a>
				<a href="#" class="list-item-filter  p-50">Гинекология</a>
				<a href="#" class="list-item-filter  p-50">Все</a> 
				<a href="#" class="list-item-filter  p-50">Акушерство</a>
				<a href="#" class="list-item-filter  p-50">Гинекология</a>
				<a href="#" class="list-item-filter  p-50">Все</a> 
				<a href="#" class="list-item-filter  p-50">Акушерство</a>
				<a href="#" class="list-item-filter  p-50">Гинекология</a>
			</div>
		</div>	
	</aside>
</template> 

<script>
export default {
  name: 'questionsSideBar',
  data() {
    return {
      msg: 'Это страница зарезервирована для вопроса врачу!'
    }
  }
}
</script>

<style>

</style>