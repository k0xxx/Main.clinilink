<template>
	<div id="view" class="withSideBar">
		<div id="groups" class="card">
			{{ msg }}
		</div>
	</div>
</template>

<script>
export default {
  name: 'groups',
  data() {
    return {
      msg: 'Это страница зарезервирована для групп!'
    }
  }
}
</script>

<style>
#groups{
}
</style>