/**
 * Created by lihuiyin on 18/9/1.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import Seed from '../src/main';
import router from './router';
import axios from 'axios';
import _ from 'lodash';

Vue.prototype.$axios = axios;

// 开启debug模式
// Vue.config.debug = true;
Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(Seed);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
