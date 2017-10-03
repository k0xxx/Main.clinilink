<template>
	<div id="view">
		<div class="card px-75 py-50 mb-50">
			<form class="d-flex">
				<input type="text" v-model="filter.search" v-on:keyup="refreshSearch" name="search" class="form_input" placeholder="Поиск...">
			</form>
		</div>
		<div class="d-flex">
			<div id="searchList" class="withSideBar">
				<contactItem v-for="contact in searchList" v-bind:key="contact._id" :contact="contact" :contactStatus="0" :isSubscribe="false" ></contactItem>
				<infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
					<span slot="no-more">Всё загружено!</span>
				</infinite-loading>
			</div>
			<searchSidebar @refreshFilter="refreshSearch" :filter="filter"></searchSidebar>
		</div>
	</div>
</template>

<script>
import { baseAPI } from '../../config.js'
import InfiniteLoading from 'vue-infinite-loading'
import searchSidebar from './searchSidebar.vue'
import contactItem from "../contacts/contactItem.vue"

export default {
	name: 'search',
	components: {contactItem, searchSidebar, InfiniteLoading},
	data() {
		return {
			page: 1,
			endpoint: baseAPI + 'search',
			searchList: [],
			filter: {
				type: '',
				search: '',
				country: '',
				city: '',
				key_words: '',
				med_position: '',
				doc_specialization: '',
				pat_main_disease: '',
			},
		}
	},
	methods: {
		onInfinite() {
			var options = {
				params: {
					page: this.page,
					type: this.filter.type,
					search: this.filter.search,
					country: this.filter.country,
					city: this.filter.city,
					key_words: this.filter.key_words,
					med_position: this.filter.med_position,
					doc_specialization: this.filter.doc_specialization,
					pat_main_disease: this.filter.pat_main_disease,
				},
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
		refreshSearch: function(){
			this.searchList = [];
			this.page = 1;
      		this.$nextTick(() => {
        		this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
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