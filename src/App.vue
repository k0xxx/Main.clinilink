<template>
    <div>
        <appHeader v-if="!isAuth"></appHeader>
        <appHeaderAuth v-else></appHeaderAuth>
        <infoBlock v-if="isAuth"></infoBlock>
        <calls v-if="isAuth"></calls>
        <div id="mainView">
            <userMenu v-if="isAuth"></userMenu>
		    <router-view></router-view>
        </div>
        <appFooter v-if="!isAuth"></appFooter>
    </div>
</template>   

<script>
import appHeader from './components/appHeader/appHeader.vue'
import infoBlock from './components/infoBlock/infoBlock.vue'
import appHeaderAuth from './components/appHeader/appHeaderAuth.vue'
import userMenu from './components/userMenu/userMenu.vue'
import appFooter from './components/footer/footer.vue'

export default {
    name: 'app', 
    data () {  
        return {
            isAuth: this.$auth.check(),
        }
    },
    components: { appHeader, infoBlock, appHeaderAuth, userMenu, appFooter },
    updated: function(){
        this.isAuth = this.$auth.check();
    }
}
</script>

<style lang="scss" src="./assets/styles/main.scss"></style>
