<template>
	<div class="medicalRecordItem card">
		<div class="title">
			<a href="#" v-if="isFullWidget" @click.prevent="$emit('toogle')">
				<span><icon name="arrow-left" class="mr-50"></icon>Назад</span>
			</a>
			<a href="#" @click.prevent="$emit('toogle')">
				<span><icon :name=item.icon class="mr-50"></icon>{{item.title}}</span>
			</a>
			<button class="btn btn-primary" v-on:click="showModal = true"><icon name="plus"></icon></button>
		</div>
		<div class="p-75">
			<div v-if="loading" class="p-75 text-center text-primary">
				<icon name="refresh" scale="2" spin></icon>
			</div>
			<ul v-else-if="medicalRecordsList" class="medicalRecordList">
				<li v-for="(medicalRecord, index) in medicalRecordsList" v-bind:key="medicalRecord._id" class="medicalRecordList-item">
					<div><strong>{{medicalRecord.name}}</strong></div>
					<div><icon name="calendar" class="mr-50"></icon>{{medicalRecord.date.time | formatMedicalRecord}}</div>
					<div v-if="isFullWidget">
						<a href="#" class="edit p-50" v-on:click="editMedicalRecord(medicalRecord._id)"><icon name="pencil"></icon></a>
						<a href="#" class="remove p-50" v-on:click="removeMedicalRecord(medicalRecord._id, index)"><icon name="close"></icon></a>
					</div>
				</li>
			</ul>
			<div v-else class="text-center pt-100">
				<span class="text-primary">Записей нет</span>
				<button class="btn btn-outline-primary btn-small mx-auto mt-50" v-on:click="showModal = true">
					Добавить новую запись<icon name="plus" class="ml-50"></icon>
				</button>
			</div>
		</div>
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
									<form class="d-flex flex-column">
										<div>
											<label for="name">Название</label>
											<input type="text" class="form_input w-100" name="name" v-model="medicamentsForm.name" placeholder="напр.: сальбутамол">
										</div>
										<div>
											<label for="vaccine_content">Содержание</label>
											<input type="text" class="form_input w-100" name="vaccine_content" v-model="medicamentsForm.vaccine_content" placeholder="напр.: 1 табл. 500 мг./2 раза в день">
										</div>
										<div>
											<label for="drug_taking_method">Cпособ приема</label>
											<input type="text" class="form_input w-100" name="drug_taking_method" v-model="medicamentsForm.drug_taking_method" placeholder="напр.: терорально, под язык, ректально">
										</div>
										<div>
											<label for="taking_reason">Причина приема</label>
											<select class="form_input w-100" name="taking_reason" v-model="medicamentsForm.taking_reason">
												<option value="Острый назофарингит насморк">Острый назофарингит насморк</option>
											</select>
										</div>
										<div>
											<label for="date">Дата начала</label>
											<date-picker :date="medicamentsForm.date" :type="'day'"></date-picker>
										</div>
										<div>
											<label for="end_date">Дата завершения</label>
											<date-picker :date="medicamentsForm.end_date" :type="'day'"></date-picker>
										</div>
										<div>
											<label for="note">Примечание</label>
											<textarea name="note" class="form_input w-100" v-model="medicamentsForm.note"></textarea>
										</div>
										<button type="button" v-if="!medicamentsForm.itemId" v-on:click="addMedicalRecord" class="btn btn-primary mx-auto">Добавить</button>
										<button type="button" v-else v-on:click="saveMedicalRecord" class="btn btn-primary mx-auto">Сохранить</button>
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
			item: {title: 'Препараты', icon: 'bed', type: 'medicaments'},
			showModal: false,
			medicalRecordsList: [],
			medicamentsForm: {
				itemId: '',
				name: '',
				vaccine_content: '',
				drug_taking_method: '',
				taking_reason: '',
				date: {time: ''},
				end_date: {time: ''},
				note: '',
			},
		}
	},
	props: ['showWidget', 'isFullWidget'],
	methods: {
		editMedicalRecord: function(id){
			this.$http.get(this.endpoint + this.item.type + '/' + id).then((response) => {
				if(response.data.medicalRecord){
					this.medicamentsForm.itemId = response.data.medicalRecord._id;
					this.medicamentsForm.name = response.data.medicalRecord.name;
					this.medicamentsForm.vaccine_content = response.data.medicalRecord.vaccine_content;
					this.medicamentsForm.drug_taking_method = response.data.medicalRecord.drug_taking_method;
					this.medicamentsForm.taking_reason = response.data.medicalRecord.taking_reason;
					this.medicamentsForm.date.time = response.data.medicalRecord.date.time;
					this.medicamentsForm.end_date.time = response.data.medicalRecord.end_date.time;
					this.medicamentsForm.note = response.data.medicalRecord.note;
					this.showModal = true;
				}else{
					console.log('its no data from db');
				}
			}, function(err){
				console.log(err);
			})
		},
		saveMedicalRecord: function(){
			this.$http.post(this.endpoint + this.item.type + '/' + this.medicamentsForm.itemId, this.medicamentsForm).then((response) => {
				if(response.data.medicalRecord){
					this.medicalRecordsList = [];
					this.getMedicalRecords();
					this.medicamentsForm.itemId = '';
					this.medicamentsForm.name = '';
					this.medicamentsForm.vaccine_content = '';
					this.medicamentsForm.drug_taking_method = '';
					this.medicamentsForm.taking_reason = '';
					this.medicamentsForm.date.time = '';
					this.medicamentsForm.end_date.time = '';
					this.medicamentsForm.note = '';
					this.showModal = false;
				}else{
					console.log(response.data);
				}
			}, function(err){
				console.log(err);
			})
		},
		addMedicalRecord: function(){
			this.$http.put(this.endpoint + this.item.type, this.medicamentsForm).then((response) => {
				if(response.data.medicalRecord){
					this.medicalRecordsList = [];
					this.getMedicalRecords();
					this.medicamentsForm.itemId = '';
					this.medicamentsForm.name = '';
					this.medicamentsForm.vaccine_content = '';
					this.medicamentsForm.drug_taking_method = '';
					this.medicamentsForm.taking_reason = '';
					this.medicamentsForm.date.time = '';
					this.medicamentsForm.end_date.time = '';
					this.medicamentsForm.note = '';
					this.showModal = false;
				}else{
					console.log(response.data);
				}
			}, function(err){
				console.log(err);
			})
		},
		removeMedicalRecord: function(id, index){
			this.$http.delete(this.endpoint + this.item.type + '/' + id).then((response) => {
				if(response.data.medicalRecord){
					this.medicalRecordsList.splice(index, 1)
				}else{
					console.log('item is not removed!');
				}
			}, function(err){
				console.log(err);
			})
		},
		getMedicalRecords: function(){
			this.loading = true;
			this.$http.get(this.endpoint + this.item.type).then((response) => {
				console.log(response);
				if(response.data.medicalRecordsList.length){
					this.medicalRecordsList = response.data.medicalRecordsList;
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