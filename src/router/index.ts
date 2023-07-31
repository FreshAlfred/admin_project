import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'login', // 命名路由
    component: () => import('@/views/login/index.vue'),
  },
  // 登录成功以后展示数据的路由
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404/index.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
  },
]

let router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
