import http from '../../utils/http'

const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否显示
    isShow: {
      type: Boolean,
      value: true
    },
    // 弹框标题
    title: {
      type: String,
      value: ''
    },
    // 弹框内容
    content: {
      type: String,
      value: ''
    },
    // 是否显示取消按钮
    showCancel: {
      type: Boolean,
      value: true
    },
    // 确认按钮文本
    confirmText: {
      type: String,
      value: '同意'
    },
    // 确认按钮的open-type
    open_type: {
      type: String,
      value: ''
    },
    // bindSuccess 在HTML使用该属性可将 使用页面 的函数绑定到确认按钮的事件当中去
    // bindCancel 在HTML使用该属性可将 使用页面 的函数绑定到取消按钮的事件当中去
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  attached: function() {
    wx.getSystemInfo({
      success: function(res) {
        console.log(res)
        if (res.SDKVersion >= "2.1.0") {
          // self.setData({
          //   exitApp: true//data中的初始化变量
          // })
        }
      }
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    close: function () {
      this.setData({
        hide: true
      });
    },
    Success: function (e) {
      console.log('Success');
      var myEventDetail = e // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('Success', myEventDetail, myEventOption)
      this.close();
    },
    Cancel: function (e) {
      var myEventDetail = e // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('Cancel', myEventDetail, myEventOption)
      this.close();
    },
    getUserInfo: function (e) {
      console.log('userInfo....', e.detail.userInfo)
      app.globalData.userInfo = e.detail.userInfo
      app.globalData.hasUserInfo = true

      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      let tempData = {
        'wxID': app.globalData.openId,
        'userName': app.globalData.userInfo.nickName,
        'avatarUrl': app.globalData.userInfo.avatarUrl
      }
      http.post('/user/addUser', tempData).then((response) => {
        let tempData2 = {
          'wxId': app.globalData.openId
        }
        http.post('/user/getUserInfo', tempData2).then((response) => {
          app.globalData.userId = response.object.id
        })
      })
      this.Success()
      // // console.log(app.globalData)
      // getCurrentPages()[getCurrentPages().length - 1].onLoad()
    },
  }
})