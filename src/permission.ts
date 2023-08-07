// 做路由鉴权
import useUserStore from '@/store/modules/user'

import router from '@/router'
import NProgress from 'nprogress'
import pinia from '@/store'
import setting from '@/setting'
NProgress.configure({ showSpinner: false });
let userStore = useUserStore(pinia)
router.beforeEach(async (to, from, next) => {

    let token = userStore.token
    let username = userStore.username
    if (token) {
        if (to.path === '/login') {
            next('/')
        } else {
            if (username) {
                next();
            } else {
                try {
                    await userStore.userInfo();
                    next();
                } catch (error) {
                    await userStore.userLogout()
                    next('/login');
                }
            }
        }
    } else {
        if (to.path === '/login') {
            next();
        } else {
            next({
                path: '/login',
                query: { redirect: to.path }
            })
        }
    }
    NProgress.start();
})


router.afterEach((to) => {
    document.title = setting.title + ' ' + to.meta.title
    NProgress.done();
})