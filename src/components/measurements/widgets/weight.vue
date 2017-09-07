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
			<vue-chart :columns="columns" :rows="rows" :options="options"></vue-chart>
		</div>
		<div v-if="isFullWidget" class="p-75">
			<table>
				<tr>
					<th>Дата</th>
					<th>Вес</th>
					<th>Примечание</th>
					<th></th>
				</tr>
				<tr v-for="measurement in measurementsList" v-bind:key="measurement._id">
					<td>{{measurement.date | formatMeasurement}}</td>
					<td>{{measurement.weight}} кг</td>
					<td>{{measurement.note}}</td>
					<td>Edit</td>
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
									<form class="d-flex flex-column" v-on:submit.prevent="addMeasurement">
										<label for="date">Укажите дату</label> 
										<input type="text" name="date" class="form_input" v-model="weightForm.date"> 
										<label for="weight">Введите значение</label>
										<input type="number" name="weight" class="form_input" v-model="weightForm.weight">
										<label for="note">Примечание</label>
										<textarea name="note" class="form_input" rows="2" v-model="weightForm.note"></textarea>
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
			endpoint: baseAPI + 'measurements/',
			item: {title: 'Вес', icon: 'plus', type: 'weight'},
			showModal: false,
			measurementsList: [],
			weightForm: {
				date: '',
				weight: '',
				note: '',
				type: 'weight',
			},
			columns: [{'type': 'date', 'label': 'Дата'}, {'type': 'number', 'label': 'Вес'}],
			rows: [],
            options: {
				title: 'weight',
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
		addMeasurement: function(){
			this.$http.put(this.endpoint + this.item.type, this.weightForm).then((response) => {
				console.log(response);
				this.weightForm.date = '';
				this.weightForm.weight = '';
				this.weightForm.note = '';
				this.showModal = false;
				this.measurementsList.push(response.data.measurement);
			}, function(err){
				console.log(err);
			})
		},
		getMeasurement: function(){
			this.loading = true;
			this.$http.get(this.endpoint + this.item.type).then((response) => {
				this.measurementsList = response.data.measurementsList;
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
		measurementsList: function (measurement) {
			for(var i = 0; i < measurement.length; i++){
				this.rows.push([new Date(measurement[i].date), parseInt(measurement[i].weight)]);
			}
		},
	},
}
</script>

<style>
table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}
td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}
tr:nth-child(even) {
    background-color: #dddddd;
}
</style>