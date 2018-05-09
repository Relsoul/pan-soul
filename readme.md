# 说明
一个低侵入式,原生UI,代码完全开源,无任何安全问题的百度外链直提器

![](http://cdn.emufan.com/img/pan-soul/multi.gif)
![](http://cdn.emufan.com/img/pan-soul/single.gif)

# 安装
```angular2html
npm install
npm run start
```

# 原理
采用electron+anyproxy 制作为GUI化的跨平台客户端, 拦截某些请求返回错误信息以获取正确地址

# 功能

- [x] 支持单个文件选择下载获取直连地址
- [x] 支持多个文件选择点击下载按钮获取直连地址

# todo
- [ ] 选择文件夹获取内部所有的下载地址 并且以文件夹的形式展示

# 问题
目前anyproxy@4抓取百度的https返回的是非加密的数据,所以只能用request重新发起了一次请求来获取正确的地址,@3未测试
