import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/page/layout'
import Home from '@/page/home'
import Order from '@/page/order'
import Room from '@/page/room'
import Air from '@/page/air'
import Echart from '@/page/echart'
import Login from '@/page/login'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
        path: '/',
        redirect: '/login'
    }, {
        path: '/center',
        name: 'Layout',
        component: Layout,
        children: [{
            path: 'home',
            name: 'Home',
            component: Home
        }, {
            path: 'order',
            name: 'Order',
            component: Order
        }, {
            path: 'room',
            name: 'Room',
            component: Room
        }, {
            path: 'air',
            name: 'Air',
            component: Air
        }, {
            path: 'echart',
            name: 'Echart',
            component: Echart
        }, ]
    }, {
        path: '/login',
        name: 'Login',
        component: Login
    }]
})

//导航守卫
//使用router.beforeEach注册一个全局前置守卫，判断用户是否登录
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
    } else {
        let token = localStorage.getItem('Authorization');
        if (token === 'null' || token === '') {
            next('/login')
        } else {
            next();
        }
    }
});

export default router