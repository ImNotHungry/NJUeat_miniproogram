const app = getApp()
Page({
  data: {
    userInfo:{},
    hasUserInfo:app.globalData.hasUserInfo,
    PageCur: 'discovery',
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }else{
    }
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
})