import http from '../../utils/http'

const app = getApp()
Page({
  cancelFavor: function (e) {
    var id = e.currentTarget.dataset.itemid;
    // console.log(e.currentTarget);
    // 取消收藏
    let data = {
      userId: app.globalData.userId,
      foodId: id
    }
    http.post('/user/deleteCollection', data).then((response) => {
      console.log(response)
      this.onLoad();
    })
    
  },
  data: {
    elements: []
  },
  onLoad(options) {
    console.log(app.globalData)
    let data = {
      userId: app.globalData.userId
    }
    http.post('/user/viewCollection',data).then((response) =>{
      console.log(response)
      let list = [];
      for (let i = 0; i < response.object.length; i++) {
        list[i] = {
          id: response.object[i].id,
          name: response.object[i].name,
          description: response.object[i].description,
          photo: response.object[i].pictureUrl,
          location: response.object[i].restaurantName + response.object[i].window,
          price: response.object[i].price
        }
      }
      this.setData({
        elements: list
      })
    })
  },
  onReady() {
    wx.hideLoading()
  }
})