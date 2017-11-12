/**
 * Created by Administrator on 2017/4/3.
 */
import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import router from './router/index';
import store from './vuex/store';

Vue.use(VueResource);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
