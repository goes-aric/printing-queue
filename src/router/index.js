import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

import Login from '../components/features/pages/Login.vue'
import Queue from '../components/features/pages/Queue.vue'

let routes = [
  {
    path: '/auth/login',
    name: 'login',
    component: Login,
    meta: {
      title: 'Login',
      guest: true
    }    
  },
  {
    path: '/queue',
    name: 'queue',
    component: Queue,
    meta: {
      title: 'Antrian',
      requiresAuth: true
    }    
  },
  {
    path: "/:catchAll(.*)",
    redirect: { name: 'queue' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

const DEFAULT_TITLE = 'Queue'
const COMPANY_TTITLE = import.meta.env.VITE_APP_TITLE

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}` + ' - ' + COMPANY_TTITLE || DEFAULT_TITLE + ' - ' + COMPANY_TTITLE

  if (to.matched.some(record => record.meta.requiresAuth)) {
    /* THIS ROUTE REQUIRES AUTH, CHECK IF LOGGED IN */
    /* IF NOT, REDIRECT TO LOGIN PAGE */
    if (store.getters.isUserLoggedIn === false) {
      next({ name: 'login', query: { redirect: to.fullPath } })
    } else {
      next() /* GO TO  WHATEVER I'M GOING */
    }
  } else {
    next() /* DOES NOT REQUIRE AUTH, MAKE SURE  TO ALYWAYS CALL NEXT() */
  }
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}` + ' - ' + COMPANY_TTITLE || DEFAULT_TITLE + ' - ' + COMPANY_TTITLE

  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isUserLoggedIn) {
      next({ name: 'queue' }) /* IF USER LOGGED IN, REDIRECT TO DASHBOARD WHEN ACCESS LOGIN PAGE */
      return
    }
    next() /* GO TO  WHATEVER I'M GOING */
  } else {
    next() /* DOES NOT REQUIRE AUTH, MAKE SURE  TO ALYWAYS CALL NEXT() */
  }
})

export default router
