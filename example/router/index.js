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
  },
  {
    path: '/filter-city',
    name: 'filter-city',
    component: (resolve) => require(['./filter-city.vue'], resolve)
  },
  {
    path: '/table-plus',
    name: 'table-plus',
    component: (resolve) => require(['./table-plus.vue'], resolve)
  },
  {
    path: '/select-group',
    name: 'select-group',
    component: (resolve) => require(['./select-group.vue'], resolve)
  }]
})
