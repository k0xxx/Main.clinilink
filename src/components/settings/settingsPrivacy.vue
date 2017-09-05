<template>
	<div>
		<div class="headerSettings p-100 d-flex align-i-center">  
			<h4 class="m-0">Приватность</h4> 
		</div>
		<div class="p-75">
		<form v-on:submit.prevent="saveSettings">
			<div class="p-50">
					<label for="doc_specialization_experience" class="pr-75">Рабочий стаж</label>
					<input type="number" name="doc_specialization_experience" class="input-middle px-50"  min="0" max="80" maxlength="2" v-model="settings.doc_specialization_experience">
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
	name: 'settingsPrivacy',
	data() {
		return {
			userId: '',
			settings: {},
			endpoint: baseAPI + 'profileSettings/',
			sub: {
				blood_type_list: ["I(+)", "I(-)", "II(+)", "II(-)", "III(+)", "III(-)", "IV(+)", "IV(-)"],
			}
		}
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
			/*this.$http.post(this.endpoint, this.settings).then((response) => {
				console.log(response);
				//this.settings = response.data.profileSettings;
			}, function(err){
				console.log(err); 
			})*/
		}
	},
	created: function(){
		this.userId = this.$auth.getUserId();
		this.getProfileSettings();
	}
}
</script>

<style>

</style>