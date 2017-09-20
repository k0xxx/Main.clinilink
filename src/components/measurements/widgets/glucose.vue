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
			<vue-chart ref="glucoseChart" :columns="columns" :rows="rows" :options="options"></vue-chart>
		</div>
		<div v-if="isFullWidget" class="p-75">
			<table>
				<tr>
					<th>Дата</th>
					<th>Глюкоза в крови</th>
					<th>Контекст измерения</th>
					<th>Примечание</th>
					<th></th>
				</tr>
				<tr v-for="(measurement, index) in measurementsList" v-bind:key="measurement._id">
					<td>{{measurement.date.time | formatMeasurement}}</td>
					<td>{{measurement.glucose}} ммоль/л</td>
					<td>{{measurement.context}}</td>
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
										<label for="date">Дата</label>
										<date-picker :date="glucoseForm.date" :type="'daytime'"></date-picker>
										<label for="glucose">Показатель глюкозы</label>
										<input type="number" name="glucose" class="form_input" placeholder="4.5" min="1.5" max="32" step="0.01" v-model="glucoseForm.glucose" required="" autofocus="">
										<span class="input-group-addon">ммоль/л</span>
										<label for="context">Контекст измерения</label>
										<select class="form_input" name="context" v-model="glucoseForm.context">
											<option value="Натощак" selected="">Натощак</option>
											<option value="После еды">После еды</option>
										</select>
										<label for="note">Примечание</label>
										<textarea name="note" class="form_input" rows="2" v-model="glucoseForm.note"></textarea>
										<button type="button" v-if="!glucoseForm.itemId" v-on:click="addMeasurement" class="btn btn-primary mx-auto">Добавить</button>
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
	name: 'widgetGlucose',
	data() {
		return {
			loading: true,
			endpoint: baseAPI + 'measurements/',
			item: {title: 'Глюкоза в крови', icon: 'plus', type: 'glucose'},
			showModal: false,
			measurementsList: [],
			glucoseForm: {
				date: {time: ''},
				glucose: '',
				context: '',
				note: '',
				type: 'glucose',
			},
			columns: [{'type': 'date', 'label': 'Дата'}, {'type': 'number', 'label': 'Глюкоза в крови'}],
			rows: [],
            options: {
				title: 'glucose',
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
					this.glucoseForm.itemId = response.data.measurement._id;
					this.glucoseForm.date.time = response.data.measurement.date.time;
					this.glucoseForm.glucose = response.data.measurement.glucose;
					this.glucoseForm.context = response.data.measurement.context;
					this.glucoseForm.note = response.data.measurement.note;
					this.showModal = true;
				}else{
					console.log('its no data from db');
				}
			}, function(err){
				console.log(err);
			})
		},
		saveMeasurement: function(){
			this.$http.post(this.endpoint + this.item.type + '/' + this.glucoseForm.itemId, this.glucoseForm).then((response) => {
				if(response.data.measurement){
					this.measurementsList = [];
					this.getMeasurement();
					this.glucoseForm.itemId = '';
					this.glucoseForm.date.time = '';
					this.glucoseForm.glucose = '';
					this.glucoseForm.context = '';
					this.glucoseForm.note = '';
					this.showModal = false;
				}else{
					console.log(response.data);
				}
			}, function(err){
				console.log(err);
			})
		},
		addMeasurement: function(){
			this.$http.put(this.endpoint + this.item.type, this.glucoseForm).then((response) => {
				if(response.data.measurement){
					this.measurementsList = [];
					this.getMeasurement();
					this.glucoseForm.itemId = '';
					this.glucoseForm.date.time = '';
					this.glucoseForm.glucose = '';
					this.glucoseForm.context = '';
					this.glucoseForm.note = '';
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
			this.$refs.glucoseChart.drawChart();
		},
		measurementsList: function (measurement) {
			if(measurement.length > 0){
				for(var i = 0; i < measurement.length; i++){
					this.rows.push([new Date(measurement[i].date.time), parseInt(measurement[i].glucose)]);
				}
			}
		},
	},
}
</script>

<style>

</style>