import Vue from 'vue'
import VueRouter from 'vue-router'
import { routerBeforeEachFunc } from './interceptor/index'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'root',
        redirect: '/app',
    },
    {
        path: '/app',
        name: 'App',
        component: () => import('../views/home/Index.vue'),
        meta: {
            title: '首页',
        },
        redirect: '/app/about',
        children: [
            {
                path: '/app/home',
                name: 'Home',
                component: () => import('../components/layout/PageRootIndex.vue'),
                redirect: '/app/home/index',
                meta: {
                    title: '首页',
                },

                children: [
                    {
                        path: '/app/home/index',
                        name: 'HomeIndex',
                        component: () => import('../views/home/Home.vue'),
                        meta: {
                            isTabbar: true,
                            title: '首页',
                        },
                    },
                    {
                        path: '/app/home/signature',
                        name: 'Signature',
                        component: () => import('../components/Home/Signature.vue'),
                        meta: {
                            title: '签名',
                        },
                    },
                    {
                        path: '/app/home/pageQrcode',
                        name: 'PageQrcode',
                        component: () => import('../components/Home/PageQrcode.vue'),
                        meta: {
                            title: '二维码',
                        },
                    },
                    {
                        path: '/app/home/screenLongShotShare',
                        name: 'ScreenLongShotShare',
                        component: () => import('../components/Home/ScreenLongShotShare.vue'),
                        meta: {
                            title: '屏幕长截图分享',
                        },
                    },
                ],
            },
            {
                path: '/app/about',
                name: 'About',
                component: () => import(/* webpackChunkName: "about" */ '../views/home/About.vue'),
                meta: {
                    isTabbar: true,
                    title: 'about',
                },
            },
            {
                path: '/app/test',
                name: 'Test',
                component: () => import(/* webpackChunkName: "about" */ '../views/home/Test.vue'),
                meta: {
                    isTabbar: true,
                    title: 'test',
                },
            },
        ],
    },

    {
        path: '*',
        name: '404',
        component: () => import('../views/NotFound.vue'),
        meta: {
            title: 'NotFound',
        },
    },
]

const router = new VueRouter({
    routes,
})
//
router.beforeEach(routerBeforeEachFunc)

export default router
