const app = getApp()

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    userInfo: null,
    hasUserInfo: true,
    elements: [{
      title: '食堂大全',
      name: 'canteenDetails',
      color: 'cyan',
      icon: 'apps'
    },
    {
      title: '每日一菜',
      name: 'dishes',
      color: 'blue',
      icon: 'favor'
    },
    {
      title: '新品推荐',
      name: 'recommend',
      color: 'purple',
      icon: 'appreciate'
    },
    {
      title: '校外美食',
      name: 'outside',
      color: 'mauve',
      icon: 'footprint'
    },
    ],
  },
  lifetimes: {
    attached: function () {
      wx.getSetting({
        success: res => {
          this.setData({
            hasUserInfo: res.authSetting['scope.userInfo'] == true
          })
        }
      })
    },
  },
  methods: {
    onSuccess: function(){
      this.setData({
        hasUserInfo: app.globalData.hasUserInfo
      })
    }
  }
})