// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
// usando bootstrap-vue
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import BootstrapVue from 'bootstrap-vue';

import Vue from 'vue';

import vuetify from 'vuetify';
import App from './App';
import router from './router';
import VueSwal from 'vue-swal';
import { store } from './store/store'

Vue.config.productionTip = false;

// middleware
Vue.use(BootstrapVue);
Vue.use(vuetify);
Vue.use(VueSwal);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
