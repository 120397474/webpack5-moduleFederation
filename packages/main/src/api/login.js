import request from '../utils/request'
const baseUrl = `http://test.yunjian613.com`

// 登录
export function login(data) {
    debugger
    return request({
        url: baseUrl + '/java-auth/oauth/token' + data.url,
        method: 'post',
        data,
    })
}