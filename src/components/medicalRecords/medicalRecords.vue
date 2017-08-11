<template>
	<div id="view" class="noSideBar">
		<div id="medicalRecords" class="card">
			{{ msg }}
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