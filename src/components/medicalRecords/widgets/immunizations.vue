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
				<li v-for="medicalRecord in medicalRecordsList" v-bind:key="medicalRecord._id" class="medicalRecordList-item">
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
											<label for="name">Наименование вакцины</label>
											<input type="text" class="form_input w-100" name="name" v-model="immunizationsForm.name" placeholder="напр.: гепатит В">	
										</div>
										<div>
											<label for="date">Дата получения</label>
											<date-picker :date="immunizationsForm.date" :type="'day'"></date-picker>
										</div>
										<div>
											<label for="injections_count">Кол-во уколов</label>
											<input type="text" class="form_input w-100" name="injections_count" v-model="immunizationsForm.injections_count" placeholder="напр.: 1 из 3">
										</div>
										<div>
											<label for="side_effects">Побочные действия</label>
											<input type="text" class="form_input w-100" name="side_effects" v-model="immunizationsForm.side_effects" placeholder="напр.: Зуд">
										</div>
										<div>
											<label for="note">Примечание</label>
											<textarea name="note" class="form_input w-100" v-model="immunizationsForm.note"></textarea>
										</div>
										<button type="button" v-if="!immunizationsForm.itemId" v-on:click="addMedicalRecord" class="btn btn-primary mx-auto">Добавить</button>
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
	name: 'widgetImmunizations',
	data() {
		return {
			loading: true,
			endpoint: baseAPI + 'medical_records/',
			item: {title: 'Иммунизация', icon: 'bed', type: 'immunizations'},
			showModal: false,
			medicalRecordsList: [],
			immunizationsForm: {
				itemId: '',
				name: '',
				date: {time: ''},
				injections_count: '',
				side_effects: '',
  				note: '',
			},
		}
	},
	props: ['showWidget', 'isFullWidget'],
	methods: {
		editMedicalRecord: function(id){
			this.$http.get(this.endpoint + this.item.type + '/' + id).then((response) => {
				console.log(response);
				if(response.data.medicalRecord){
					this.immunizationsForm.itemId = response.data.medicalRecord._id;
					this.immunizationsForm.name = response.data.medicalRecord.name;
					this.immunizationsForm.date.time = response.data.medicalRecord.date.time;
					this.immunizationsForm.injections_count = response.data.medicalRecord.injections_count;
					this.immunizationsForm.side_effects = response.data.medicalRecord.side_effects;
					this.immunizationsForm.note = response.data.medicalRecord.note;
					this.showModal = true;
				}else{
					console.log('its no data from db');
				}
			}, function(err){
				console.log(err);
			})
		},
		saveMedicalRecord: function(){
			this.$http.post(this.endpoint + this.item.type + '/' + this.immunizationsForm.itemId, this.immunizationsForm).then((response) => {
				if(response.data.medicalRecord){
					this.medicalRecordsList = [];
					this.getMedicalRecords();
					this.immunizationsForm.itemId = '';
					this.immunizationsForm.name = '';
					this.immunizationsForm.date.time = '';
					this.immunizationsForm.injections_count = '';
					this.immunizationsForm.side_effects = '';
					this.immunizationsForm.note = '';
					this.showModal = false;
				}else{
					console.log(response.data);
				}
			}, function(err){
				console.log(err);
			})
		},
		addMedicalRecord: function(){
			this.$http.put(this.endpoint + this.item.type, this.immunizationsForm).then((response) => {
				if(response.data.medicalRecord){
					this.medicalRecordsList = [];
					this.getMedicalRecords();
					this.immunizationsForm.itemId = '';
					this.immunizationsForm.name = '';
					this.immunizationsForm.date.time = '';
					this.immunizationsForm.injections_count = '';
					this.immunizationsForm.side_effects = '';
					this.immunizationsForm.note = '';
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