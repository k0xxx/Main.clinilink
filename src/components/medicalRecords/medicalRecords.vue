<template>
	<div id="view" class="noSideBar">
			<div id="medicalRecords" v-bind:class="{fullWidget: isFullWidget}">
        <widgetWeight v-if="activeWidgets.wWeight.show" :showWidget="activeWidgets.wWeight.show" :isFullWidget="activeWidgets.wWeight.full" @toogle="toogle('wWeight')"></widgetWeight>
        <widgetGlucose v-if="activeWidgets.wGlucose.show" :showWidget="activeWidgets.wGlucose.show" :isFullWidget="activeWidgets.wGlucose.full" @toogle="toogle('wGlucose')"></widgetGlucose>
        <widgetBloodpressure v-if="activeWidgets.wBloodpressure.show" :showWidget="activeWidgets.wBloodpressure.show" :isFullWidget="activeWidgets.wBloodpressure.full" @toogle="toogle('wBloodpressure')"></widgetBloodpressure>
        <widgetCholesterol v-if="activeWidgets.wCholesterol.show" :showWidget="activeWidgets.wCholesterol.show" :isFullWidget="activeWidgets.wCholesterol.full" @toogle="toogle('wCholesterol')"></widgetCholesterol>
        <widgetHeight v-if="activeWidgets.wHeight.show" :showWidget="activeWidgets.wHeight.show" :isFullWidget="activeWidgets.wHeight.full" @toogle="toogle('wHeight')"></widgetHeight>
      </div>
	</div>
</template>

<script>
export default {
  name: 'medicalRecords',
  data() {
    return {
      msg: 'Это страница зарезервирована для медицинской карты!'
    }
  }
}
</script>

<style>
#medicalRecords{
    
}
</style>