import Vue from 'vue'
import Vuex from 'vuex'

// import avatar from '../assets/default.png'
// import group from '../assets/default_group.png'
import user from '../assets/user.jpeg'

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
      id: 'p0',
      avatar: user,
      nickname: '你自己',
      gender: '',
      alias: '',
      region: ''
    },
    chats: [
      // {
      //   chatId: 0,
      //   linkmanIndex: 1,
      //   isMute: false,
      //   isOnTop: false,
      //   messages: [
      //     {
      //       avatar,
      //       ctn: '你好',
      //       nickname: '用户一',
      //       sender: 'p1',
      //       time: new Date('2011-01-11 11:11:11'),
      //       type: 'chat'
      //     }
      //   ]
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
    currentChatId: ''
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
      for (let chat of state.chats) {
        if (chat.chatId === state.currentChatId) {
          chat.messages.push(msg)
          break
        }
      }
    },
    sendMessageList (state, msgList) {
      for (let chat of state.chats) {
        if (chat.chatId === state.currentChatId) {
          chat.messages = msgList
          break
        }
      }
    },
    setMyself (state, obj) {
      state.myself = Object.assign(state.myself, obj)
    },
    setFriendList (state, obj) {
      state.linkmans = Object.assign(state.linkmans, obj)
    },
    setChatList (state, obj) {
      state.chats = Object.assign(state.chats, obj)
    },
    addChat (state, linkmanIndex) {
      state.currentTabIndex = 0
      state.currentRight = 0
      for (let i = 0; i < state.chats.length; i++) {
        let chat = state.chats[i]
        if (chat.linkmanIndex === linkmanIndex) {
          state.chats.splice(i, 1)
          state.chats = [chat].concat(state.chats)
          state.currentChatId = chat.chatId
          return
        }
      }
      const chatId = state.linkmans[linkmanIndex].id
      state.chats = [{
        linkmanIndex,
        chatId,
        isMute: false,
        isOnTop: false,
        messages: []
      }].concat(state.chats)
      state.currentChatId = chatId
    }
  },
})

export default store
