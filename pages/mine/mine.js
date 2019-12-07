const app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    userInfo: null,
    hasUserInfo:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  lifetimes: {
    attached: function () {
       this.setData({
        userInfo:app.globalData.userInfo,
        hasUserInfo:app.globalData.hasUserInfo
      })
    },
  },
  methods: {
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    app.globalData.hasUserInfo = true
    console.log(app.globalData.userInfo)
    console.log(app.globalData.hasUserInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    getCurrentPages()[getCurrentPages().length - 1].onLoad()
  }
  }
})