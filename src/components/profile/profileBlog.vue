<template>
	<div id="blog" class="p-75">
		<div class="add_newpost_form py-1 text-center">
			<form id="newPost" class='mb-75' method="POST" v-on:submit.prevent="sendPost">
				<textarea name="title" class="text-areas p-50 mb-50" id="postTitle" v-model="newPost.title" cols="30" rows="1" placeholder="Тема..."></textarea>
				<textarea name="text" class="text-areas p-50  mb-50" id="postText" v-model="newPost.text" cols="30" rows="3" placeholder="Ваш пост..."></textarea>
				<div class="btn-group w-100 justify-content-end d-flex">
					<select name="access" v-model="newPost.access" id="postAccess">
						<option value="0">Доступно всем</option>
					</select>
					<button class="btn btn-primary no-border-radius" type="submit">Отправить</button>
					<button class="btn btn-primary  border-right-radius d-flex align-i-center"><icon name="plus" scale="0.8"></icon></button>
				</div>
			</form>
		</div>
		<div id="blogList">
			<newsItem v-for="post in posts" v-bind:key="post._id" v-bind:post="post"></newsItem>
			<infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
				<span slot="no-more">Всё загружено!</span>
			</infinite-loading>
		</div>
	</div>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading"
import newsItem from "../news/newsItem.vue"

export default {
	name: 'profileBlog',
	data() {
		return {
			newPost: {
				title: '',
				text: '',
				access: '',
			},
			endpoint: 'http://api.clinilink.org/api/news',
			page: 1,
			posts: []
		}
	},
	components: {newsItem, InfiniteLoading},
	methods: {
		sendPost: function(){
				this.$http.put(this.endpoint, this.newPost).then((response) => {
					console.log(response);
					this.posts.unshift(response.data.post);
				}, function(err){
					console.log(err);
				})
		},
		onInfinite() {
			var options = {
				params: {
					page: this.page,
					userId: this.page,
				}
			}
			this.$http.get(this.endpoint, options).then((response) => {
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
		console.log(this.$route);
	}
} 
</script>  