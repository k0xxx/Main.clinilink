<template>
	<div id="view">
		<div id="newsList" class="withSideBar">
			<newsItem v-for="post in posts" v-bind:key="post._id" v-bind:post="post"></newsItem>
			<infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
				<span slot="no-more">Всё загружено!</span>
			</infinite-loading>
		</div>
	</div>
</template>

<script>
import { baseAPI } from '../../config.js';
import InfiniteLoading from "vue-infinite-loading"
import newsItem from "./newsItem.vue"

export default {
	name: 'news',
	data() {
		return {
			page: 1,
			endpoint: baseAPI + 'news',
			posts: [],
		}
	},
	components: {newsItem, InfiniteLoading},
	methods: {
		onInfinite() {
			var options = {
				params: {page: this.page}
			}
			this.$http.get(this.endpoint, options).then((response) => {
				console.log(response);
				if (response.data.newsList.length) {
					this.posts = this.posts.concat(response.data.newsList);
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
#newsList{
	display: flex;
	flex-direction: column;
}
</style>