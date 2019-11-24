import axios from 'axios'
import config from '../config'

axios.interceptors.request.use(
  config => {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  }, error => {
    return Promise.reject(error)
  })

axios.interceptors.response.use(
  response => {
    return response
  }, error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.setItem('access_token', '')
          if (!window.location.href.includes('login')) {
            window.location.href = '/#/login'
          }
          break
        default:
          console.error('请求异常！')
          break
      }
    }
    return Promise.resolve(error.response)
  }
)

async function get (url, param) {
  let rst = {}
  try {
    rst = await axios.get(config.baseUrl + url, { params: param })
  } catch (e) {
    rst = e
  }
  return rst
}

async function post (url, param) {
  let rst = {}
  try {
    rst = await axios.post(config.baseUrl + url, param)
  } catch (e) {
    rst = e
  }
  return rst
}

async function put (url, param) {
  let rst = {}
  try {
    rst = await axios.put(config.baseUrl + url, param)
  } catch (e) {
    rst = e
  }
  return rst
}

async function del (url, param) {
  let rst = {}
  try {
    rst = await axios.delete(config.baseUrl + url, param)
  } catch (e) {
    rst = e
  }
  return rst
}

export default {
  get,
  post,
  put,
  del
}
