<template>
	<div id="view" class="noSideBar">
		<div id="library" class="card p-75">
			<div class="d-flex mb-75">
				<input type="text" class="form_input" placeholder="Поиск по справочнику">
				<button class="btn btn-primary d-flex border-right-radius" id="spravichnik_button">Найти</button>
            </div>
			<ul id="libraryList">
				<li v-for="classItem in classList" class="libClass">
					<router-link :to="{ name: 'libraryClass', params: { classUrl: classItem.main_url }}">
						<img :src="'https://clinilink.org/img/lib_icons/'+ classItem.class_index +'.png'" />
						<ul>
							<li><strong>Класс {{classItem.class_index}}</strong></li>
							<li>{{classItem.class_name}}</li>
						</ul>
					</router-link>
					<router-view v-if="$route.params.classUrl == classItem.main_url"></router-view>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'library',
	data() {
		return {
			endpoint: 'https://api.clinilink.org/api/library/',
			classList: []
		}
	},
	methods: {
		getClassList: function(){
			this.$http.get(this.endpoint).then((response) => {
				console.log(response.data.libraryClassList);
				this.classList = response.data.libraryClassList;
			}, function(err){
				console.log(err); 
			})
		},
    },
    created: function(){
		this.getClassList();
	} 
}
</script>

<style>
#libraryList{
	margin: 0;
	padding: 0;
}
#libraryList .libClass{
	margin-bottom: 0.5rem;
}
#libraryList .libClass > a{
	display: flex;
	background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 5px;
	padding: 0.5rem;
    cursor: pointer;
}
#libraryList .libClass > a:hover,
#libraryList .libClass > a.router-link-active{
	background-color: #329d81;
    border-color: #329d81;
    color: #fff;
}
#libraryList .libClass > a > img{
	height: 48px;
    width: 48px;
	border: 1px solid transparent;
    border-radius: 10px;
	margin-right: 0.5rem;
}
#libraryList .libClass > a:hover > img,
#libraryList .libClass > a.router-link-active > img{
	background-color: #fff;
	border-color: #ddd;
}
#libraryList .libClass > a > ul{
	margin: 0;
	padding: 0;
	color: #333;
}
#libraryList .libClass > a:hover > ul,
#libraryList .libClass > a.router-link-active > ul{
	color: #fff;
}
#libraryList .libClass > .libraryCategorys{
	margin-left: 3rem;
}
#libraryList .libClass > .libraryCategorys > li{
	margin: 0.5rem 0;
	position: relative;
}
#libraryList .libClass > .libraryCategorys > li > a{
	display: block;
    position: relative;
	padding: 0.25rem 0.5rem;
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: #fff;
    cursor: pointer;
    color: #333;
}
#libraryList .libClass > .libraryCategorys > li > a:hover,
#libraryList .libClass > .libraryCategorys > li > a.router-link-active{
	border: 1px solid #329d81;
	background-color: #329d81;
	color: #fff;
}
#libraryList .libClass > .libraryCategorys > li:before{
	content: "";
    position: absolute;
    background: #329d81;
    width: 3px;
    top: 0;
    left: 0;
    bottom: 0;
    border: 1px solid transparent;
    border-bottom-left-radius: 5px;
    border-top-left-radius: 5px;
	z-index: 999;
}
#libraryList .libClass > .libraryCategorys > li > .libraryItems > li{
	position: relative;
	padding-left: 20px;
    margin: 0.5rem 0;
}
#libraryList .libClass > .libraryCategorys > li > .libraryItems > li:before{
	content: "";
    position: absolute;
    background: #329d81;
    width: 20px;
    height: 1px;
    top: 48%;
    left: 0px;
}
#libraryList .libClass > .libraryCategorys > li > .libraryItems > li > a{
	display: block;
	padding: 0.25rem 0.5rem;
	position: relative;
	border: 1px solid #ccc;
    font-size: 14px;
	color: #333;
}
#libraryList .libClass > .libraryCategorys > li > .libraryItems > li > a:hover{
	border: 1px solid #329d81;
	background-color: #329d81;
	color: #fff;
}
</style>