<template>
	<div class="medicalRecordItem card">
		<div class="p-75">
			<div class="title">
				<a href="#" v-if="isFullWidget" @click.prevent="$emit('toogle')">
					<span><icon name="arrow-left" class="mr-50"></icon>Назад</span>
				</a>
				<a href="#" @click.prevent="$emit('toogle')">
					<span><icon :name=item.icon class="mr-50"></icon>{{item.title}}</span>
				</a>
				<button class="btn btn-primary" v-on:click="showModal = true"><icon name="plus"></icon></button>
			</div>
		</div>
		<img src="http://cdn.clinilink.org/public/defaultProfile.png" alt="">
		<div class="p-75">
			<div v-if="loading" class="p-75 text-center text-primary">
				<icon name="refresh" scale="2" spin></icon>
			</div>
			<ul v-else-if="medical_recordsList" class="medicalRecordList">
				<li v-for="medical_record in medical_recordsList" v-bind:key="medical_record._id" class="medicalRecordList-item">
					<div><strong>{{medical_record.name}}</strong></div>
					<div>{{medical_record.reaction}}</div>
				</li>
			</ul>
			<div v-else class="text-center">
				Записей нет<br>
				<button class="btn btn-primary d-flex btn-middle mx-auto" v-on:click="showModal = true">
					Добавить новую запись<icon name="plus" class="ml-50"></icon>
				</button>
			</div>
		</div>
		<!--<div class="p-75">
			<table>
				<tr>		
					<th>Название</th>
					<th>Реакция</th>
					<th>Тип</th>
					<th>Первое наблюдение</th>
					<th>Примечание</th>
					<th></th>
				</tr>
				<tr v-for="medical_record in medical_recordsList" v-bind:key="medical_record._id">
					<td>{{medical_record.name}}</td>
					<td>{{medical_record.reaction}}</td>
					<td>{{medical_record.name}}</td>
					<td>{{medical_record.name}}</td>
					<td>{{medical_record.note}}</td>
					<td>Edit</td>
				</tr>
			</table>
		</div>-->
		<div v-if="showModal" class="modal">
			<transition name="modal">
				<div class="modal-mask">
					<div class="modal-wrapper">
						<div class="modal-container">
							<div class="modal-header">
								<h3 class="px-100">Добавить значение</h3>
								<a href="#" class="close-icon" v-on:click.prevent="showModal = false">
									<icon name="times" scale="1"></icon> 
								</a>
							</div>
							<div class="modal-body">
								<div class="p-100">
									<form v-on:submit.prevent="addMedicalRecord">
										<label for="name">Название</label>
										<input type="text" name="name" v-model="allergiesForm.name" minlength="2" autocomplete="off">
										<label for="reaction">Реакция</label>
										<input type="text" name="reaction" v-model="allergiesForm.reaction" placeholder="сыпь, жжение...">
										<label for="type">Тип</label>
										<input type="text" name="type" v-model="allergiesForm.type" placeholder="Шерсть, растения...">
										<label for="first_observation">Первое наблюдение</label>
										<input type="text" name="first_observation" v-model="allergiesForm.first_observation">
										<label for="note">Примечание</label>
										<textarea name="note" v-model="allergiesForm.note"></textarea>
										<button type="submit" class="btn-primary btn-xlarge mt-100">Добавить</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
import { baseAPI } from '../../../config';
export default {
	name: 'widgetWeight',
	data() {
		return {
			loading: true,
			endpoint: baseAPI + 'medical_records/',
			item: {title: 'Аллергии', icon: 'bed', type: 'allergies'},
			showModal: false,
			medical_recordsList: [],
			allergiesForm: {
				name: '',
				reaction: '',
				type: '',
				first_observation: '',
				note: ''
			},
		}
	},
	props: ['showWidget', 'isFullWidget'],
	methods: {
		addMedicalRecord: function(){
			this.$http.put(this.endpoint + this.item.type, this.allergiesForm).then((response) => {
				console.log(response);
				//this.bloodpressureForm.date = '';
				this.showModal = false;
				this.medical_recordsList.push(response.data.medicalRecord);
			}, function(err){
				console.log(err);
			})
		},
		getMedicalRecords: function(){
			this.loading = true;
			this.$http.get(this.endpoint + this.item.type).then((response) => {
				console.log(response);
				if(response.data.medical_recordsList.length){
					this.medical_recordsList = response.data.medical_recordsList;
				}
				this.loading = false;
			}, function(err){
				console.log(err);
			})
		}
	},
	created: function(){
		this.getMedicalRecords();
	},
}
</script>

<style>
</style>