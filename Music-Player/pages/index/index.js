//index.js

Page({
  data: {
    item: 0,
    tab: 0,
    // 播放列表数据
    playlist: [{
      id: 1,
      title: 'Empty Cups',
      singer: 'Charlie Puth',
      src: 'http://192.168.2.101:8000/Charlie%20Puth%20-%20Empty%20Cups.mp3',
      coverImgUrl: '/image/CP1.png'
    }, {
      id: 2,
      title: 'Attention',
      singer: 'Charlie Puth',
      src: 'http://192.168.2.101:8000/Charlie%20Puth%20-%20Attention.mp3',
      coverImgUrl: '/image/CP2.png'
    }, {
      id: 3,
      title: 'How Long',
      singer: 'Charlie Puth',
      src: 'http://192.168.2.101:8000/Charlie%20Puth%20-%20How%20Long.mp3',
      coverImgUrl: '/image/CP3.png'
    }, {
      id: 4,
      title: 'LA Girls',
      singer: 'Charlie Puth',
      src: 'http://192.168.2.101:8000/Charlie%20Puth%20-%20LA%20Girls.mp3',
      coverImgUrl: '/image/CP4.png'
    }, {
      id: 5,
      title: 'BOY',
      singer: 'Charlie Puth',
      src: 'http://192.168.2.101:8000/Charlie%20Puth%20-%20BOY.mp3',
      coverImgUrl: '/image/CP5.png'
    }, {
      id: 6,
      title: 'Look At Me Now',
      singer: 'Charlie Puth',
      src: 'http://192.168.2.101:8000/Charlie%20Puth%20-%20Look%20At%20Me%20Now.mp3',
      coverImgUrl: '/image/CP6.png'
    }],
    state: 'paused',
    playIndex: '0',
    play: {
      currentTime: '00:00',
      duration: '00:00',
      percent: 0,
      title: '',
      singer: '',
      coverImgUrl: '/image/CP.png'
    }
  },

  audioCtx: null,

  onReady: function () {
    // 创建InnerAudioContext实例
    this.audioCtx = wx.createInnerAudioContext();

    // 播放进度  需格式化时间显示
    this.audioCtx.onTimeUpdate(() => {
      this.setData({
        'play.currentTime': formatTime(this.audioCtx.currentTime),
        'play.duration': formatTime(this.audioCtx.duration),
        'play.percent': this.audioCtx.currentTime / this.audioCtx.duration * 100
      })
    })
    // this.progress();
    // 播放失败 (不使用箭头函数时需另定义 var that = this ,下同)
    this.audioCtx.onError(() => console.log('播放失败' + this.audioCtx.src))
    // 播放完切换下一首
    this.audioCtx.onEnded(() => this.next())
    // 当前音乐
    this.setMusic(0)
    // 格式化时间
    function formatTime(time) {
      var minute = Math.floor(time / 60) % 60;
      var second = Math.floor(time % 60);
      return (minute >= 10 ? minute : '0' + minute) + ':' + (second >= 10 ? second : '0' + second);
    }
  },

  // 设置当前播放音乐（根据playlist数组下标）
  setMusic: function (index) {
    var music = this.data.playlist[index]
    this.audioCtx.src = music.src;
    this.setData({
      playIndex: index,
      'play.title': music.title,
      'play.singer': music.singer,
      'play.coverImgUrl': music.coverImgUrl,
      'play.currentTime': '00:00',
      'play.duration': '00:00',
      'play.percent': 0
    })
    // this.audioCtx.play()
  },
  // 播放
  play: function () {
    this.audioCtx.play()
    this.setData({
      'state': 'playing'
    })
  },
  // 暂停
  pause: function () {
    this.audioCtx.pause()
    this.setData({
      'state': 'paused'
    })
  },
  // 下一首
  next: function () {
    var next = this.data.playIndex == this.data.playlist.length - 1 ? 0 : this.data.playIndex + 1;
    this.setMusic(next);
    if (this.data.state == 'playing') {
      this.audioCtx.play();
    }
  },
  // 上一首
  before: function () {
    var before = this.data.playIndex == 0 ? this.data.playlist.length - 1 : this.data.playIndex - 1;
    this.setMusic(before);
    if (this.data.state == 'playing') {
      this.audioCtx.play()
    }
  },
  // 点击图片至播放页
  toPlayPage: function () {
    this.setData({
      item: 1
    })
  },
  // 点击列表图标至播放列表页
  toPlaylistPage: function () {
    this.setData({
      item: 2
    })
  },

  // 点击导航栏切换至对应页面
  changeItem: function (e) {
    // console.log(e.target.dataset.item)
    this.setData({
      item: e.target.dataset.item
    })
  },
  // 滑动页面切换
  tabChange: function (e) {
    this.setData({
      tab: e.detail.current
    })
  },

  // 歌曲调整进度
  sliderChange: function (e) {
    // console.log(e.detail.value)
    var second = e.detail.value * this.audioCtx.duration / 100;
    this.audioCtx.seek(second)
    // 此处有bug 需暂停再播放currentTime才会更新 
    this.audioCtx.pause()
    this.audioCtx.play()
    this.setData({
      'state': 'playing'
    })
    // 偶尔还是会有不更新的情况
  },

  // 播放列表点击切换歌曲
  change: function (e) {
    this.setMusic(e.currentTarget.dataset.index)
    // this.pause()
    this.play()
  },

  // 分享
  onShareAppMessage: function () {
    return {
      title: this.data.play.title,     //分享内容
      path: '/pages/index/index',      //分享地址
      imageUrl: this.data.play.coverImgUrl, //分享图片
      success: this.showok()
    }
    
  },
  // 转发成功
  showok: function () {
    wx.showToast({
      title: '转发成功',
      icon: 'success',   //icon: 'loading',
      duration: 3000
    })
  },

  // Modal
  modalcnt: function () {
    wx.showModal({
      title: '提示',
      content: '该功能暂未开放！',
      showCancel: false,
      confirmColor: 'rgb(211, 159, 143)'
    })
  },

  toHotMusicPage: function () {
    wx.navigateTo({
      url: '../hotMusic/hotMusic',
    })
  }

})