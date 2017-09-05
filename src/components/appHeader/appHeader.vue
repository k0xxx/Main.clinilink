<template>
	<div id="header">
		<div class="wrapper">
			<router-link to="/">
				<img src="../../assets/logo.png" class="logo">
			</router-link>
			<ul class="header_menu_items d-flex">
				<li class="d-flex align-i-center">
					<router-link to="/about-us" class="mx-50 d-flex global_link">О нас</router-link>
				</li>
				<li class="d-flex align-i-center">
					<router-link to="/library" class="mx-50 d-flex global_link">Справочник</router-link>
				</li>
				<li class="d-flex align-i-center">
					<router-link to="/blog" class="mx-50 d-flex global_link">Блог</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script> 
export default {
  name: 'appHeader',   
  data() { 
    return {
      
    }
  }
}
</script>

<style lang="scss" src="./header.scss"></style>