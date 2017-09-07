<template>
	<aside class="sideBar">
		<ul class="filter_links">
			<li><router-link :to="{ name: 'contacts'}">Мои контакты</router-link></li>
			<li><router-link :to="{ name: 'contacts', query: { type: 'in_requests' }}">Входящие заявки</router-link></li>
			<li><router-link :to="{ name: 'contacts', query: { type: 'out_requests' }}">Исходящие заявки</router-link></li>
			<li><router-link :to="{ name: 'contacts', query: { type: 'subsribers' }}">Подписки</router-link></li>
		</ul>
	</aside>
</template>