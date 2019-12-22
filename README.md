# flychat

### client 

基于fork的一个vue版本改的，毕竟前端部分不是主要要示范的部分

https://github.com/aiialzy/vue-wechat-web

启动方式在client文件夹中的README中有写

### server

基于nest框架，通过模块化的方式，简单开发了认证、用户、好友、聊天等几个模块，实现了一个聊天室的基本功能，主要示例一下nest框架的代码组织方式和特性

数据库： mongodb

```
├── dist                   编译产物
├── node_modules           
├── src                    代码编写的目录
|   ├── auth               认证模块
|   ├── chats              聊天模块
|   ├── config             配置模块
|   ├── database           数据库模块
|   ├── events             webSocket模块
|   ├── friends            好友模块
|   ├── users              用户模块
|   ├── main.ts            程序主入口   
|   ├── app.module.ts      应用根模块  
|   └── terminus-options.service   健康度检查
└── package.json           package 配置
```

启动方式在server文件夹中的README中有写
