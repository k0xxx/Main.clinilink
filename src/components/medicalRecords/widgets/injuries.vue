<template>
	<div class="medicalRecordItem card">
		<div class="p-75">
			<div class="title">
				<a href="#" v-if="isFullWidget" @click.prevent="$emit('toogle')">
					<span><icon name="arrow-left"></icon>Назад</span>
				</a>
				<a href="#" @click.prevent="$emit('toogle')">
					<span><icon :name=item.icon class="mr-50"></icon>{{item.title}}</span>
				</a>
				<button class="btn btn-primary d-flex btn-middle" v-on:click="showModal = true"><icon name="plus"></icon></button>
			</div>
		</div>
		<div class="p-75">
			<div v-if="loading" class="p-75 text-center text-primary">
				<icon name="refresh" scale="2" spin></icon>
			</div>
			<ul v-else-if="medical_recordsList" class="medicalRecordList">
				<li v-for="medical_record in medical_recordsList" v-bind:key="medical_record._id" class="medicalRecordList-item">
					<div>{{medical_record.name}}</div>
					<div><icon name="calendar" class="mr-50"></icon>{{medical_record.date | formatMedicalRecord}}</div>
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
					<th>Дата</th>
					<th>Примечание</th>
					<th></th>
				</tr>
				<tr v-for="medical_record in medical_recordsList" v-bind:key="medical_record._id">
					<td>{{medical_record.name}}</td>
					<td>{{medical_record.date | formatMeasurement}}</td>
					<td>{{medical_record.note}}</td>
					<td>Edit</td>
				</tr>
			</table>
		</div>-->
		<div v-if="showModal" class="modal-template">
			<transition name="modal">
				<div class="modal-mask">
					<div class="modal-wrapper">
						<div class="modal-container text-center">
							<div id="closeModalRegister" class="d-flex" v-on:click="showModal = false">
								<icon name="times" scale="1"></icon> 
							</div>
							<div class="modal-header-register p-100">
								<h3>Добавить значение</h3>
							</div>
							<div class="modal-body p-100">
								<form v-on:submit.prevent="addMedicalRecord">
									<label for="name">Название</label>
									<input type="text" name="name" v-model="injuriesForm.name" placeholder="напр.: гепатит В">
									<label for="date">Дата</label>
									<input type="text" name="date" v-model="injuriesForm.date" readonly="">
  									<label for="note">Примечание</label>
									<textarea name="note" v-model="injuriesForm.note"></textarea>
									<button type="submit" class="btn-primary btn-xlarge mt-100">Добавить</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</transition>
		</div> 
	</div>
</template>

<script>
export default {
	name: 'widgetWeight',
	data() {
		return {
			loading: true,
			endpoint: 'http://api.clinilink.org/api/medical_records/',
			item: {title: 'Травмы', icon: 'bed', type: 'injuries'},
			showModal: false,
			medical_recordsList: [],
			injuriesForm: {
				name: '',
				date: '',
				note: '',
			},
		}
	},
	props: ['showWidget', 'isFullWidget'],
	methods: {
		addMedicalRecord: function(){
			this.$http.put(this.endpoint + this.item.type, this.injuriesForm).then((response) => {
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
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  position: relative;
} 
.modal-header-register h3{
  margin: 0px !important;  
}
.modal-header-register{
  background-color: #329d81;
  color: white;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
#closeModalRegister{
        position: absolute;
        top: 6px;
        right: 9px;
        color: white;
        cursor: pointer;  
}
</style>