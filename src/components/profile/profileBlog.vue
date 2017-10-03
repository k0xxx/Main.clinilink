<template>
	<div id="blog">
		<div class="add_newpost_form py-1 text-center">
			<form id="newPost" class='d-flex flex-column mb-75' method="POST" v-on:submit.prevent="sendPost">
				<textarea name="title" class="form_input mb-50" id="postTitle" v-model="newPost.title" cols="30" rows="1" placeholder="Тема..."></textarea>
				<textarea name="text" class="form_input mb-50" id="postText" v-model="newPost.text" cols="30" rows="3" placeholder="Ваш пост..."></textarea>
				<ul v-if="attachfiles" class="d-flex flex-column">
					<li v-for="attachfile in attachfiles">{{attachfile}}</li> 
				</ul>
				<div class="d-flex justify-content-end btn_group">
					<select name="access" class="form_input" v-model="newPost.access" id="postAccess">
						<option value="0" data-icon="fa fa-globe">Доступно всем</option>
						<option value="1" data-icon="fa fa-male">Пациенты</option>
						<option value="2" data-icon="fa fa-universal-access">Специалисты</option>
						<option value="3" data-icon="fa fa-medkit">Врачи</option>
						<option value="4" data-icon="fa fa-eye-slash">Только я</option>
					</select>
					<button class="btn btn-primary" type="submit">Отправить</button>
					<input type="file" id="attachFile" style="display: none;" @change="attachFile">
					<label for="attachFile" class="btn btn-primary"><icon name="plus" scale="0.8"></icon></label>
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
import { baseAPI } from '../../config.js';
import { cdnAPI } from '../../config.js';
import InfiniteLoading from "vue-infinite-loading"
import newsItem from "../news/newsItem.vue"

export default {
	name: 'profileBlog',
	data() {
		return {
			newPost: {
				title: '',
				text: '',
				attachFiles: [],
				access: '0',
			},
			attachfiles: [],
			currentUploadFile: {},
			endpoint: baseAPI + 'news',
			endpointFileUpload: cdnAPI + 'upload',
			page: 1,
			posts: []
		}
	},
	components: {newsItem, InfiniteLoading},
	methods: {
		sendPost: function(){
			this.$http.put(this.endpoint, this.newPost).then((response) => {
				console.log(response);
				this.newPost = {
					title: '',
					text: '',
					attachFiles: [],
					access: '0',
				};
				this.posts.unshift(response.data.post);

			}, function(err){
				console.log(err);
			})
		},
		attachFile: function(e){
			console.log(e);
			var files = e.target.files || e.dataTransfer.files;
			if (!files.length) return;
			this.attachfiles = this.attachfiles.concat(files[0].name)
			this.currentUploadFile = files[0];
			//this.createImage(files[0]);
			var fileForm = new FormData();
			fileForm.append("file", files[0])
			this.currentUploadFile = fileForm;
			this.uploadFile();
		},
		uploadFile: function(fileForm){
			console.log(fileForm);
			this.$http.post(this.endpointFileUpload, this.currentUploadFile).then((response) => {
				console.log(response);
				//this.posts.unshift(response.data.post);
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