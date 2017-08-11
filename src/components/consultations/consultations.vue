<template>
	<div id="view" class="noSideBar">
		<div id="consultations" class="card">
			{{ msg }}
		</div>
	</div>
</template>

<script>
export default {
  name: 'consultations',
  data() {
    return {
      msg: 'Это страница зарезервирована для консультаций!'
    }
  }
}
</script>

<style>
#consultations{
}
</style>