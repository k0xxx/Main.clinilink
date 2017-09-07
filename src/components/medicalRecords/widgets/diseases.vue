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
		<div class="p-75">
			<div v-if="loading" class="p-75 text-center text-primary">
				<icon name="refresh" scale="2" spin></icon>
			</div>
			<ul v-else-if="medical_recordsList" class="medicalRecordList">
				<li v-for="medical_record in medical_recordsList" v-bind:key="medical_record._id" class="medicalRecordList-item">
					<div>{{medical_record.name}}</div>
					<div>
						<div class="d-flex">
							<div class="mr-50">{{medical_record.state}}</div>
							<div class="mr-50"><icon name="calendar" class="mr-50"></icon>c {{medical_record.date | formatMedicalRecord}} по {{medical_record.end_date | formatMedicalRecord}}</div>
							<div v-if="isFullWidget">
								<a href="#"><icon name="remove" class="mr-50"></icon></a>
								<a href="#"><icon name="edit" class="mr-50"></icon></a>
							</div>
						</div>
						<div v-if="isFullWidget && medical_record.note">Примечание: {{medical_record.note}}</div>	
					</div>
					
					
					
					
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
					<th>Состояние</th>
					<th>Дата начала</th>
					<th>Дата прекращения</th>
					<th>Примечание</th>
					<th></th>
				</tr>
				<tr v-for="medical_record in medical_recordsList" v-bind:key="medical_record._id">
					<td>{{medical_record.date | formatMeasurement}}</td>
					<td>{{medical_record.name}}</td>
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
										<div>
											<label for="name">Название заболевания</label>
											<input type="text" class="form_input w-100" name="name" v-model="diseasesForm.name" required="" autofocus="">
										</div>
										<div>
											<label for="state">Состояние</label>
											<select name="state" class="form_input w-100" v-model="diseasesForm.state">
												<option value="Хроническое">Хроническое</option>
												<option value="Острое">Острое</option>
												<option value="Текущее">Текущее</option>
												<option value="Вылечено">Вылечено</option>
											</select>
										</div>
										<div>
											<label for="date">Дата начала</label>
											<input type="text" class="form_input w-100" name="date" v-model="diseasesForm.date">
										</div>
										<div>
											<label for="end_date">Дата прекращения</label>
											<input type="text" class="form_input w-100" name="end_date" v-model="diseasesForm.end_date">
										</div>
										<div>
											<label for="note">Примечание</label>
											<textarea name="note" class="form_input w-100" rows="1" v-model="diseasesForm.note"></textarea>
										</div>
										<button type="submit" class="btn btn-primary mx-auto">Добавить</button>
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
			item: {title: 'Заболевания', icon: 'bed', type: 'diseases'},
			showModal: false,
			medical_recordsList: [],
			diseasesForm: {
				name: '', 
				state: '',
				date: '',
				end_date: '',
				note: '',
			},
		}
	},
	props: ['showWidget', 'isFullWidget'],
	methods: {
		addMedicalRecord: function(){
			this.$http.put(this.endpoint + this.item.type, this.diseasesForm).then((response) => {
				console.log(response);
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