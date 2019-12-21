import http from '../../utils/http'

const app = getApp()
Page({
  changeFavor: function (e) {
    var isFavor = e.currentTarget.dataset.isfavor;
    var id = e.currentTarget.dataset.itemid;

    if (isFavor) {
      // 取消收藏
      let data = {
        userId: app.globalData.userId,
        foodId: id
      }
      http.post('/user/deleteCollection', data).then((response) => {
      })
    }
    else {
      // 添加收藏
      let data = {
        userId: app.globalData.userId,
        foodId: id
      }
      http.post('/user/addCollection', data).then((response) => {
      })
      
    }
    this.onLoad();
  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true,
    elements: [],
    swiperImg: [
      'https://qcloud.dpfile.com/pc/AMhZbu35JV2v-3_FQHYV_JMNHX6wW0Zg10sQn0Akup3hBQl8_dvMAzcpchKulvZ8mXKqvF8xz-Pgbz9r8ffpSA.jpg',
      'https://p1.meituan.net/poiskudish/a70365e7f5b08ae51e8723d2367c3f512836769.png@600w_600h_1l',
      'https://qcloud.dpfile.com/pc/u5A5iDO3fi1KEz5-PtNgQ_naB2CpTh6OkhUj0XiLvBVJ8lr6EZXNPKlGPLcTXkPumXKqvF8xz-Pgbz9r8ffpSA.jpg',
      'https://qcloud.dpfile.com/pc/Ud0vVtXfLpYwxE-nlI3nzIpka9yKS1lLeouULNgUbEElag4870O6l9wsYu05C_sDmXKqvF8xz-Pgbz9r8ffpSA.jpg',
      'https://img.meituan.net/msmerchant/d1123850d70d8dd52322f323378e94a11012181.jpg@380w_214h_1e_1c'
    ]
  },
  onLoad(options) {
    // wx.showLoading({
    //   title: '加载中...',
    //   mask: true
    // });
    // let cId = options.cId;
    // 获取食堂列表
    http.post('/restaurant/allCanteen').then((response) => {
      let list = [];
      for (let i = 0; i < response.object.length; i++) {
        list[i] = { id: response.object[i].restaurantId, name: response.object[i].restaurantName }
      }
      this.setData({
        list: list,
        listCur: list[0],
        elements:[]
      });

      for(let j=0;j<list.length;j++){
        let rid=list[j].id;
        let data = {
          restaurantId: rid,
          userId: app.globalData.userId
        }
        http.post("/food/all", data).then((response)=>{
          this.setData({
            elements:this.data.elements.concat(response.object)
          })
        })
        
      }
    });

    //todo 获取食堂的菜品 
  },
  onReady() {
    wx.hideLoading()
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        return false
      }
    }
  }
})