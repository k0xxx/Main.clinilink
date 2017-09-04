<template>
	<aside class="sideBar">
		<div class="w-100 hidden_filter">
			<form>
				<div class="mb-75">
			  		<label for="select_search" class="col-form-label"><strong>Пользователь</strong></label>
			  		<div class="w-100">
				  		<select class="form_input w-100" id="select_search">
							<option selected="">Все</option>
							<option>Только пациенты</option> 
							<option>Только врачи</option>
							<option>Только специалисты</option>
						</select>
					</div>
				</div>
				<div class="mb-75">
					<label for="country_search_1" class="col-form-label"><strong>Cтрана</strong></label>
					<div class="w-100">
						<input class="form_input w-100" type="search" id="country_search_1" placeholder="Страна">
					</div>
				</div>
				<div class="mb-75">
			  		<label for="city_search_1" class="col-form-label"><strong>Город</strong></label>
			  		<div class="w-100">
						<input class="form_input w-100" type="search" id="city_search_1" placeholder="Город">
			  		</div>
				</div>
				<div class="mb-75">
			  		<label for="special_search_1" class="col-form-label"><strong>Навык/Интерес</strong></label>
			  		<div class="w-100">
						<input class="form_input w-100" type="search" id="special_search_1" placeholder="Навык/Интерес">
			  		</div>
				</div>
				<div class="mb-75">
			  		<label for="select_position_search" class="col-form-label"><strong>Должность</strong></label>
			  		<div class="w-100">
				  		<select class="form_input w-100" id="select_position_search">
					  		<option selected="">не выбрано</option>
					  		<option>Акушер</option> 
					  		<option>Врач</option>
					  		<option>Лор</option>
				  		</select>
			  		</div>
				</div>
				<div class="mb-75">
			  		<label for="select_special_search" class="col-form-label"><strong>Специализация</strong></label>
			  		<div class="w-100">
				  		<select class="form_input w-100" id="select_special_search">
					  		<option selected="">не выбрано</option>
					  		<option>Акушер</option> 
					  		<option>Врач</option>
					  		<option>Лор</option>
				  		</select>
			  		</div>
				</div>
				<div class="search_bolezn mb-75">
			  		<label for="bolezn_search_1" class="col-form-label"><strong>Заболевание</strong></label>
			  		<div class="w-100">
						<input class="form_input w-100" type="search" id="bolezn_search_1" placeholder="Заболевание">
			  		</div>
				</div>
		   </form>
		</div>
	</aside>
</template>