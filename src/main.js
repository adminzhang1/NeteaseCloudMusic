import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/common.less'
import {mixin} from './mixin'
import UserProifo from '@/components/UserProifo'
import ListenSong from '@/components/ListenSong'
// 加载中
import Loading from '@/components/Loading'
// 歌单、单曲头部信息
import PlaylistInfo from '@/components/Info/PlaylistInfo.vue'
import SongInfo from '@/components/Info/SongInfo'
// 歌单操作按钮
import Disable from '@/components/PlayBtns/Disable.vue'
import CountBtns from '@/components/PlayBtns/CountBtns.vue'
import SongBtns from '@/components/PlayBtns/SongBtns.vue'
// 歌曲列表没有歌曲
import NotMusic from '@/components/NotMusic'
// 歌曲操作按钮
import Opt from '@/components/Opt'
// import FiveOpt from '@/components/Opt/FiveOpt.vue'
// import FourOpt from '@/components/Opt/FourOpt.vue'
// 歌曲列表表格
import Table1 from '@/components/PlaylistTable/table1.vue'
// 下载查看更多
import DowClient from '@/components/Downloadclient'
import Multi from '@/components/Multi'
import Wiki from '@/components/Wiki'

Vue.config.productionTip = false
Vue.component('UserProifo',UserProifo)
Vue.component('ListenSong',ListenSong)
Vue.component('Loading',Loading)

Vue.component('PlaylistInfo',PlaylistInfo)
Vue.component('SongInfo',SongInfo)

Vue.component('Disable',Disable)
Vue.component('CountBtns',CountBtns)
Vue.component('SongBtns',SongBtns)

Vue.component('NotMusic',NotMusic)

Vue.component('Opt',Opt)
// Vue.component('FiveOpt',FiveOpt)
// Vue.component('FourOpt',FourOpt)

Vue.component('Table1',Table1)

Vue.component('DowClient',DowClient)
Vue.component('Multi',Multi)
Vue.component('Wiki',Wiki)
// 混入
Vue.mixin(mixin)
new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')
