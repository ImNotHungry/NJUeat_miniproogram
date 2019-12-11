import http from '../../utils/http'

// pages/canteen.js
const app = getApp();
Page({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    ColorList: app.globalData.ColorList,
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
  },

  onLoad: function () {
    http.post('/restaurant/allCanteen').then((response) => {
      this.setData({
        Canteen: response.object
      });
    });
  },

  /**
   * 组件的方法列表
   */
  tocanteenDetails: function (e) {
    let id = e.currentTarget.id;
    wx.navigateTo({
      url: '../canteenDetails/canteenDetails?cId=' + id
    })
  },
  randomtocanteenDetails: function () {
    let id = Math.floor(Math.random(this.data.Canteen.length));
    wx.navigateTo({
      url: '../canteenDetails/canteenDetails?cId=' + id
    })
  }

})