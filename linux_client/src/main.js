import Vue from 'vue'
import Vuetify from 'vuetify'
//import App from './SimpleRoute.vue'
import App from './Baseline.vue'
import VueRouter from 'vue-router'

import ContainerMain from './ContainerMain.vue'
import ContainerSchedule from './ContainerSchedule.vue'
import ContainerShowRoom from './ContainerShowRoom.vue'

Vue.use(Vuetify)
Vue.use(VueRouter)


const router = new VueRouter({
  routes:[{
    path:'/',
    component: ContainerMain
  },{
    path:'/schedule',
    component: ContainerSchedule
  },{
    path:'/showroom',
    component: ContainerShowRoom
  }]
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
