import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/page/layout'
import Home from '@/page/home'
import Order from '@/page/order'
import Room from '@/page/room'
import Login from '@/page/login'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [{
        path: '/',
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
        }, ]
    }, {
        path: '/login',
        name: 'Login',
        component: Login
    }]
})

export default router