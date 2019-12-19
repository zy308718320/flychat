<template>
  <div class="left-chat-list-tab-wrap">
    <div v-for="(chat, index) in chatList"
         :key="index" class="chat-wrap"
         :class="{ 'chat-wrap-top': chat.isOnTop, 'chat-wrap-selected': currentChatIndex === index }"
         @click="handleChangeChat(index)">
      <div class="chat-avatar">
        <img style="width: 40px; height: 40px; border-radius: 2px;" :src="chat.avatar" />
      </div>
      <div class="chat-msg">
        <div class="chat-msg-nickname">{{ chat.nickname }}</div>
        <pre class="chat-msg-message" v-html="chat.ctn" />
      </div>
      <div class="chat-info">
        <span class="chat-info-time" :style="{ color: currentChatIndex === index ? '#fff' : ''}">{{ getTime(chat.time) }}</span>
        <div class="chat-info-icon-wrap" v-if="chat.isMute">
          <i :class="`icon ${currentChatIndex === index ? 'icon-mute-light' : 'icon-mute-dark' }`" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import chats from '../../../../../apis/chats'

export default {
  name: 'TabChat',
  data () {
    return {
      chatList: []
    }
  },
  computed: {
    ...mapGetters(['chats']),
    currentChatIndex () {
      let index = -1
      for (let i = 0; i < this.chats.length; i++) {
        if (this.chats[i].chatId === this.$store.state.currentChatId) {
          index = i
        }
      }
      return index
    }
  },
  watch: {
    chats (val) {
      this.chatList = val.slice().sort((a) => {
        return a.isOnTop ? -1 : 0
      })
    }
  },
  methods: {
    handleChangeChat: async function (index) {
      this.$store.commit('setChatId', this.chats[index].chatId)
      const ret = await chats.messageList({
        fid: this.$store.state.currentChatId
      })
      let messageList = ret.data
      const lastMessage = messageList[messageList.length - 1]
      if (lastMessage) {
        this.$store.commit('updateChat', lastMessage)
        messageList = messageList.map(item => {
          return {
            type: 'chat',
            sender: item.uid,
            nickname: item.nickname,
            avatar: item.avatar,
            time: item.create_at,
            ctn: item.content
          }
        })
        this.$store.commit('setMessageList', messageList)
        this.$nextTick(() => {
          const content = document.querySelector('#content')
          content.scrollTop = content.scrollHeight
        })
      }
    },
    getTime (time) {
      const d = time ? new Date(time) : new Date()
      const h = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
      const m = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
      return `${h}:${m}`
    }
  },
  created () {
    this.$eventBus.$on('changeChat', this.handleChangeChat)
  }
}
</script>

<style scoped>
  .list-title {
    color: #787b87;
    padding: 2px 18px;
    font-size: 14px;
    height: 24px;
  }

  .chat-wrap {
    height: 40px;
    padding: 12px 18px 11px;
    border-bottom: 1px solid rgb(41, 44, 51);
    display: flex;
    font-size: 13px;
    cursor: pointer;
    border-bottom: 1px solid rgb(41, 44, 51);
    color: #989898;
    user-select: none;
  }

  .chat-wrap-top {
    background-color: #2e3641;
  }

  .chat-wrap-selected {
    background-color: #3a3f45;
    color: #fff;
  }

  .chat-avatar {
    margin-right: 10px;
  }

  .chat-msg {
    flex-grow: 1;
  }

  .chat-msg-nickname {
    color: #fff;
    height: 20px;
  }

  .chat-msg-message {
    user-select: none;
    overflow-wrap: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 161px;
    height: 20px;
    margin: 0;
  }

  .chat-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .chat-info-time {
    color: #6b6f7c;
    user-select: none;
  }

  .chat-info-icon-wrap {
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }

  .icon {
    width: 20px;
    height: 20px;
    background: url(../../../../../assets/opt-but.png) no-repeat;
    background-size: 487px 462px;
  }

  .icon-mute-light {
    background-position: -311px -432px;
  }

  .icon-mute-dark {
    background-position: -401px -357px;
  }

</style>
