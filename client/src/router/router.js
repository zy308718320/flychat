import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login/Login'
import Main from '@/views/Main/Main'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Main',
      component: Main
    }
  ]
})

router.beforeEach(({ name }, from, next) => {
  if (localStorage.getItem('access_token')) {
    // 如果用户在login页面
    if (name === 'Login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (name === 'Login') {
      next()
    } else {
      next({
        name: 'Login',
        query: { redirect: router.currentRoute.fullPath }
      })
    }
  }
})

export default router
