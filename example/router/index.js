import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/mul',
    name: 'mul',
    component: (resolve) => require(['./mul-chooser.vue'], resolve)
  },
  {
    path: '/map-modal',
    name: 'map-modal',
    component: (resolve) => require(['./map-modal.vue'], resolve)
  }]
})
