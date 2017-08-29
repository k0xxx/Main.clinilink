<template>
	<div class="card postItem">
		<div class="cardAuthorBlock p-75">
			<img :src="postItem.author_ref.img" alt="dialog avatar" class="profileAvatar">
			<ul class="profileInfo">
				<li class="name"> 
					<router-link :to="{ name: 'profile', params: { profileUrl: postItem.author_ref.url }}">
						<icon v-if="postItem.author_ref.status.id > 1" name="plus-square" class='accepted_doctor mr-50'></icon>
						<strong>{{ postItem.author_ref.fullName }}</strong>
					</router-link>
					<small class="text-grey ml-50" v-if="postItem.postType == 'userLike'">понравилась эта запись</small>
					<small class="text-grey ml-50" v-if="postItem.postType == 'userRepost'">поделился этой записью</small>
				</li>
				<li class="status" v-if="postItem.author_ref.status.id > 1">
					<small>{{postItem.author_ref.doc_specialization}}</small>
					<icon name="thumbs-o-up" class="mx-25" scale='0.8'></icon>
					<span class="cout_like">{{postItem.author_ref.grade.rate}}% ({{postItem.author_ref.grade.votes}} оценок)</span>
				</li>
				<li class="date">
					<small class="align-i-center d-flex text-center">{{postItem.date | formatPostDate}}<icon name="globe" scale='0.8' class="px-25"></icon></small> 
				</li>
			</ul>
		</div>
		<div class="cardPostContent p-75">
			<p v-if="postItem.title">{{ postItem.title}}</p>
			<p v-if="postItem.text">{{ postItem.text }}</p>
			<div class="post-item" v-if="postItem.postOriginal">
				<div class="card postItem">
					<div class="cardAuthorBlock p-75">
						<img :src="postItem.postOriginal.author_ref.img" alt="dialog avatar" class="profileAvatar">
						<ul class="profileInfo">
							<li class="name">
								<router-link :to="{ name: 'profile', params: { profileUrl: postItem.postOriginal.author_ref.url }}">
									<icon v-if="postItem.postOriginal.author_ref.status.id > 1" name="plus-square" class='accepted_doctor mr-50'></icon>
									<strong>{{ postItem.postOriginal.author_ref.fullName }}</strong>
								</router-link>
							</li>
							<li class="status" v-if="postItem.author_ref.status.id > 1">
								<small>{{postItem.postOriginal.author_ref.doc_specialization}}</small>
								<icon name="thumbs-o-up" class="mx-50" scale='0.8'></icon>
								<span class="cout_like">{{postItem.postOriginal.author_ref.grade.rate}}% ({{postItem.postOriginal.author_ref.grade.votes}} оценок)</span>
							</li>
							<li class="date">
								<small class="align-i-center d-flex text-center">{{postItem.postOriginal.date | formatPostDate}}<icon name="globe" scale='0.8' class="px-25"></icon></small>
							</li>
						</ul>
					</div>
					<div class="cardPostContent p-75">
						<p>{{ postItem.postOriginal.title }}</p>
						<p>{{ postItem.postOriginal.text }}</p>
					</div> 
				</div>
			</div> 
		</div>
		<div class="cardPostCommentForm p-75" v-if="isRepost">
			<form v-on:submit.prevent="newRepost">
				<div class="text-center text-w-bold">Ваш комментарий</div>
                <textarea name="repostForm" cols="30" rows="3" v-model="repostForm.text" class='repost-area'></textarea>
				<div class="text-right">
				    <button class="btn btn-primary button-middle" type="submit">Поделиться записью</button>
				</div>
			</form>
		</div>
		<div class="comments p-75" v-if="isComment">
			<div class="commetaries_container">
				<newsComment v-for="comment in postItem.comments" v-bind:key="comment._id" v-bind:comment="comment"></newsComment>
			</div>
			<div class="read_more_comments text-center">
				<a href="#">Загрузить больше коментариев</a> 
			</div>  
			<div class="commetaries_form">    
				<form class="d-flex align-i-stretch" v-on:submit.prevent="newComment">
					<img :src="userProfile.img" alt="avatar" height="35px" width="35px" class="mx-1 img-circle">
					<textarea name="" class="w-100 ml-50" id="area_comment" v-model="commentForm.text"></textarea>
					<button class="btn btn-primary no-border-radius" type="submit">Комментарий</button> 
				</form>  
			</div>
		</div>
		<div class="cardPostInteractive">       
			<a href="#" v-on:click.prevent="toogleLikes"><icon name="heart" class="px-50"></icon>{{ likesLen }}</a>
			<a href="#" v-on:click.prevent="toogleComments"><icon name="comment" class="px-50"></icon>{{ commentsLen }}</a>
			<a href="#" v-on:click.prevent="toogleReposts"><icon name="retweet" class="px-50"></icon>{{ repostsLen }}</a>
		</div>
	</div>   
  
