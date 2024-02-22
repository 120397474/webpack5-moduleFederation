import axios from 'axios';

// axios 配置
axios.defaults.timeout = 1800000
axios.defaults.baseURL = ''

// http request 拦截器
axios.interceptors.request.use(
    config => {
        const USER_TOKEN = sessionStorage.getItem('token')

        if (USER_TOKEN) {
            config.headers.common['Authorization'] = `${USER_TOKEN}`
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

// http response 拦截器
axios.interceptors.response.use(
    response => {
        // response 里面可以判断code 如果401  就跳转登录
        return response
    },
    err => {
        return Promise.reject(err)
    }
)

export default axios