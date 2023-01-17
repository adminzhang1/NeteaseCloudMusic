import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/common.less'
import UserProifo from '@/components/UserProifo'
import ListenSong from '@/components/ListenSong'

Vue.config.productionTip = false
Vue.component('UserProifo',UserProifo)
Vue.component('ListenSong',ListenSong)
new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')
