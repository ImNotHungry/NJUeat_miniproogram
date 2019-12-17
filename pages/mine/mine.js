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



      // wx.request({
      //   url: 'http://127.0.0.1:8000/user/addUser',
      //   method: 'post',
      //   data: tempData,
      //   header: {
      //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      //   },
      //   success(response) {
      //     if (response.code === 200) {
      //       console.log(response.data)
      //     } else {
      //       reject(response.data)
      //     }
      //   },
      //   fail(error) {
      //     reject(error.data)
      //   }
      // })


      // console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      app.globalData.hasUserInfo = true
      // console.log(app.globalData.userInfo)
      // console.log(app.globalData.hasUserInfo)

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