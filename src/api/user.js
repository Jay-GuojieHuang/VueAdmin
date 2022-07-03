// 引入axios 并进行二次封装
import request from '@/utils/request'
// 对外暴露登陆接口函数
export function login(data) {
  return request({
    // url: '/vue-admin-template/user/login',
    url: '/admin/acl/index/login',
    method: 'post',
    data
  })
}
// 对外暴露获取用户信息的函数
export function getInfo(token) {
  return request({
    // url: '/vue-admin-template/user/info',
    url: '/admin/acl/index/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    // url: '/vue-admin-template/user/logout',
    url: '/admin/acl/index/logout',
    method: 'post'
  })
}
