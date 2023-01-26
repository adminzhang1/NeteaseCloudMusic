import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import user from './modules/user'
import login from './modules/login'
import toplist from './modules/toplist'
import music from './modules/music'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    login,
    toplist,
    music,
  },
  plugins: [
    createPersistedState({
      key: 'netease_cloud_musi',
      paths: ['user','music']
    })
  ]
})
