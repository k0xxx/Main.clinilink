<template>
	<div id="view" class="withSideBar">
		<div>
			<form action="">
				<input type="text" name="search" placeholder="Поиск..." v-model="contactsSearch">
				
				<label for="">Тип контакта</label>
				<select class="">
					<option value="">Все</option>
					<option value="">Пациенты</option>
					<option value="">Специалисты</option>
					<option value="">Врачи</option>
				</select>
			</form>
		</div>
		<div id="contacts">
			<contactItem v-for="contact in contactsList" v-bind:key="contact._id" :contact="contact.contactRef" :contactStatus="contact.type" :isSubscribe="contact.subsriber" ></contactItem>
			<infinite-loading :on-infinite="onInfinite" ref="infiniteLoading">
				<span slot="no-more">Всё загружено!</span>
				<span slot="no-results">Вы не добавили еще ни одного друга!</span>
			</infinite-loading>
		</div>
	</div>
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
			contactsList: [],
			contactsType: '',
			contactsSearch: ''
		}
	},
	methods: {
		onInfinite() {
			var options = {
				params: {page: this.page, contactsType: this.contactsType, contactsSearch: this.contactsSearch}
			}
			this.$http.get(this.endpoint, options).then((response) => {
				console.log(response);
				if (response.data.contactsList.length) {
					this.contactsList = this.contactsList.concat(response.data.contactsList);
					this.page++;
					this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
				} else {
					this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
				}
		  });
		},
		getQuery(){
			this.contactsType = this.$route.query.type;
			this.contactsList = [];
			this.page = 1;
      		this.$nextTick(() => {
        		this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
      		});
		}
	},
	watch: {
    	'$route': 'getQuery'
  	},
}      
</script>  