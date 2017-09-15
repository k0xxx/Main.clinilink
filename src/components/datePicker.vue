<style>
.datepicker{
	display: block;
}
.datepicker_input{
	display: inline-block;
	padding: 0.5rem 0.75rem;
	font-size: 1rem;
	line-height: 1.25;
	color: #329d81;
	background-color: #fff;
	background-image: none;
	background-clip: padding-box;
	border: 1px solid rgba(0, 0, 0, 0.15);
	border-radius: 0.25rem;
}
.datepicker_overlay{
	position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1050;
}
.datepicker_block{
	display: block;
    z-index: 1060;
    background: #fff;
    width: 400px;
    margin: 0 auto;
    margin-top: 10%;
    overflow: hidden;
    max-width: 100%;
}
.datepicker_previous,
.datepicker_next{
	display: flex;
    height: 100%;
    align-items: center;
    padding: 2rem;
	font-size: 55px;
	cursor: pointer;
}
.datepicker_previous:hover,
.datepicker_next:hover{
	background: rgba(255, 255, 255, 0.3)
}
.datepicker_caption {
    display: flex;
    justify-content: space-around;
	align-items: center;
	height: 100%;
    font-size: 20px;
}
.datepicker_caption div{
	margin-right: 0.25rem;
}
.datepicker_caption div::last-child{
	margin-right: 0;
}
.datepicker_header{
	display: flex;
    justify-content: space-between;
	background: #6fbfaa;
    color: #fff;
    height: 150px;
    align-items: center;
}
.datepicker_body{
	display: inline-block;
	width: 100%;
	background: #fff;
    padding: 1rem;
    box-sizing: border-box;
    height: 260px;
    text-align: center;
}
.datepicker_week > li{
	display: inline-block;
	width: calc(100% / 7);
	padding: 0.25rem;
	font-weight: bold;
}
.datepicker_week_days .day{
	display: inline-block;
	width: calc(100% / 7);
	padding: 0.25rem;
	cursor: pointer;
}
.datepicker_week_days .day:hover{
	background: #eee;
}
.datepicker_week_days .day.checked{
	background: #f50057;
    color: #fff;
    border-radius: 4px;
}
.datepicker_week_days .day.passive_day{
	color: #bbb;
}
.datepicker_footer{
	display: flex;
	justify-content: space-around;
}
.datepicker_footer span{
	padding: 1rem;
}
</style>

<template>
	<div class="datepicker">
		<div class="datepicker_box">
      		<input type="text" class="datepicker_input" readonly="readonly" v-model="niceDate" @click="showDatepicker" @focus="showDatepicker" />
    	</div>
		<div class="datepicker_overlay" v-if="isDatepicker" @click="dismiss($event)">
			<div class="datepicker_block">
				<div class="datepicker_header">
					<div class="datepicker_previous" @click="nextMonth('previous')"><</div>
					<div class="datepicker_caption">
						<div>{{currentDate.day}}</div>
						<div>{{currentDate.monthName}}</div>
						<div @click="showYear">{{currentDate.year}}</div>
					</div>
					<div class="datepicker_next" @click="nextMonth('next')">></div>
				</div>
				<div class="datepicker_body">
					<ul class="datepicker_week">
						<li v-for="week in weeks">{{week}}</li>
					</ul>
					<div class="datepicker_week_days">
						<div v-for="day, index in dayList" :key="index" 
							 class="day"
							 @click="setDay(day)"
							 :class="{'checked': day.checked, 'passive_day': !(day.inMonth)}" >{{day.value}}</div>
					</div>
				</div>
				<div class="datepicker_footer">
          			<span @click="isDatepicker=false">Отменить</span>
          			<span @click="picked">Сохранить</span>
        		</div>
			</div>
		</div>
	</div>
</template>
<script>
import moment from 'moment'

