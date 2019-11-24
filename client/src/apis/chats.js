import request from './request'

function sendMessage (param) {
  return request.post('node/chats/sendMessage', param)
}

function messageList (param) {
  return request.get('node/chats/messageList', param)
}

function chatList (param) {
  return request.get('node/chats/chatList', param)
}

export default {
  sendMessage,
  messageList,
  chatList
}
