import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)  

const router  = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'), 
    },
    {
      path: '/post/:id',
      name: 'Post',
      component: () => import(/* webpackChunkName: "Post" */ '../views/Post.vue')
    }
  ]
})
export default router;