export default {
	props: {
    	required: false,
		date: {
			type: Object,
      		required: true
		},
	},
	computed: {
		niceDate: function () {
			return moment(this.date.time).format('DD MMM YYYY');
		}
	},
	data() {
		return {
			counter: this.date.time,
			isDatepicker: false,
			weeks: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
          	months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			dayList: [],
			currentDate: {
        		oldtime: '',
        		currentMoment: null,
        		year: '',
				month: '',
				monthName: '',
        		day: '',
        		hour: '00',
        		min: '00'
      		},
			option: {
				dismissible: true,
				type: 'day'
			}
		}
	},
	methods: {
		addNull(n) {
			n = Math.floor(n)
			return n < 10 ? '0' + n : n
		},
		showDatepicker(){
			this.showDay(this.date.time);
			this.isDatepicker = true;
		},
		dismiss(evt) {
			if (evt.target.className === 'datepicker_overlay') {
				if (this.option.dismissible === undefined || this.option.dismissible) {
					this.isDatepicker = false
					this.$emit('cancel')
				}
			}
		},
		showDay (time) {
			let days = []

			if (time === undefined || !Date.parse(time)) {
				this.currentDate.currentMoment = moment()
			} else {
				// chek if format is need =)
				this.currentDate.currentMoment = moment(time, this.option.format)
			}
			
			this.currentDate.year = moment(this.currentDate.currentMoment).format('YYYY')
			this.currentDate.month = moment(this.currentDate.currentMoment).format('MM')
			this.currentDate.day = moment(this.currentDate.currentMoment).format('DD')
			this.currentDate.monthName = this.months[moment(this.currentDate.currentMoment).month()]
			
			let currentMoment = this.currentDate.currentMoment

			let firstDay = moment(currentMoment).date(1).day()
			
			let previousMonth = moment(currentMoment)
			previousMonth.subtract(1, 'months')

			let nextMonth = moment(currentMoment)
			nextMonth.add(1, 'months')
			
			let monthDays = moment(currentMoment).daysInMonth()
			let oldtime = this.currentDate.oldtime

			for (let i = 1; i <= monthDays; ++i) {
				days.push({
					value: i,
					inMonth: true,
					unavailable: false,
					checked: false,
					moment: moment(currentMoment).date(i)
				})
				//if (i === Math.ceil(moment(currentMoment).format('D')) && moment(oldtime, this.option.format).year() === moment(currentMoment).year() && moment(oldtime, this.option.format).month() === moment(currentMoment).month()) {
				if(i === Math.ceil(moment(currentMoment).format('D'))){
					days[i - 1].checked = true
				}
				//this.checkBySelectDays(i, days)
			}

			// Добавление предидущих месяцев
			if (firstDay === 0) firstDay = 7
			for (let i = 0; i < firstDay - (this.option.SundayFirst ? 0 : 1); i++) {
				let passiveDay = {
					value: previousMonth.daysInMonth() - (i),
					inMonth: false,
					action: 'previous',
					unavailable: false,
					checked: false,
					moment: moment(currentMoment).date(1).subtract(i + 1, 'days')
				}
				days.unshift(passiveDay)
			}

			// Добавление следующих месяцев
			var passiveDaysAtFinal = 42 - days.length
			for (let i = 1; i <= passiveDaysAtFinal; i++) {
				let passiveDay = {
					value: i,
					inMonth: false,
					action: 'next',
					unavailable: false,
					checked: false,
					moment: moment(currentMoment).add(1, 'months').date(i)
				}
				days.push(passiveDay)
			}
			/*if (this.limit.length > 0) {
				for (let li of this.limit) {
					switch (li.type) {
						case 'fromto':
							days = this.limitFromTo(li, days)
							break
						case 'weekday':
							days = this.limitWeekDay(li, days)
							break
					}
				}
			}*/
			this.dayList = days
			console.log(days);
		},
		showYear(){
			
		},
		nextMonth (type) {
			let next = null
			type === 'next' ? next = moment(this.currentDate.currentMoment).add(1, 'M') : next = moment(this.currentDate.currentMoment).add(-1, 'M')
			this.showDay(next)
		},
		setDay(obj) {
			console.log(obj);
			if (obj.unavailable || obj.value === '') {
				return false
			}
			if (!(obj.inMonth)) {
				this.nextMonth(obj.action)
			}
			if (this.option.type === 'day' || this.option.type === 'min') {
				this.dayList.forEach((x) => {
					x.checked = false
				})
				this.currentDate.day = this.addNull(obj.value)
				obj.checked = true
			} else {
				let day = this.addNull(obj.value)
				let ctime = this.checked.year + '-' + this.checked.month + '-' + day
				if (obj.checked === true) {
					obj.checked = false
					this.selectedDays.$remove(ctime)
				} else {
					this.selectedDays.push(ctime)
					obj.checked = true
				}
			}
			/*
			switch (this.option.type) {
				case 'day':
					this.picked()
					break
				case 'min':
					this.showOne('hour')
					// shift activated time items to visible position.
					this.shiftActTime()
					break
			}*/
		},
		picked () {
			if (this.option.type === 'day' || this.option.type === 'min') {
				let ctime = this.currentDate.year + '-' + this.currentDate.month + '-' + this.currentDate.day + ' ' + this.currentDate.hour + ':' + this.currentDate.min
				this.currentDate.currentMoment = moment(ctime, 'YYYY-MM-DD HH:mm')
				this.date.time = moment(this.currentDate.currentMoment).format(this.option.format)
			} else {
				//this.date.time = JSON.stringify(this.selectedDays)
			}
			this.isDatepicker = false
			this.$emit('change', this.date.time)
		}
	}
}
</script>