<template>
	<aside class="sideBar">
        <div id="Contact_filter">
			<router-link :to="{ name: 'contacts'}" class="list-item-filter p-50 active_filter">Мои контакты</router-link>
			<router-link :to="{ name: 'contacts', query: { type: 'in_requests' }}" class="list-item-filter p-50">Входящие заявки</router-link>
			<router-link :to="{ name: 'contacts', query: { type: 'out_requests' }}" class="list-item-filter p-50">Исходящие заявки</router-link>
			<router-link :to="{ name: 'contacts', query: { type: 'subsribers' }}" class="list-item-filter p-50">Подписки</router-link>
			<!--<router-link :to="{ name: 'contacts', query: { userId: 123313 }}" class="list-item-filter p-50">Пациенты</router-link>
			<router-link :to="{ name: 'contacts', query: { userId: 1213 }}" class="list-item-filter p-50">Специалисты</router-link>
			<router-link :to="{ name: 'contacts', query: { userId: 1253 }}" class="list-item-filter p-50">Врачи</router-link>-->
        </div>
	</aside>
</template>