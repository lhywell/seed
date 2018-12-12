/**
 * Created by lihuiyin on 18/9/1.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import router from './router';
import axios from 'axios';
//开发模式
import tdseed from '../src/index';

// import tdseed from '../dist/tdseed.min.js';

Vue.prototype.$axios = axios;

// 开启debug模式
// Vue.config.debug = true;
Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(tdseed);

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
