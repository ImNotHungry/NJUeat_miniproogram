import http from '../../utils/http'
// pages/dishes/dishes.js
const app = getApp()
Page({
  
  /**
   * 组件的初始数据
   */
  data: {
    Canteen: [{
      id: 0,
      name: '一食堂',
      colord: '#d7f0db',
      colorl: '#39b54a',
    }, {
      id: 1,
      name: '二食堂',
      colord: '#d2f1f0',
      colorl: '#1cbbb4',
    }, {
      id: 2,
      name: '三食堂',
      colord: '#cce6ff',
      colorl: '#0081ff',
    }, {
      id: 3,
      name: '清真食堂',
      colord: '#e1d7f0',
      colorl: '#6739b6',
    }],
    dishesDetail: {
      name: '白切肉',
      photo: 'http://p2.qhmsg.com/t01561d3c1fc9958d06.jpg',
      description: '',
      CanteenId: '0',
      window: "淮扬餐厅",
      price: "20",
    }
  },

  onLoad: function (options) {
    let data = {
      userId: app.globalData.userId
    }
    http.post("/food/random",data).then((response) => {
      console.log(response)
      this.setData({
        dishesDetail: response.object[0]
      })
      console.log(this.data.dishesDetail);
    })
    // 获取每日一菜内容
    // wx.request({
    //   url: '******', 
    //   header: { 
    //     'Content-Type': 'application/json'
    //   },
    //   data: {//要请求的参数
    //     x: '',
    //     y: ''
    //   },
    //   success: function (res) {
    //     // 修改dishesDetail的内容
    //     ..........
    //   }
    // })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
