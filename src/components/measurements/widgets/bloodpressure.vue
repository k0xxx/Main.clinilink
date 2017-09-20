<template>
	<div class="measurementItem card">
		<div class="title">
			<a href="#" v-if="isFullWidget" @click.prevent="$emit('toogle')">
				<span><icon name="arrow-left" class="mr-50"></icon>Назад</span>
			</a>
			<a href="#" @click.prevent="$emit('toogle')">
				<span><icon :name=item.icon class="mr-50"></icon>{{item.title}}</span>
			</a>
			<button class="btn btn-primary" v-on:click="showModal = true"><icon name="plus"></icon></button>
		</div>
		<div v-if="loading" class="p-75 text-center text-primary">
			<icon name="refresh" scale="2" spin></icon>
		</div>
		<div v-else class="measurementItemGraph p-75">
			<vue-chart ref="bloodpressureChart" :columns="columns" :rows="rows" :options="options"></vue-chart>
		</div>
		<div v-if="isFullWidget" class="p-75">
			<table>
				<tr>		
					<th>Дата</th>
					<th>Систолическое</th>
					<th>Диастолическое</th>
					<th>Пульс</th>
					<th>Аритмия</th>
					<th>Примечание</th>
					<th></th>
				</tr>
				<tr v-for="(measurement, index) in measurementsList" v-bind:key="measurement._id">
					<td>{{measurement.date.time | formatMeasurement}}</td>
					<td>{{measurement.systolic}}</td>
					<td>{{measurement.diastolic}}</td>
					<td>{{measurement.pulse}}</td>
					<td>{{measurement.arrhythmia}}</td>
					<td>{{measurement.note}}</td>
					<td class="editBtns">
						<a href="#" class="edit" v-on:click="editMeasurment(measurement._id)"><icon name="pencil"></icon></a>
						<a href="#" class="remove" v-on:click="removeMeasurment(measurement._id, index)"><icon name="close"></icon></a>
					</td>
				</tr>
			</table>
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
											<label for="date">Дата</label>
											<date-picker v-bind:date="bloodpressureForm.date" :type="'daytime'"></date-picker>
										</div>
										<div>
											<label for="systolic">Систола</label>
											<input type="number" name="systolic" placeholder="120" class="form_input" min="0" max="400" v-model="bloodpressureForm.systolic" required="">
											<div class="col-2 text-center py-1">/</div>
											<label for="diastolic">Диастола</label>
											<input type="number" name="diastolic" placeholder="80" class="form_input" min="0" max="400" v-model="bloodpressureForm.diastolic" required="">
										</div>
										<div>
											<label for="pulse">Пульс</label>
											<input type="number" name="pulse" placeholder="80" class="form_input" min="0" max="400" v-model="bloodpressureForm.pulse" required="">
											<span class="input-group-addon">уд/м</span>
										</div>
										<div>
											<label for="arrhythmia">Аритмия</label>
											<select class="form_input" name="arrhythmia" v-model="bloodpressureForm.arrhythmia">
												<option value="Нет" selected="">Нет</option>
												<option value="Обнаружена">Обнаружена</option>
											</select>
										</div>
										<div>
											<label for="note">Примечание</label>
											<textarea class="form_input" name="note" rows="2" v-model="bloodpressureForm.note"></textarea>
										</div>
										<button type="button" v-if="!bloodpressureForm.itemId" v-on:click="addMeasurement" class="btn btn-primary mx-auto">Добавить</button>
										<button type="button" v-else v-on:click="saveMeasurement" class="btn btn-primary mx-auto">Сохранить</button>
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
			endpoint: baseAPI + 'measurements/',
			item: {title: 'Кровяное давление', icon: 'plus', type: 'bloodpressure'},
			showModal: false,
			measurementsList: [],
			bloodpressureForm: {
				date: {time: ''},
				systolic: '',
				diastolic: '',
				pulse: '',
				arrhythmia: '',
				note: '',
				type: 'bloodpressure',
			},
			columns: [{'type': 'date', 'label': 'Дата'}, {'type': 'number', 'label': 'Систолическое'}, {'type': 'number', 'label': 'Диастолическое'}],
			rows: [],
            options: {
				title: 'bloodpressure',
				titlePosition: 'none',
				vAxis: {
					gridlines: {color: 'none'},
					minValue: 0
				},
				legend: { position: 'bottom' },
				chartArea: {'width': '85%', 'height': '50%'},
            }
            
		}
	},
	props: ['showWidget', 'isFullWidget'],
	methods: {
		editMeasurment: function(id){
			this.$http.get(this.endpoint + this.item.type + '/' + id).then((response) => {
				if(response.data.measurement){				
					this.bloodpressureForm.itemId = response.data.measurement._id;
					this.bloodpressureForm.date.time = response.data.measurement.date.time;
					this.bloodpressureForm.systolic = response.data.measurement.systolic;
					this.bloodpressureForm.diastolic = response.data.measurement.diastolic;
					this.bloodpressureForm.pulse = response.data.measurement.pulse;
					this.bloodpressureForm.arrhythmia = response.data.measurement.arrhythmia;
					this.bloodpressureForm.note = response.data.measurement.note;
					this.showModal = true;
				}else{
					console.log('its no data from db');
				}
			}, function(err){
				console.log(err);
			})
		},
		saveMeasurement: function(){
			this.$http.post(this.endpoint + this.item.type + '/' + this.bloodpressureForm.itemId, this.bloodpressureForm).then((response) => {
				if(response.data.measurement){
					this.measurementsList = [];
					this.getMeasurement();
					this.bloodpressureForm.itemId = '';
					this.bloodpressureForm.date.time = '';
					this.bloodpressureForm.systolic = '';
					this.bloodpressureForm.diastolic = '';
					this.bloodpressureForm.pulse = '';
					this.bloodpressureForm.arrhythmia = '';
					this.bloodpressureForm.note = '';
					this.showModal = false;
				}else{
					console.log(response.data);
				}
			}, function(err){
				console.log(err);
			})
		},
		addMeasurement: function(){
			this.$http.put(this.endpoint + this.item.type, this.bloodpressureForm).then((response) => {
				if(response.data.measurement){
					this.measurementsList = [];
					this.getMeasurement();
					this.bloodpressureForm.itemId = '';
					this.bloodpressureForm.date.time = '';
					this.bloodpressureForm.systolic = '';
					this.bloodpressureForm.diastolic = '';
					this.bloodpressureForm.pulse = '';
					this.bloodpressureForm.arrhythmia = '';
					this.bloodpressureForm.note = '';
					this.showModal = false;
				}else{
					console.log(response.data);
				}
			}, function(err){
				console.log(err);
			})
		},
		removeMeasurment: function(id, index){
			this.$http.delete(this.endpoint + this.item.type + '/' + id).then((response) => {
				if(response.data.measurement){
					this.measurementsList.splice(index, 1)
				}else{
					console.log('item is not removed!');
				}
			}, function(err){
				console.log(err);
			})
		},
		getMeasurement: function(){
			this.loading = true;
			this.$http.get(this.endpoint + this.item.type).then((response) => {
				if(response.data.measurementsList){
					this.measurementsList = response.data.measurementsList;	
				}
				this.loading = false;
			}, function(err){
				console.log(err);
			})
		}
	},
	created: function(){
		this.getMeasurement();
	},
	watch: {
		isFullWidget: function(){
			this.$refs.bloodpressureChart.drawChart();
		},
		measurementsList: function (measurement) {
			if(measurement.length > 0){
				for(var i = 0; i < measurement.length; i++){
					this.rows.push([new Date(measurement[i].date.time), parseInt(measurement[i].systolic), parseInt(measurement[i].diastolic)]);
				}
			}
		},
	},
}
</script>

<style>

</style>