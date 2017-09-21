<style>
.datepicker{
	display: block;
}
.datepicker_input{
	display: inline-block;
	width: 100%;
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
	flex-direction: column;
    justify-content: center;
	align-items: center;
	height: 100%;
    font-size: 20px;
}
.datepicker_caption div{
	margin-bottom: 0.25rem;
	font-weight: bold;
	cursor: pointer;
}
.datepicker_caption div::last-child{
	margin-bottom: 0;
}
.datepicker_caption div:hover{
	color: #eee;
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
    box-sizing: border-box;
    height: 260px;
    text-align: center;
}
.datepicker_body_box{
	height: 100%;
}
.datepicker_body_box.type_day{
	padding: 1rem;
}
.datepicker_body_box.type_month,
.datepicker_body_box.type_year{
	overflow: auto;
}
.datepicker_body_box.type_hour ul{
	display: inline-block;
    width: 50%;
    overflow: auto;
    height: 100%;
}
.datepicker_body_box.type_month::-webkit-scrollbar,
.datepicker_body_box.type_year::-webkit-scrollbar,
.datepicker_body_box.type_hour ul::-webkit-scrollbar{
	width: 2px;
}
.datepicker_body_box.type_month li,
.datepicker_body_box.type_year li,
.datepicker_body_box.type_hour ul li{
	padding: 0.5rem 0;
    font-size: 18px;
    cursor: pointer;
}
.datepicker_body_box.type_month li:hover,
.datepicker_body_box.type_year li:hover,
.datepicker_body_box.type_hour ul li:hover{
	background: #eee;
}
.datepicker_body_box.type_hour ul li.hour-item.active,
.datepicker_body_box.type_hour ul li.min-item.active{
	background: #f50057;
	color: #fff;
    border-radius: 4px;
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
						<!--<div>{{currentDate.day}}</div>-->
						<div @click="showYear">{{currentDate.year}}</div>
						<div @click="showMonth">{{currentDate.monthName}}</div>
						<div @click="showTime" v-if="type != 'day'">{{currentDate.hour}}:{{currentDate.min}}</div>
					</div>
					<div class="datepicker_next" @click="nextMonth('next')">></div>
				</div>
				<div class="datepicker_body">
					<div class="datepicker_body_box type_day" v-if="showInfo.day">
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
		  			<ul class="datepicker_body_box type_month" v-if="showInfo.month">
						<li v-for="monthItem, index in months" :key="index" @click="setMonth(monthItem)">{{monthItem}}</li>
					</ul>
					<ul class="datepicker_body_box type_year" v-if="showInfo.year" id="yearList">
						<li v-for="yearItem, index in years" :key="index" @click="setYear(yearItem)">{{yearItem}}</li>
					</ul>
					<div class="datepicker_body_box type_hour" v-if="showInfo.hour">
						<ul>
							<li class="hour-item" v-for="hitem in hours" @click="setTime('hour', hitem, hours)" :class="{'active':hitem.checked}">{{hitem.value}}</li>
						</ul>
						<ul>
							<li class="min-item" v-for="mitem in mins" @click="setTime('min', mitem, mins)" :class="{'active':mitem.checked}">{{mitem.value}}</li>
						</ul>
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
//use this option for select time :type="'daytime'"
export default {
	props: {
    	required: false,
		date: {
			type: Object,
      		required: true
		},
		type: {
			type: String,
			required: false,
			default: 'day'
		}
	},
	created: function () {
		if(this.date.time){
			this.currentDate.currentMoment = moment(this.date.time, this.option.format)
		}
  	},
	computed: {
		niceDate: function () {
			if(this.currentDate.currentMoment){
				if(this.type == 'daytime'){
					return moment(this.currentDate.currentMoment).format('HH:mm DD MMMM YYYY');
				}else if(this.type == 'day'){
					return moment(this.currentDate.currentMoment).format('DD MMMM YYYY');
				}
			}else{
				return 'Выберите дату...';
			}
		}
	},
	data() {
		function hours () {
      		let list = []
      		let hour = 24
      		while (hour > 0) {
        		hour--
        		list.push({
          			checked: false,
          			value: hour < 10 ? '0' + hour : hour
        		})
      		}
      		return list
    	}
    	function mins () {
      		let list = []
      		let min = 60
      		while (min > 0) {
        		min--
        		list.push({
          			checked: false,
          			value: min < 10 ? '0' + min : min
        		})
      		}
      		return list
    	}
		return {
			isDatepicker: false,
			hours: hours(),
      		mins: mins(),
			dayList: [],
			weeks: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
			months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
			years: [],
			showInfo: {
        		hour: false,
        		day: false,
        		month: false,
        		year: false,
        		check: false
      		},
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
		// Добавение 0 перед датой
		addNull(n) {
			n = Math.floor(n)
			return n < 10 ? '0' + n : n
		},

		// Показать Datepicker
		showDatepicker(){
			this.showDay(this.date.time);
			this.isDatepicker = true;
		},

		// Отменить Datepicker
		dismiss(evt) {
			if (evt.target.className === 'datepicker_overlay') {
				if (this.option.dismissible === undefined || this.option.dismissible) {
					this.isDatepicker = false
					this.$emit('cancel')
				}
			}
		},

		// Вывод календаря
		showDay (time) {
			let days = []
			if (time === undefined || !Date.parse(time)) {
				this.currentDate.currentMoment = moment()
			} else {
				this.currentDate.currentMoment = moment(time, this.option.format)
			}

			this.switchPicker('day')

			this.currentDate.year = moment(this.currentDate.currentMoment).format('YYYY')
			this.currentDate.month = moment(this.currentDate.currentMoment).format('MM')
			this.currentDate.day = moment(this.currentDate.currentMoment).format('DD')
			this.currentDate.monthName = this.months[moment(this.currentDate.currentMoment).month()]

			if(this.type != 'day'){
				this.currentDate.hour = moment(this.currentDate.currentMoment).format('HH');
				this.currentDate.min = moment(this.currentDate.currentMoment).format('mm');
			}
			
			console.log(this.currentDate);

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
		},

		// Вставить в дату выбранный день
		setDay(obj) {
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
		
		// Показать выбор времени
		showTime(){
			this.switchPicker('hour')
		},
		
		// Установить время
		setTime (type, obj, list) {
			for (let item of list) {
				item.checked = false
				if (item.value === obj.value) {
					item.checked = true
					this.currentDate[type] = item.value
				}
			}
		},

		// Показать список месяцев
		showMonth () {
			this.switchPicker('month')
		},

		// Вставить в дату выбранный месяц
		setMonth (month) {
			let mo = (this.months.indexOf(month) + 1)
			if (mo < 10) {
				mo = '0' + '' + mo
			}
			this.currentDate.currentMoment = moment(this.currentDate.year + '-' + mo + '-' + this.currentDate.day + ' ' + this.currentDate.hour + ':' + this.currentDate.min)
			this.showDay(this.currentDate.currentMoment)
		},

		// Переключить следующий/предидущий месяц
		nextMonth (type) {
			let next = null
			type === 'next' ? next = moment(this.currentDate.currentMoment).add(1, 'M') : next = moment(this.currentDate.currentMoment).add(-1, 'M')
			this.showDay(next)
		},

		// Показать список лет
		showYear () {
			let year = moment(this.currentDate.currentMoment).year()
			this.years = []
			let yearTmp = []
			for (let i = year - 100; i < year + 5; ++i) {
				yearTmp.push(i)
			}
			this.years = yearTmp

			this.switchPicker('year')
			this.$nextTick(() => {
				let listDom = document.getElementById('yearList')
				listDom.scrollTop = (listDom.scrollHeight - 100)
				this.addYear()
			})
		},
		addYear () {
			let listDom = document.getElementById('yearList')
			listDom.addEventListener('scroll', (e) => {
				if (listDom.scrollTop < listDom.scrollHeight - 100) {
					let len = this.years.length
					let lastYear = this.years[len - 1]
					this.years.push(lastYear + 1)
				}
			}, false)
		},
		// Вставить в дату выбранный год
		setYear (year) {
			this.currentDate.currentMoment = moment(year + '-' + this.currentDate.month + '-' + this.currentDate.day + ' ' + this.currentDate.hour + ':' + this.currentDate.min)
			this.showDay(this.currentDate.currentMoment)
		},

		// Переключение между типами Datepicker
		switchPicker (type) {
			switch (type) {
				case 'year':
					this.showInfo.hour = false
					this.showInfo.day = false
					this.showInfo.year = true
					this.showInfo.month = false
					break
				case 'month':
					this.showInfo.hour = false
					this.showInfo.day = false
					this.showInfo.year = false
					this.showInfo.month = true
					break
				case 'day':
					this.showInfo.hour = false
					this.showInfo.day = true
					this.showInfo.year = false
					this.showInfo.month = false
					break
				case 'hour':
					this.showInfo.hour = true
					this.showInfo.day = false
					this.showInfo.year = false
					this.showInfo.month = false
					break
				default:
					this.showInfo.day = true
					this.showInfo.year = false
					this.showInfo.month = false
					this.showInfo.hour = false
			}
		},
		
		// Вставить выбранную дату в поле ввода даты
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