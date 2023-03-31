import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

import store from './store' //导入store
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from 'echarts';

import JsonViewer from 'vue-json-viewer'
Vue.use(JsonViewer)

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts //需要挂载到Vue原型上

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
    } else {
        let token = window.localStorage.token;
        if (token === 'null' || token === '' || token === undefined) {
            next('/login')
        } else {
            next();
        }
    }
});

// 添加请求拦截器
axios.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    // 判断是否存在token,如果存在将每个页面header添加token
    config.headers = {
        'Content-Type': 'application/json' //配置请求头
    }
    if (localStorage.getItem("token")) {
        config.headers['token'] = localStorage.getItem("token");
    }
    // console.log(config)
    return config
}, function(error) {
    router.push('/login')
    return Promise.reject(error)
})

//添加响应拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    localStorage.removeItem('token');
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath //登录成功后跳入浏览的当前页
                        }
                    })
            }
        }
    }
)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})