import axios from '../assets/js/axios'

// 登录
export const login = (params) => {
  return axios.post('/admin/login', params, { headers: { 'Content-Type': 'application/json' } }).then(res => {
    return res.data
  })
}
// 退出登录
export const loginOut = (params) => {
  return axios.post('/admin/loginOut', params, { headers: { 'Content-Type': 'application/json' } }).then(res => {
    return res.data
  })
}
// 发布文章
export const publishArticle = (params) => {
  return axios.post('/admin/publish', params, {headers: { 'Content-Type': 'application/json' }}).then(res => {
    return res.data
  })
}
// 发布的文章列表
export const getArticles = (params) => {
  return axios.get('/admin/articlesList', {params: params}, {headers: { 'Content-Type': 'application/json' }}).then(res => {
    return res.data
  })
}
// 删除文章
export const deleteArticle = (params) => {
  return axios.post('/admin/deleteArticle', params, {headers: { 'Content-Type': 'application/json' }}).then(res => {
    return res.data
  })
}
// 编辑文章
export const editArticle = (params) => {
  return axios.post('/admin/editArticle', params, {headers: { 'Content-Type': 'application/json' }}).then(res => {
    return res.data
  })
}
// 获取用户列表
export const userList = (params) => {
  return axios.get('/admin/userList', {params: params}, {headers: { 'Content-Type': 'application/json' }}).then(res => {
    return res.data
  })
}
// 删除用户
export const deleteUser = (params) => {
  return axios.post('/admin/deleteUser', params, {headers: { 'Content-Type': 'application/json' }}).then(res => {
    return res.data
  })
}
// 获取音频视频列表
export const mediaList = (params) => {
  return axios.get('/admin/mediaList', {params: params}, {headers: { 'Content-Type': 'application/json' }}).then(res => {
    return res.data
  })
}
// 删除某一条音视频
export const deleteMedia = (params) => {
  return axios.post('/admin/deleteMedia', params, {headers: { 'Content-Type': 'application/json' }}).then(res => {
    return res.data
  })
}
