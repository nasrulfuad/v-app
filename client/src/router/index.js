import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: () => import('@/components/HelloWorld')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/components/Register')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/Login')
    },
    {
      path: '/surahs',
      name: 'surahs',
      component: () => import('@/components/Surahs')
    },
    {
      path: '/read/:idSurah',
      name: 'read',
      component: () => import('@/components/ReadSurah')
    },
    {
      path: '/show/:idSurah',
      name: 'show',
      component: () => import('@/components/Show')
    }
  ]
})
