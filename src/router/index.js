import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 重写vue_router的push和replace，避免重复点击一个路由报错
const RouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return RouterPush.call(this, to).catch((err) => err);
};
const RouterReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(to) {
  return RouterReplace.call(this, to).catch((err) => err);
};

const routes = [
  {
    path: '/',
    redirect: '/found/discover',
  },
  {
    path: '/found',
    component: () => import("@/views/Found"),
    children: [
      {
        path: '',
        redirect: '/found/discover',
      },
      {
        path: 'discover',
        name: 'discover',
        component: () => import("@/views/Found/Disvocer"),
      },
      {
        path: 'toplist',
        name: 'toplist',
        component: () => import("@/views/Found/TopList"),
      },
      {
        path: 'playlist',
        name: 'playlist',
        component: () => import("@/views/Found/Playlist"),
      },
      {
        path: 'album',
        name: 'album',
        component: () => import("@/views/Found/Album"),
      },
    ],
  },
  {
    path: '/my',
    component: () => import("@/views/My"),
  },
  {
    path: '/friend',
    component: () => import("@/views/Friend"),
  },
  {
    path: '/download',
    component: () => import("@/views/Download"),
  },
  {
    path: '/playlist',
    component: () => import('@/views/Playlist'),
  },
  {
    path: '/notpage',
    component: () => import('@/views/Notpage'),
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to,from,next) => {
  let arr = ['/playlist']
  if(arr.some(item => to.path === item)){
    if(!to.query.id){
      next('/notpage')
    }else{
      next()
    }
  }
  next()
})
export default router
