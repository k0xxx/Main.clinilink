<template>
	<div id="view" class="noSideBar">
		<div id="medicalRecords" v-bind:class="{fullWidget: isFullWidget}">
			<widgetConsultations v-if="activeWidgets.wConsultations.show" :showWidget="activeWidgets.wConsultations.show" :isFullWidget="activeWidgets.wConsultations.full" @toogle="toogle('wConsultations')"></widgetConsultations>
			<widgetAllergies v-if="activeWidgets.wAllergies.show" :showWidget="activeWidgets.wAllergies.show" :isFullWidget="activeWidgets.wAllergies.full" @toogle="toogle('wAllergies')"></widgetAllergies>
			<widgetImmunization v-if="activeWidgets.wImmunization.show" :showWidget="activeWidgets.wImmunization.show" :isFullWidget="activeWidgets.wImmunization.full" @toogle="toogle('wImmunization')"></widgetImmunization>
			<widgetMedicament v-if="activeWidgets.wMedicament.show" :showWidget="activeWidgets.wMedicament.show" :isFullWidget="activeWidgets.wMedicament.full" @toogle="toogle('wMedicament')"></widgetMedicament>
			<widgetInjuries v-if="activeWidgets.wInjuries.show" :showWidget="activeWidgets.wInjuries.show" :isFullWidget="activeWidgets.wInjuries.full" @toogle="toogle('wInjuries')"></widgetInjuries>
			<widgetOperations v-if="activeWidgets.wOperations.show" :showWidget="activeWidgets.wOperations.show" :isFullWidget="activeWidgets.wOperations.full" @toogle="toogle('wOperations')"></widgetOperations>
			<widgetAnalyzes v-if="activeWidgets.wAnalyzes.show" :showWidget="activeWidgets.wAnalyzes.show" :isFullWidget="activeWidgets.wAnalyzes.full" @toogle="toogle('wAnalyzes')"></widgetAnalyzes>
			<widgetGeneralInformation v-if="activeWidgets.wGeneralInformation.show" :showWidget="activeWidgets.wGeneralInformation.show" :isFullWidget="activeWidgets.wGeneralInformation.full" @toogle="toogle('wGeneralInformation')"></widgetGeneralInformation>
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
		widgetConsultations, widgetAllergies, widgetImmunization, widgetMedicament, widgetInjuries, widgetOperations, widgetAnalyzes, widgetGeneralInformation
	},
	data() {
		return {
		activeWidgets: {
				widgetConsultations: {
					full: false,
					show: true
				},
				widgetAllergies: {
					full: false,
					show: true
				},
				widgetImmunization: {
					full: false,
					show: true
				},
				widgetMedicament: {
					full: false,
					show: true
				},
				widgetInjuries: {
					full: false,
					show: true
				},
				widgetOperations: {
					full: false,
					show: true
				},
				widgetAnalyzes: {
					full: false,
					show: true
				},
				widgetGeneralInformation: {
					full: false,
					show: true
				},
			},
			isFullWidget: false,
		}
	},
}
</script>

<style>
</style>