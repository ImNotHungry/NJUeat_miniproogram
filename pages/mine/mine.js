import http from '../../utils/http'

const app = getApp()

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  lifetimes: {
    attached: function() {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: app.globalData.hasUserInfo
      })
    },
  },
  methods: {
    //事件处理函数
    bindViewTap: function() {
      wx.navigateTo({
        url: '../logs/logs'
      })
    },
    getUserInfo: function(e) {
      app.globalData.userInfo = e.detail.userInfo
      app.globalData.hasUserInfo = true

      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      let tempData = {
        'wxID': app.globalData.openId,
        'userName': app.globalData.userInfo.nickName
      }
      http.post('/user/addUser', tempData).then((response) => {
        // console.log('response:', response)

        let tempData2 = {
          'wxId': app.globalData.openId
        }
        http.post('/user/getUserInfo', tempData2).then((response) => {
          // console.log(response)
          app.globalData.userId = response.object.id
          // console.log(app.globalData)
        })

      })
      // console.log(app.globalData)
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    },

  }
})