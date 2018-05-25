import Vue from 'vue'
import Vuetify from 'vuetify'
//import App from './SimpleRoute.vue'
import App from './Baseline.vue'
import VueRouter from 'vue-router'

import ContainerMain from './ContainerMain.vue'
import ContainerAPList from './ContainerAPList.vue'
import ContainerDeviceList from './ContainerDeviceList.vue'
import ContainerDeviceMovement from './ContainerDeviceMovement.vue'
import ContainerNetworkOverview from './ContainerNetworkOverview.vue'

Vue.use(Vuetify)
Vue.use(VueRouter)


const router = new VueRouter({
  routes:[{
    path:'/',
    component: ContainerMain
  },{
    path:'/AP_list',
    component: ContainerAPList
  },{
    path:'/device_list',
    component: ContainerDeviceList
  },{
    path:'/device_movement',
    component: ContainerDeviceMovement
  },{
    path:'/network_overview',
    component: ContainerNetworkOverview
  }]
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
