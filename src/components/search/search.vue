<template>
	<div id="view">
		<div class="d-flex">
			<div id="searchList" class="withSideBar">
				<contactItem v-for="contact in searchList" v-bind:key="contact._id" v-bind:contact="contact" :contactStatus="0" :isSubscribe="false"></contactItem>
				<infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
					<span slot="no-more">Всё загружено!</span>
				</infinite-loading>
			</div>
			<contactsSearchFilter></contactsSearchFilter>
		</div>
	</div>
</template>

<script>
import { baseAPI } from '../../config.js'
import InfiniteLoading from 'vue-infinite-loading'
import contactsSearchFilter from './searchSidebar.vue'
import contactItem from "../contacts/contactItem.vue"

export default {
	name: 'search',
	components: {contactItem, contactsSearchFilter, InfiniteLoading},
	data() {
		return {
			page: 1,
			endpoint: baseAPI + 'search',
			searchList: []
		}
	},
	methods: {
		onInfinite() {
			var options = {
				params: {page: this.page}
			}
			this.$http.get(this.endpoint, options).then((response) => {
				console.log(response);
				if (response.data.searchList.length) {
					this.searchList = this.searchList.concat(response.data.searchList);
					this.page++;
					this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
				} else {
					this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
				}
		  });
		},
	},
	created: function(){
		
	}
}
</script> 

<style>
#searchList{ 
}
</style>