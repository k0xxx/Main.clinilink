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
			<vue-chart ref="cholesterolChart" :chart-type="chartType" :columns="columns" :rows="rows" :options="options"></vue-chart>
		</div>
		<div v-if="isFullWidget" class="p-75">
			<table>
				<tr>
					<th>Дата</th>
					<th>ЛНП</th>
					<th>ЛВП</th>
					<th>Триглицериды</th>
					<th>Холестерин</th>
					<th>Примечание</th>
					<th></th>
				</tr>
				<tr v-for="(measurement, index) in measurementsList" v-bind:key="measurement._id">
					<td>{{measurement.date.time | formatMeasurement}}</td>
					<td>{{measurement.LNP}}</td>
					<td>{{measurement.LVP}}</td>
					<td>{{measurement.triglycerides}}</td>
					<td>{{measurement.cholesterol}}</td>
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
											<date-picker :date="cholesterolForm.date" :type="'daytime'"></date-picker>
										</div>
										<div>
											<label for="LNP">ЛНП</label>
											<input type="number" name="LNP" placeholder="4.5" class="form_input" min="1" max="10" step="0.01" v-model="cholesterolForm.LNP" required="">
											<span class="input-group-addon">ммоль/л</span>
										</div>
										<div>
											<label for="LVP">ЛВП</label>
											<input type="number" name="LVP" placeholder="2" class="form_input" min="0.5" max="3" step="0.01" v-model="cholesterolForm.LVP" required="">
											<span class="input-group-addon">ммоль/л</span>
										</div>
										<div>
											<label for="triglycerides">Триглицериды</label>
											<input type="number" name="triglycerides" placeholder="2" class="form_input" min="0.14" max="4" step="0.01" v-model="cholesterolForm.triglycerides" required="">
											<span class="input-group-addon">ммоль/л</span>	
										</div>
										<div>
											<label for="cholesterol">Всего холестерин</label>
											<input type="number" name="cholesterol" placeholder="4" class="form_input" min="2" max="8" step="0.01" v-model="cholesterolForm.cholesterol" required="">
											<span class="input-group-addon">ммоль/л</span>
										</div>
										<div>
											<label for="note">Примечание</label>
											<textarea class="form_input" name="note" rows="2" v-model="cholesterolForm.note"></textarea>
										</div>
										<button type="button" v-if="!cholesterolForm.itemId" v-on:click="addMeasurement" class="btn btn-primary mx-auto">Добавить</button>
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
			item: {title: 'Холестерин', icon: 'plus', type: 'cholesterol'},
			showModal: false,
			measurementsList: [],
			cholesterolForm: {
				date: {time: ''},
				LNP: '',
				LVP: '',
				triglycerides: '',
				cholesterol: '',
				note: '',
				type: 'cholesterol',
			},
			chartType: 'Bar',
			columns: [{'type': 'date', 'label': 'Дата'},
					  {'type': 'number', 'label': 'ЛНП'},
					  {'type': 'number', 'label': 'ЛВП'},
					  {'type': 'number', 'label': 'Триглицериды'},
					  {'type': 'number', 'label': 'Холестерин'},
					 ],
			rows: [],
            options: {
				title: 'cholesterol',
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
					this.cholesterolForm.itemId = response.data.measurement._id;
					this.cholesterolForm.date.time = response.data.measurement.date.time;
					this.cholesterolForm.LNP = response.data.LNP;
					this.cholesterolForm.LVP = response.data.LVP;
					this.cholesterolForm.triglycerides = response.data.triglycerides;
					this.cholesterolForm.cholesterol = response.data.cholesterol;
					this.cholesterolForm.note = response.data.measurement.note;
					this.showModal = true;
				}else{
					console.log('its no data from db');
				}
			}, function(err){
				console.log(err);
			})
		},
		saveMeasurement: function(){
			this.$http.post(this.endpoint + this.item.type + '/' + this.cholesterolForm.itemId, this.cholesterolForm).then((response) => {
				if(response.data.measurement){
					this.measurementsList = [];
					this.getMeasurement();
					this.cholesterolForm.itemId = '';
					this.cholesterolForm.date.time = '';
					this.cholesterolForm.LNP = '';
					this.cholesterolForm.LVP = '';
					this.cholesterolForm.triglycerides = '';
					this.cholesterolForm.cholesterol = '';
					this.cholesterolForm.note = '';
					this.showModal = false;
				}else{
					console.log(response.data);
				}
			}, function(err){
				console.log(err);
			})
		},
		addMeasurement: function(){
			this.$http.put(this.endpoint + this.item.type, this.cholesterolForm).then((response) => {
				if(response.data.measurement){
					this.measurementsList = [];
					this.getMeasurement();
					this.cholesterolForm.itemId = '';
					this.cholesterolForm.date.time = '';
					this.cholesterolForm.LNP = '';
					this.cholesterolForm.LVP = '';
					this.cholesterolForm.triglycerides = '';
					this.cholesterolForm.cholesterol = '';
					this.cholesterolForm.note = '';
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
			this.$refs.cholesterolChart.drawChart();
		},
		measurementsList: function (measurement) {
			if(measurement.length > 0){
				for(var i = 0; i < measurement.length; i++){
					this.rows.push([new Date(measurement[i].date.time),
									parseInt(measurement[i].LNP),
									parseInt(measurement[i].LVP),
									parseInt(measurement[i].triglycerides),
									parseInt(measurement[i].cholesterol)
								]);
				}
			}
		},
	},
}
</script>

<style>

</style>