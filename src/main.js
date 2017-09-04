import Vue from 'vue';
import router from './router/index.js';

import Axios from 'axios';
Vue.prototype.$http = Axios;

import Auth from './auth/index.js';
Vue.use(Auth, Axios, router);

import Icon from 'vue-awesome';
Vue.component('icon', Icon);

import VueCharts from 'vue-charts';
Vue.use(VueCharts);

import moment from 'moment';
moment.locale('ru');


Vue.filter('formatPostDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD MMMM в HH:mm');
  }
});

Vue.filter('formatDialogTime', function(value) {
  if (value) {
    return moment(String(value)).format('DD MMMM в HH:mm');
  }
});

Vue.filter('formatBirthday', function(value) {
  if (value) {
    return moment(String(value)).toNow(true);
  }
});

Vue.filter('formatMedicalRecord', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY');
  }
});

Vue.filter('formatMeasurement', function(value) {
  if (value) {
    return moment(String(value)).format('DD MMMM YYYY в HH:mm');
  }
});

import App from './App.vue';

const root = new Vue({
  router,
  render: h => h(App),
})

document.addEventListener('DOMContentLoaded', () => {
  root.$mount('#mainView');
})