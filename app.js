//app.js
import http from '/utils/http.js'

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    let that = this;

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          method: 'get',
          data: {
            appid: 'wx446f60adbe0ec659',
            secret: '5538daa8ab5638348494ff25129d862a',
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
          },
          success(response) {
            console.log(response)
            if (response.statusCode === 200) {
              that.globalData.openId = response.data.openid
            } else {
              reject(response.data);
            }

            // 获取用户信息
            wx.getSetting({
              success: res => {
                if (res.authSetting['scope.userInfo']) {
                  // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                  wx.getUserInfo({
                    success: res => {
                      // 可以将 res 发送给后台解码出 unionId
                      console.log(res.userInfo)
                      that.globalData.userInfo = res.userInfo
                      that.globalData.hasUserInfo = true

                      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                      // 所以此处加入 callback 以防止这种情况
                      if (that.userInfoReadyCallback) {
                        that.userInfoReadyCallback(res)
                      }
                      let tempData = {
                        'wxID': that.globalData.openId,
                        'userName': that.globalData.userInfo.nickName,
                        'avatarUrl': that.globalData.userInfo.avatarUrl
                      }
                      console.log('enter-----', that.globalData.openId)
                      http.post('/user/addUser', tempData).then((response) => {
                        let tempData2 = {
                          'wxId': that.globalData.openId
                        }
                        http.post('/user/getUserInfo', tempData2).then((response) => {
                          that.globalData.userId = response.object.id
                        })
                      })
                    }
                  })
                }
              }
            })
          },
          fail(error) {
            reject(error.data);
          }
        })
      }
    })
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.Custom = capsule;
          this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.CustomBar = e.statusBarHeight + 50;
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    hasUserInfo: false,
    ColorList: [{
      title: '嫣红',
      name: 'red',
      color: '#e54d42'
    },
    {
      title: '桔橙',
      name: 'orange',
      color: '#f37b1d'
    },
    {
      title: '明黄',
      name: 'yellow',
      color: '#fbbd08'
    },
    {
      title: '橄榄',
      name: 'olive',
      color: '#8dc63f'
    },
    {
      title: '森绿',
      name: 'green',
      color: '#39b54a'
    },
    {
      title: '天青',
      name: 'cyan',
      color: '#1cbbb4'
    },
    {
      title: '海蓝',
      name: 'blue',
      color: '#0081ff'
    },
    {
      title: '姹紫',
      name: 'purple',
      color: '#6739b6'
    },
    {
      title: '木槿',
      name: 'mauve',
      color: '#9c26b0'
    },
    {
      title: '桃粉',
      name: 'pink',
      color: '#e03997'
    },
    {
      title: '棕褐',
      name: 'brown',
      color: '#a5673f'
    },
    {
      title: '玄灰',
      name: 'grey',
      color: '#8799a3'
    },
    {
      title: '草灰',
      name: 'gray',
      color: '#aaaaaa'
    },
    {
      title: '墨黑',
      name: 'black',
      color: '#333333'
    },
    {
      title: '雅白',
      name: 'white',
      color: '#ffffff'
    }
    ]
  }
})