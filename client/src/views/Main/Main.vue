<template>
  <div class="wrap" @click="handleHide">
    <div class="main">
      <div class="main-left">
        <left-header></left-header>
        <left-search></left-search>
        <left-chat-list></left-chat-list>
      </div>
      <div class="main-right">
        <keep-alive>
          <component :is="currentRight"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import LeftHeader from './Left/LeftHeader'
import LeftSearch from './Left/LeftSearch'
import LeftChatList from './Left/LeftChatList/LeftChatList'

import Chat from './Right/Chat/Chat'
import LinkmanInfo from './Right/LinkmanInfo/LinkmanInfo'
import frients from '../../apis/frients'
import users from '../../apis/users'
import chats from '../../apis/chats'

export default {
  name: 'Main',
  components: {
    LeftHeader,
    LeftSearch,
    LeftChatList,

    Chat,
    LinkmanInfo
  },
  data () {
    return {
      tabs: [Chat, LinkmanInfo]
    }
  },
  computed: {
    currentRight () {
      return this.tabs[this.$store.state.currentRight]
    }
  },
  sockets: {
    message: function (data) {
      this.$store.commit('sendMessage', {
        type: 'chat',
        time: data.create_at,
        sender: data.uid,
        nickname: data.nickname,
        avatar: data.avatar,
        ctn: data.content
      })
      this.$nextTick(() => {
        const content = document.querySelector('#content')
        content.scrollTop = content.scrollHeight
      })
    }
  },
  methods: {
    notify (title, opt) {
      const options = {
        dir: 'auto', // 文字方向
        body: opt.content, // 通知主体
        requireInteraction: true, // 不自动关闭通知
        icon: opt.icon
      }
      // 先检查浏览器是否支持
      if (!window.Notification) {
        console.log('浏览器不支持通知')
      } else {
        // 检查用户曾经是否同意接受通知
        if (Notification.permission === 'granted') {
          return new Notification(title, options) // 显示通知
        } else if (Notification.permission === 'default') {
          // 用户还未选择，可以询问用户是否同意发送通知
          Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
              console.log('用户同意授权')
              return new Notification(title, options) // 显示通知
            } else if (permission === 'default') {
              console.warn('用户关闭授权 未刷新页面之前 可以再次请求授权')
            } else {
              // denied
              console.log('用户拒绝授权 不能显示通知')
            }
          })
        } else {
          console.log('用户曾经拒绝显示通知')
        }
      }
    },
    handleHide () {
      this.$store.commit('hideAll')
    },
    async getUserInfo () {
      const rst = await users.getUserInfo()
      const data = rst.data
      if (data) {
        let myself = {
          id: data.uid,
          avatar: data.portrait,
          nickname: data.nickname,
          alias: data.explain
        }
        this.$store.commit('setMyself', myself)
      }
    },
    async online (clientId) {
      await users.online({ clientId })
    },
    async offline () {
      await users.offline()
    },
    async getFriendList () {
      const rst = await frients.friendList()
      const data = rst.data
      if (data) {
        let friendList = []
        data.forEach(item => {
          const { uid, nickname, explain, portrait, gender } = item
          friendList.push({ id: uid, type: 'A', region: '', nickname, alias: explain, avatar: portrait, gender })
        })
        this.$store.commit('setFriendList', friendList)
      }
    },
    async getChatList () {
      const res = await chats.chatList()
      const data = res.data
      if (data) {
        let chatList = []
        data.chatList.forEach(item => {
          const { content, fid, nickname, portrait, time } = item
          chatList.push({
            chatId: fid,
            isMute: false,
            isOnTop: false,
            nickname,
            ctn: content,
            avatar: portrait,
            time
          })
        })
        this.$store.commit('setChatList', chatList)
      }
    }
  },
  created () {
    this.getUserInfo()
    this.getFriendList()
    this.getChatList()
    this.$eventBus.$on('setClientId', (clientId) => {
      this.online(clientId)
    })
  }
}
</script>

<style scoped>
  .wrap {
    height: 100vh;
    overflow: hidden;
  }

  .main {
    max-width: 1000px;
    min-width: 800px;
    height: 100%;
    border-radius: 3px;
    margin: 0 auto;
    display: flex;
  }

  .main-left {
    width: 280px;
    height: 100%;
    background-color: #2e3238;
  }

  .main-right {
    background-color: #eee;
    flex-grow: 1;
  }

</style>
