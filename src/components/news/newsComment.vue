<template>
	<div class="mb-50 d-flex comment">
		<a href="#" class="avatar_commentator">
			<img :src="commentItem.authorRef.img" alt="" width="54px" height="54px">
		</a>
		<ul class="list pl-50">
			<li class=''>
				<a href="#">{{commentItem.authorRef.fullName}}</a>
				<span class="data_comment text-grey px-75"><small>{{commentItem.date | formatPostDate}}</small></span>
			</li>
			<li>{{commentItem.text}}</li>
		</ul>
		<div class="icon_delete_comm"><icon name="times"></icon></div>
	</div>
</template>

<script>
export default {
	name: 'newsComment',
	data() {
		return {
			commentItem: {
				authorRef: {
					fullName: this.comment.authorRef.fullName,
					img: this.comment.authorRef.img
				},
				date: this.comment.date,
				text: this.comment.text,
			},
		}
	},
	props: ['comment'],
	methods: {
		
	},
	created: function(){
		console.log(this.comment);
	}
	
}
</script> 

<style>
	.comment{
		position: relative;
	}
	.icon_delete_comm{
		position: absolute;
		right: 0;
	}
</style>