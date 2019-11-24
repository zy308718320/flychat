import request from './request'

function friendList () {
  return request.get('node/friends/friendList')
}

export default {
  friendList
}