</template>

<script>
import newsComment from './newsComment.vue';
export default {
	name: 'newsItem',
	components: {newsComment},
	props: ['post'],
	data() {
		return {
			endpoint: 'http://api.clinilink.org/api/news/'+this.post._id,
			userProfile: {
				displayName: '',
				profileUrl: '',
				img: 'http://cdn.clinilink.org/images/profile/defaultProfile.png',
				status: ''
			},
			isLike: false,
			isComment: false,
			isRepost: false,
			likesLen: this.post.likes.length,
			commentsLen: this.post.comments.length,
			repostsLen: this.post.reposts.length,
			postItem: {
				likes: [],
				comments: [],
				reposts: [],
				date: this.post.date,
				title: this.post.title,
				text: this.post.text,
				postOriginal: this.post.postOriginal,
				postType: this.post.postType,
				author_ref: {
					img: this.post.author_ref.img,
					url: this.post.author_ref.url,
					fullName: this.post.author_ref.fullName,
					status: {id: this.post.author_ref.status.id},
				},
			},
			likeForm: {
				postId: this.post.id,
			},
			commentForm: {
				postId: this.post.id,
				text: ''
			},
			repostForm: {
				postId: this.post.id,
				text: ''
			}
		}
	},
	methods: {
		toogleLikes: function(){
			if(this.isLike){
				this.isLike = false;
			}else{
				this.newLike();
				this.isLike = true;
			}
		},
		toogleComments: function(){
			if(this.isComment){
				this.isComment = false;
			}else{
				this.isLike = false;
				this.isRepost = false;
				this.isComment = true;
				this.getComments();
			}
		},
		toogleReposts: function(){
			if(this.isRepost){
				this.isRepost = false;
			}else{
				this.isLike = false;
				this.isComment = false;
				this.isRepost = true;
			}
		},
		newLike: function(){
			this.$http.put(this.endpoint + '/likes', this.likeForm).then((response) => {
				console.log(response);
				this.postItem.likes.push(response.data.like);
			}, function(err){
				console.log(err);
			})
		},
		newRepost: function(){
			this.$http.put(this.endpoint + '/reposts', this.repostForm).then((response) => {
				console.log(response);
				this.repostForm.text = '';
				this.postItem.reposts.push(response.data.repost);
			}, function(err){
				console.log(err);
			})
		},
		newComment: function(){			
			this.$http.put(this.endpoint + '/comments', this.commentForm).then((response) => {
				console.log(response);
				this.commentForm.text = '';
				this.postItem.comments.push(response.data.comment);
			}, function(err){
				console.log(err);
			})
		},
		getComments: function(){			
			this.$http.get(this.endpoint + '/comments').then((response) => {
				console.log(response);
				this.postItem.comments = response.data.commentsList;
			}, function(err){
				console.log(err);
			})
		},
	},
	created: function(){
		/*var profileData = this.$auth.getUser();
		if(profileData){
			this.userProfile.displayName = profileData.fullName;
			this.userProfile.profileUrl = profileData.url;
			this.userProfile.img = profileData.img;
			this.userProfile.status = profileData.status.name_rus;
		}*/
	}
}
</script>

<style>
.postItem {
	margin-bottom: 1rem;
}
.repost-area{
    width: calc(100% - 2px);
    padding: 0;
}
.cardAuthorBlock {
	display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    border-bottom: 1px solid #ddd;
}
.cardAuthorBlock img.profileAvatar{
	height: 60px;
	width: 60px;
	margin-right: 1rem;
}
.cardAuthorBlock .profileInfo{
	margin: 0;
    padding: 0;
    list-style: none;
}
.cardAuthorBlock .profileInfo .name{
	line-height: 20px;
}
.cardAuthorBlock .profileInfo .status{
	line-height: 20px;
}
.cardAuthorBlock .profileInfo .date{
	line-height: 18px;
}
.cardPostContent {
	border-bottom: 1px solid #ddd;
}
.cardPostCommentForm {
	border-bottom: 1px solid #ddd;
}
.cardPostInteractive {
	display: flex;
	padding: 0.25rem 0.75rem;
}
.cardPostInteractive a{
	display: flex;
    padding: 0.25rem 0.25rem;
	align-items: center;
	color: #636c72;
}
.cardPostInteractive a:hover{
	color: #329d81;
}
</style>