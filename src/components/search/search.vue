<template>
	<div id="view" class="withSideBar">
		<div id="searchList">
			<contactItem v-for="contact in searchList" v-bind:key="contact._id" v-bind:contact="contact"></contactItem>
			<infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
				<span slot="no-more">Всё загружено!</span>
			</infinite-loading>
		</div>
	</div>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading"
import contactItem from "../contacts/contactItem.vue";

export default {
	name: 'search',
	components: {contactItem, InfiniteLoading},
	data() {
		return {
			page: 1,
			endpoint: 'http://api.clinilink.org/api/search',
			searchList: []
		}
	},
	methods: {
		onInfinite() {
			var options = {
				params: {page: this.page}
			}
			this.$http.get(this.endpoint, options).then((response) => {
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