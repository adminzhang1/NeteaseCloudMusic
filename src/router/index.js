import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/found/discover',
  },
  {
    path: '/found',
    name: 'found',
    component: () => import("@/views/Found"),
    children: [
      // {
      //   path: '',
      //   redirect: '/found/discover',
      // },
      {
        path: 'discover',
        name: 'discover',
        component: () => import("@/views/Found/Disvocer"),
      },
      {
        path: 'a',
        name: 'a',
        component: () => import("@/views/Found/A"),
      },
    ],
  },
]

const router = new VueRouter({
  routes
})

export default router
