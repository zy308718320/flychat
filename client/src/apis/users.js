import request from './request'

function register (param) {
  return request.post('node/users/register', param)
}

function login (param) {
  return request.post('node/users/login', param)
}

function getUserInfo () {
  return request.get('node/users/userInfo')
}

function online (param) {
  return request.post('node/users/online', param)
}

function offline () {
  return request.post('node/users/offline')
}

export default {
  register,
  login,
  getUserInfo,
  online,
  offline
}
