import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import HomeView from '@/views/Home/Index'
import QuestionView from '@/views/Question/Index'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
    meta: { isProtectedRoute: false }
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage,
    meta: { isProtectedRoute: false }
  },
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { isProtectedRoute: true }
  },
  {
    path: '/question/:id',
    name: 'question',
    component: QuestionView,
    meta: { isProtectedRoute: true }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const protectedRoutes = to.matched.some(item => item.meta.isProtectedRoute)

  if (protectedRoutes && store.state.authStore.token === null) next({name: 'login'})

  next()
})

export default router
