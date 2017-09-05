<template>
	<div id="classSelector">
		<div v-if="!$route.params.classId">
			<h3>Список классов</h3>
			<ul>
				<li v-for="libClass in libraryClassList" v-bind:key="libClass._id">
					<router-link :to="'/adminpage/library/libClass/'+libClass._id" >{{libClass.class_id}} - {{libClass.class_sub_index}} - {{libClass.class_name}}</router-link>
				</li>
			</ul>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'ClassSelector',
	data() {
		return {      
			endpointClasses: 'https://api.clinilink.org/api/adminpage/library/getClasses',
			classSearch: '',
			libraryClassList: [],
		}
	},
	methods: {
		getClasses: function(){
		
			this.$http.get(this.endpointClasses).then((response) => {
				console.log(response.data);
				this.libraryClassList = response.data;
			});
		},
    },
	created: function(){
		this.getClasses();
	},
}
</script>

<style>
    
</style>    