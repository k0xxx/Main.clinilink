<template>
    <div v-if="infoList.lenght > 0" class="infoBlock">
        <div v-for="(infoItem, index) in infoList" v-bind:key="infoItem.id" class="infoItem">asd</div>
    </div>
</template>   

<script>
import { baseAPI } from '../../config.js';
export default {
    name: 'infoBlock', 
    data () {  
        return {
            endpoint: baseAPI + 'userInfo',
            infoList: []
        }
    },
    methods: {
        getInfo: function(){
            this.$http.get(this.endpoint).then((response) => {
				if (response.data.info.length) {
					this.infoList = this.infoList.concat(response.data.info);
				}
		    });
        }
    },
    created: function(){
        this.getInfo();
    }
}
</script>

<style>
.infoBlock{
    display: flex;
    flex-direction: column;
    width: 1140px;
    padding: 0.5rem 0.5rem 0;
    max-width: 100%;
    margin: 0 auto;
}
.infoBlock .infoItem{
    border: 1px solid #b8daff;
    background-color: #cce5ff;
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    color: #004085;
    margin-bottom: 0.25rem;
}
.infoBlock .infoItem:last-child{
    margin-bottom: 0;
}
</style>
