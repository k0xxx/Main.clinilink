<template>
	<div id="header">
		<div class="wrapper">
			<img src="../../assets/logo.png" class="logo">
			<ul class="header_menu_items d-flex">
				<li class="d-flex align-i-center">
					<a href="#" class="mx-50 d-flex"><icon name="bell-o"></icon></a>
				</li>
				<li class="d-flex align-i-center">
					<a href="#" class="mx-50 d-flex"><icon name="question-circle-o"></icon></a>
				</li>
				<li class="d-flex align-i-center">
					<a href="#" class="ml-50 d-flex align-i-center"><icon name="sign-out" class="mr-50"></icon> <span>Выход</span></a>
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
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
#header{ 
    position: fixed;
	height: 50px;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
	background-color: #329d81;
}
#header .wrapper{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: calc(1140px - 1rem);
    max-width: 100%;
    margin: 0 auto;
}
#header .wrapper ul.header_menu_items{
	display: flex;
    flex-direction: row;
}
#header .wrapper ul.header_menu_items li a{
	display: block;
	color: #fff;
	line-height: 50px;
}
#header .wrapper .logo{
	display: block;
    height: 40px;
    margin: 5px 0;
}
</style>