import Vue from 'vue'
import Vuex from 'vuex'
import chats from '../apis/chats'

// import avatar from '../assets/default.png'
// import group from '../assets/default_group.png'
// import user from '../assets/user.jpeg'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    isShowExpression: false,
    isShowMembers: false,
    isShowMemberInfo: false,
    isShowMyInfo: false,
    isShowChatterInfo: false,
    isShowSearch: false,
    currentTabIndex: 0,
    currentRight: 0,
    currentLinkman: 0,
    myself: {
      // id: 'p0',
      // avatar: user,
      // nickname: '你自己',
      // gender: '',
      // alias: '',
      // region: ''
    },
    chats: [
      // {
      //   chatId: 0,
      //   isMute: false,
      //   isOnTop: false,
      //   avatar
      //   nickname: ''
      //   ctn: ''
      //   time: '2011-01-11 11:11:11'
      // }
    ],
    linkmans: [
      // {
      //   id: 'g1',
      //   type: 'group',
      //   members: ['p1', 'p2'],
      //   nickname: '这是群组',
      //   gender: '',
      //   alias: '',
      //   region: '这是地区',
      //   avatar: group
      // },
      // {
      //   id: 'p1',
      //   type: 'A',
      //   nickname: '用户一',
      //   gender: '',
      //   alias: '',
      //   region: '这是地区',
      //   avatar
      // },
      // {
      //   id: 'p2',
      //   type: 'B',
      //   nickname: '用户二',
      //   gender: '',
      //   alias: '这是备注',
      //   region: '这是地区',
      //   avatar
      // }
    ],
    messages: [
      // {
      //   type: 'chat',
      //   sender: item.uid,
      //   nickname: item.nickname,
      //   avatar: item.avatar,
      //   time: new item.create_at,
      //   ctn: item.content
      // }
    ],
    currentChatId: ''
  },
  getters: {
    chats: state => state.chats
  },
  mutations: {
    setExpression (state, isShowExpression) {
      if (isShowExpression) {
        state.isShowMembers = false
        state.isShowMemberInfo = false
        state.isShowMyInfo = false
        state.isShowChatterInfo = false
      }
      state.isShowExpression = isShowExpression
    },
    setMembers (state, isShowMembers) {
      if (isShowMembers) {
        state.isShowExpression = false
        state.isShowMyInfo = false
        state.isShowChatterInfo = false
      }
      state.isShowMembers = isShowMembers
    },
    setMemberInfo (state, isShowMemberInfo) {
      state.isShowMemberInfo = isShowMemberInfo
    },
    setChatterInfo (state, isShowChatterInfo) {
      if (isShowChatterInfo) {
        state.isShowMembers = false
        state.isShowMemberInfo = false
        state.isShowExpression = false
        state.isShowMyInfo = false
      }
      state.isShowChatterInfo = isShowChatterInfo
    },
    setMyInfo (state, isShowMyInfo) {
      if (isShowMyInfo) {
        state.isShowMembers = false
        state.isShowMemberInfo = false
        state.isShowExpression = false
        state.isShowChatterInfo = false
      }
      state.isShowMyInfo = isShowMyInfo
    },
    setCurrentTab (state, tabIndex) {
      state.currentTabIndex = tabIndex
    },
    setCurrentRight (state, rightIndex) {
      state.currentRight = rightIndex
    },
    setCurrentLinkman (state, index) {
      state.currentLinkman = index
    },
    hideAll (state) {
      state.isShowMembers = false
      state.isShowMemberInfo = false
      state.isShowExpression = false
      state.isShowChatterInfo = false
      state.isShowMyInfo = false
      state.isShowSearch = false
    },
    setChatId (state, id) {
      state.currentChatId = id
      state.currentRight = 0
    },
    setSearch (state, isShowSearch) {
      state.isShowSearch = isShowSearch
    },
    sendMessage (state, msg) {
      // todo 接收消息需要调整chats列表顺序
      if (state.myself.id === msg.sender) {
        // 自己发出去的
        state.messages.push(msg)
        this.commit('updateChat', msg)
      } else if (state.chats.find(item => item.chatId === msg.sender)) {
        // 对话列表存在的人发送过来的
        state.chats.forEach(item => {
          if (item.chatId === msg.sender) {
            item.time = msg.time || msg.create_at || 0
            item.ctn = msg.ctn || msg.content
          }
        })
      } else {
        // 对话列表不存在的人发送过来的
        state.chats = [{
          chatId: msg.sender,
          nickname: msg.nickname,
          avatar: msg.avatar,
          isMute: false,
          isOnTop: false,
          ctn: msg.ctn,
          time: msg.time
        }].concat(state.chats)
        state.currentChatId = msg.sender
      }
    },
    setMessageList (state, msgList) {
      state.messages = msgList
    },
    setMyself (state, obj) {
      state.myself = obj
    },
    setFriendList (state, obj) {
      state.linkmans = obj.concat(state.linkmans)
    },
    setChatList (state, obj) {
      state.chats = obj.concat(state.chats)
    },
    addChat (state, linkmanIndex) {
      const { id, nickname, avatar } = state.linkmans[linkmanIndex]
      state.currentTabIndex = 0
      state.currentRight = 0
      for (let i = 0; i < state.chats.length; i++) {
        let chat = state.chats[i]
        if (chat.chatId === id) {
          state.chats.splice(i, 1)
          state.chats = [chat].concat(state.chats)
          state.currentChatId = chat.chatId
          return
        }
      }
      state.chats = [{
        chatId: id,
        nickname,
        avatar,
        isMute: false,
        isOnTop: false
      }].concat(state.chats)
      state.currentChatId = id
    },
    async updateChat (state, obj) {
      state.chats = state.chats.map(item => {
        if (item.chatId === state.currentChatId) {
          item.time = obj.time || obj.create_at || 0
          item.ctn = obj.ctn || obj.content
        }
        return item
      })
      let chatList = state.chats
      chatList = chatList.map(item => {
        return {
          content: item.ctn,
          fid: item.chatId,
          nickname: item.nickname,
          portrait: item.avatar,
          time: item.time
        }
      })
      await chats.addChats({
        chatList
      })
    }
  }
})

export default store
