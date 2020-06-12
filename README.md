# mini-program_Music-Player
微信小程序-音乐播放器

## 小程序简介
这是一个 `微信小程序` 开发的一个音乐播放器小程序，通过微信小程序官方提供的组件、API完成音乐播放器的音乐播放、切换、调整进度等功能以及音乐小程序的页面展示。

## 项目目录说明
```
  "pages": [
    "pages/index/index",        // 音乐小程序的主要页面及逻辑代码
    "pages/hotMusic/hotMusic"   // 音乐小程序首页的新歌热榜页面（主要是训练小程序页面样式的编写）
  ]
```  

- pages/index  
    - /index.wxml  小程序的头部tab栏和底部播放器，中间是一个根据顶部tab栏滑动或点击切换的swiper组件
    - /info.wxml  小程序的第一个页面，主要是页面展示
    - /play.wxml  小程序的音乐播放器页面，展示当前播放歌曲详细信息及进度条
    - /playList.wxml  小程序的音乐播放列表页面，展示所有音乐及正在播放的曲目  


##  项目展示
1. 音乐推荐  
    [![info.png](https://z4a.net/images/2020/06/12/info.png)](https://z4a.net/image/TwXlb6)  
        
2. 播放器  
    [![play.png](https://z4a.net/images/2020/06/12/play.png)](https://z4a.net/image/TwXRAv)  

3. 播放列表  
    [![playList.png](https://z4a.net/images/2020/06/12/playList.png)](https://z4a.net/image/TwXb1n)  

4. 新歌热榜  
    [![hotMusic.png](https://z4a.net/images/2020/06/12/hotMusic.png)](https://z4a.net/image/TwXzHC)

## 开发注意 

- 导入项目填写**测试号**即可

- 将 `pages/index/index.js` 中 `data( { playlist.src } )` 音乐链接换成自己的链接，建议搭建一个本地服务器


## 参考文档  

- [微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)  
