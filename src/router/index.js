import Vue from 'vue'
import VueRouter from 'vue-router'
import FormConfig from '../page/formConfig.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/formconfig',
      name: '表单配置',
      component: FormConfig,
      meta: {
        requireLogin: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireLogin) {
    next()
  } else {
    next()
  }
})

export default router
