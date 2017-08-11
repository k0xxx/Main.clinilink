<template>
	<div class="measurementItem card">
		<div class="measurementItemTitle p-75">
			<a href="#" @click.prevent="$emit('toogle')">
				<span v-if="isFullWidget"><icon name="arrow-left"></icon>Назад</span>
				<span><icon :name=item.icon class="mr-50"></icon>{{item.title}}</span>
				<button class="btn btn-primary d-flex btn-middle" v-on:click="showModal = true"><icon name="plus"></icon></button>
			</a>
		</div> 
		<div class="measurementItemGraph p-75">
			<vue-chart :columns="columns" :rows="rows" :options="options"></vue-chart>
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
				<tr v-for="measurement in measurementsList">
					<td>{{measurement.date | formatMeasurement}}</td>
					<td>{{measurement.bloodpressure.systolic}}</td>
					<td>{{measurement.bloodpressure.diastolic}}</td>
					<td>{{measurement.bloodpressure.pulse}}</td>
					<td>{{measurement.bloodpressure.arrhythmia}}</td>
					<td>{{measurement.bloodpressure.note}}</td>
					<td>Edit</td>
				</tr>
			</table>
		</div>
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
								<form v-on:submit.prevent="addMeasurement">
									<input type="text" name="date" class="form-control text-center" v-model="bloodpressureForm.date">
									<span class="input-group-addon"><i class="fa fa-calendar"></i></span>
									<label for="systolic">Систола</label>
									<input type="number" name="systolic" placeholder="120" class="form-control text-center" min="0" max="400" v-model="bloodpressureForm.systolic" required="">
									<div class="col-2 text-center py-1">/</div>
									<label for="diastolic">Диастола</label>
									<input type="number" name="diastolic" placeholder="80" class="form-control text-center" min="0" max="400" v-model="bloodpressureForm.diastolic" required="">
									<label for="pulse">Пульс</label>
									<input type="number" name="pulse" placeholder="80" class="form-control text-center" min="0" max="400" v-model="bloodpressureForm.pulse" required="">
									<span class="input-group-addon">уд/м</span>
									<label for="arrhythmia">Аритмия</label>
									<select class="form-control text-center" name="arrhythmia" v-model="bloodpressureForm.arrhythmia">
										<option value="Нет" selected="">Нет</option>
										<option value="Обнаружена">Обнаружена</option>
									</select>
									<label for="note">Примечание</label>
									<textarea class="form-control" name="note" rows="1" v-model="bloodpressureForm.note"></textarea>
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
			endpoint: 'http://api.clinilink.org/api/measurements/',
			item: {title: 'Анализы', icon: 'bed', type: 'bloodpressure'},
			showModal: false,
			measurementsList: [],
			bloodpressureForm: {
				date: '',
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
				hAxis: {
					//format: 'EE',
					//gridlines: {count: -1}
				},
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
			this.$http.put(this.endpoint + this.bloodpressureForm.type, this.bloodpressureForm).then((response) => {
				console.log(response);
				this.bloodpressureForm.date = '';
				this.showModal = false;
				this.measurementsList.push(response.data.measurement);
			}, function(err){
				console.log(err);
			})
		},
		getMeasurement: function(){
			this.$http.get(this.endpoint + this.bloodpressureForm.type).then((response) => {
				console.log(response);
				this.measurementsList = response.data.measurementsList;
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
				this.rows.push([new Date(measurement[i].date), parseInt(measurement[i].bloodpressure.systolic), parseInt(measurement[i].bloodpressure.diastolic)]);
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
.measurementItem{
	display: inline-block;
    width: 100%;
}
.measurementItemTitle a{
	display: flex;
    justify-content: space-between;
    font-size: 1.3rem;
	border-bottom: 1px solid #329d81;
	align-items: center;
}
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