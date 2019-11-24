<template>
  <div class="wrap">
    <div class="login-box">
      <div class="login-title-wrap">
        <div class="login-title" :class="{ 'login-title-selected': isLogin }" @click="isLogin=true">登录</div>
        <div class="login-title" :class="{ 'login-title-selected': !isLogin }" @click="isLogin=false">注册</div>
      </div>
      <form class="login-main-wrap" v-if="isLogin" @keyup.enter="handleLogin">
        <div class="login-main-title">欢迎登录</div>
        <div class="login-main-input">
          <input class="login-input" type="text" v-model="login.username" placeholder="用户名" />
          <input class="login-input" type="password" v-model="login.password" placeholder="密码" />
          <button class="login-btn login-btn-login" @click="handleLogin">登 录</button>
        </div>
      </form>
      <form class="login-main-wrap" v-else>
        <div class="login-main-title">欢迎注册</div>
        <div class="login-main-input">
          <input class="login-input" type="text" placeholder="用户名" />
          <input class="login-input" type="password" placeholder="密码" />
          <input class="login-input" type="password" placeholder="确认密码" />
          <button class="login-btn login-btn-register">注 册</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '../../apis/users'

export default {
  name: 'Login',
  data () {
    return {
      login: {
        username: '',
        password: ''
      },
      isLogin: true
    }
  },
  methods: {
    async handleLogin () {
      let username = this.login.username
      let password = this.login.password
      if (username && password) {
        let rst = await api.login({
          username,
          password
        })
        const accessToken = rst.data && rst.data['access_token']
        if (accessToken) {
          localStorage.setItem('access_token', accessToken)
          this.$router.push('/')
        } else {
          this.login.username = ''
          this.login.password = ''
          alert('账号或密码错误')
        }
      }
    }
  }
}
</script>

<style scoped>
  .wrap {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-box {
    min-width: 500px;
    width: 500px;
    min-height: 500px;
    height: 500px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    box-shadow: 0 2px 10px #999;
  }

  .login-title-wrap {
    width: 100%;
    height: 100px;
    display: flex;
  }

  .login-title {
    font-size: 32px;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #28af62;
    color: #fff;
    cursor: pointer;
  }

  .login-title-selected {
    background-color: #2dcc70;
  }

  .login-main-wrap {
    flex-grow: 1;
  }

  .login-main-title {
    text-align: center;
    line-height: 80px;
    font-size: 24px;
  }

  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #d4d4d4;
  }

  .login-main-input {
    display: flex;
    flex-direction: column;
    padding: 0 20px 10px;
    color: #d4d4d4;
  }

  .login-input {
    margin-top: 10px;
    padding: 18px 10px;
    line-height: 24px;
    height: 24px;
    border: 1px solid #efefef;
    font-size: 18px;
    outline: none;
    transition: 0.4s;
  }

  .login-input:focus {
    border-color: #2dcc70;
    transition: 0.4s;
  }

  .login-btn {
    border: none;
    outline: none;
    background-color: #2dcc70;
    color: #fff;
    font-size: 28px;
    line-height: 56px;
    height: 56px;
    cursor: pointer;
  }

  .login-btn-login {
    margin-top: 92px;
  }

  .login-btn-register {
    margin-top: 20px;
  }

  .login-btn:active {
    background-color: #28af62;
  }

</style>
