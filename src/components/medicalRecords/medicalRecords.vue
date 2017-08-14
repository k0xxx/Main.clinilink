<template>
	<div id="view" class="noSideBar">
		<div id="medicalRecords" v-bind:class="{fullWidget: isFullWidget}">
			<widgetGeneralInformation v-if="activeWidgets.wGeneralInformation.show" :showWidget="activeWidgets.wGeneralInformation.show" :isFullWidget="activeWidgets.wGeneralInformation.full" @toogle="toogle('wGeneralInformation')"></widgetGeneralInformation>
			<widgetConsultations v-if="activeWidgets.wConsultations.show" :showWidget="activeWidgets.wConsultations.show" :isFullWidget="activeWidgets.wConsultations.full" @toogle="toogle('wConsultations')"></widgetConsultations>
			<widgetAllergies v-if="activeWidgets.wAllergies.show" :showWidget="activeWidgets.wAllergies.show" :isFullWidget="activeWidgets.wAllergies.full" @toogle="toogle('wAllergies')"></widgetAllergies>
			<widgetImmunization v-if="activeWidgets.wImmunization.show" :showWidget="activeWidgets.wImmunization.show" :isFullWidget="activeWidgets.wImmunization.full" @toogle="toogle('wImmunization')"></widgetImmunization>
			<widgetMedicament v-if="activeWidgets.wMedicament.show" :showWidget="activeWidgets.wMedicament.show" :isFullWidget="activeWidgets.wMedicament.full" @toogle="toogle('wMedicament')"></widgetMedicament>
			<widgetInjuries v-if="activeWidgets.wInjuries.show" :showWidget="activeWidgets.wInjuries.show" :isFullWidget="activeWidgets.wInjuries.full" @toogle="toogle('wInjuries')"></widgetInjuries>
			<widgetOperations v-if="activeWidgets.wOperations.show" :showWidget="activeWidgets.wOperations.show" :isFullWidget="activeWidgets.wOperations.full" @toogle="toogle('wOperations')"></widgetOperations>
			<widgetAnalyzes v-if="activeWidgets.wAnalyzes.show" :showWidget="activeWidgets.wAnalyzes.show" :isFullWidget="activeWidgets.wAnalyzes.full" @toogle="toogle('wAnalyzes')"></widgetAnalyzes>
		</div>
	</div>
</template>

<script>
import widgetConsultations from './widgets/consultations.vue';
import widgetAllergies from './widgets/allergies.vue';
import widgetImmunization from './widgets/immunization.vue';
import widgetMedicament from './widgets/medicament.vue';
import widgetInjuries from './widgets/injuries.vue';
import widgetOperations from './widgets/operations.vue';
import widgetAnalyzes from './widgets/analyzes.vue';
import widgetGeneralInformation from './widgets/generalInformation.vue';
export default {
	name: 'medicalRecords',
	components: {
		widgetConsultations,
		widgetAllergies,
		widgetImmunization,
		widgetMedicament,
		widgetInjuries,
		widgetOperations,
		widgetAnalyzes,
		widgetGeneralInformation
	},
	data() {
		return {
			activeWidgets: {
				wConsultations: {full: false, show: true},
				wAllergies: {full: false, show: true},
				wImmunization: {full: false, show: true},
				wMedicament: {full: false, show: true},
				wInjuries: {full: false, show: true},
				wOperations: {full: false, show: true},
				wAnalyzes: {full: false, show: true},
				wGeneralInformation: {full: false, show: true},
			},
			isFullWidget: false,
		}
	},
	methods: {
		toogle: function(el){
			console.log(this.activeWidgets[el].full);
			if(!this.activeWidgets[el].full){
				this.isFullWidget = true;
				for(var widget in this.activeWidgets){
					this.activeWidgets[widget].show = false;
				}
				this.activeWidgets[el].show = true;
				this.activeWidgets[el].full = true;
			}else{
				this.isFullWidget = false;
				for(var widget in this.activeWidgets){
					this.activeWidgets[widget].show = true;
				}
				this.activeWidgets[el].full = false;
			}
		}
	}
}
</script>

<style>
#medicalRecords{
	column-count: 2;
}
#medicalRecords.fullWidget{
	column-count: 1;
}
</style>