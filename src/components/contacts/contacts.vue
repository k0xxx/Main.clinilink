<template>
	<div id="view" class="withSideBar">
		<div id="contacts">
			<contactItem v-for="contact in contactsList" v-bind:key="contact._id" v-bind:contact="contact"></contactItem>
			<infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
				<span slot="no-more">Всё загружено!</span>
			</infinite-loading>
		</div>
	</div>asdasdasd
</template>

<script>
import InfiniteLoading from "vue-infinite-loading"
import contactItem from "./contactItem.vue";

export default {
	name:"contacts",
	components: {contactItem, InfiniteLoading},
	data() {
		return {
			page: 1,
			endpoint: 'http://api.clinilink.org/api/contacts',
			contactsList: []
		}
	},
	methods: {
		onInfinite() {
			var options = {
				params: {page: this.page}
			}
			this.$http.get(this.endpoint, options).then((response) => {
				if (response.data.contactsList.length) {
					this.contactsList = this.contactsList.concat(response.data.contactsList);
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