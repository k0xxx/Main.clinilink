<template>
	<div id="view" class="withSideBar">
		<div id="newsList">
			<blogItem v-for="post in posts" v-bind:key="post._id" v-bind:post="post"></blogItem>
			<infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
				<span slot="no-more">Всё загружено!</span>
			</infinite-loading>
		</div>
	</div>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading"
import blogItem from "./blogItem.vue"

export default {
	name: 'blog',
	data() {
		return {
			page: 1,
			endpoint: 'http://api.clinilink.org/api/blog',
			posts: [],
		}
	},
	components: {blogItem, InfiniteLoading},
	methods: {
		onInfinite() {
			var options = {
				params: {page: this.page}
			}
			this.$http.get(this.endpoint, options).then((response) => {
				console.log(response);
				if (response.data.newsList.length) {
					this.posts = this.posts.concat(response.data.blogList);
					this.page++;
					this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
				} else {
					this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
				}
		  });
		},
	},
}
</script>

<style>
#newsList{
	display: flex;
	flex-direction: column;
}
</style>