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
    elements: [
      {
        id: 1,
        name: "大盘鸡",
        photo: "https://ali.xinshipu.cn/20171219/original/1513669121940.jpg@288w_216h_50q_1e_1c.jpg",
        description: "新疆大盘鸡又名为沙湾大盘鸡，是新疆名菜，主要用料为鸡块和土豆块、四川粉皮，配皮带面烹饪而成。",
        location: "一食堂四川风味",
        price: "8",
      },
      {
        id:2,
        name: "清蒸螃蟹",
        photo: "https://i8.meishichina.com/attachment/recipe/201109/201109131405454.jpg?x-oss-process=style/p800",
        description: "原汁原味，味觉盛宴，鲜美可口，快来品尝",
        location: "一食堂淮扬餐厅",
        price: "20",
      }
    ]
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