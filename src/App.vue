<template>
    <div id="mainView">
        <appHeader v-if="!isAuth"></appHeader>
        <appHeaderAuth v-else></appHeaderAuth>
        <userMenu v-if="isAuth"></userMenu>
		<router-view></router-view>
		<router-view v-if="isAuth" name="sideBar"></router-view>
	</div>
</template>   

<script>
import appHeader from './components/appHeader/appHeader.vue'
import appHeaderAuth from './components/appHeader/appHeaderAuth.vue'
import userMenu from './components/userMenu/userMenu.vue'  

export default {
    name: 'app', 
    data () {  
        return {
            isAuth: this.$auth.check(),
        }
    },
    components: { appHeader, appHeaderAuth, userMenu },
    updated: function(){
        this.isAuth = this.$auth.check();
    }
}
</script>

<style lang="scss" src="./assets/styles/main.scss"></style>
