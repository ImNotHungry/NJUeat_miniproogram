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
        console.log(response)
      })
    }
    else {
      // 添加收藏
      let data = {
        userId: app.globalData.userId,
        foodId: id
      }
      http.post('/user/addCollection', data).then((response) => {
        console.log(response)
      })
    }
    console.log(isFavor);
    console.log(id);
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
    elements: [{
      id: 1,
      name: "大盘鸡",
      photo: "https://ali.xinshipu.cn/20171219/original/1513669121940.jpg@288w_216h_50q_1e_1c.jpg",
      description: "新疆大盘鸡又名为沙湾大盘鸡，是新疆名菜，主要用料为鸡块和土豆块、四川粉皮，配皮带面烹饪而成。",
      CanteenId: '0',
      window: "新疆风味",
      price: "8/500g",
      isFavor: false
    },
    {
      id: 2,
      name: "清蒸螃蟹",
      photo: "https://i8.meishichina.com/attachment/recipe/201109/201109131405454.jpg?x-oss-process=style/p800",
      description: "原汁原味，味觉盛宴",
      CanteenId: '0',
      window: "淮扬餐厅",
      price: "20/只",
      isFavor: false
    },
    {
      id: 3,
      name: "水煮胡萝卜",
      photo: "https://ali.xinshipu.cn/20171219/original/1513669121940.jpg@288w_216h_50q_1e_1c.jpg",
      description: "水煮胡萝卜好吃",
      CanteenId: '1',
      window: "低盐少油",
      price: "3/份",
      isFavor: true
    },
    {
      id: 4,
      name: "兰州拉面",
      photo: "https://i8.meishichina.com/attachment/recipe/201109/201109131405454.jpg?x-oss-process=style/p800",
      description: "原汁原味，味觉盛宴",
      CanteenId: '1',
      window: "西北面食",
      price: "10/份",
      isFavor: false
    },
    {
      id: 5,
      name: "肠粉",
      photo: "https://ali.xinshipu.cn/20171219/original/1513669121940.jpg@288w_216h_50q_1e_1c.jpg",
      description: "肠粉好吃",
      CanteenId: '2',
      window: "广东风味",
      price: "8/份",
      isFavor: false
    },
    {
      id: 6,
      name: "三杯鸡",
      photo: "https://i8.meishichina.com/attachment/recipe/201109/201109131405454.jpg?x-oss-process=style/p800",
      description: "原汁原味，味觉盛宴",
      CanteenId: '2',
      window: "台湾风味",
      price: "10/份",
      isFavor: false
    },
    {
      id: 7,
      name: "铁板牛肉饭",
      photo: "https://ali.xinshipu.cn/20171219/original/1513669121940.jpg@288w_216h_50q_1e_1c.jpg",
      description: "铁板牛肉饭好吃",
      CanteenId: '3',
      window: "铁板风味",
      price: "12",
      isFavor: false
    },
    {
      id: 8,
      name: "牛肉面",
      photo: "https://i8.meishichina.com/attachment/recipe/201109/201109131405454.jpg?x-oss-process=style/p800",
      description: "原汁原味，味觉盛宴",
      CanteenId: '3',
      window: "拉面窗口",
      price: "10",
      isFavor: false
    }
    ],
    swiperImg: [
      'https://qcloud.dpfile.com/pc/AMhZbu35JV2v-3_FQHYV_JMNHX6wW0Zg10sQn0Akup3hBQl8_dvMAzcpchKulvZ8mXKqvF8xz-Pgbz9r8ffpSA.jpg',
      'https://p1.meituan.net/poiskudish/a70365e7f5b08ae51e8723d2367c3f512836769.png@600w_600h_1l',
      'https://qcloud.dpfile.com/pc/u5A5iDO3fi1KEz5-PtNgQ_naB2CpTh6OkhUj0XiLvBVJ8lr6EZXNPKlGPLcTXkPumXKqvF8xz-Pgbz9r8ffpSA.jpg',
      'https://qcloud.dpfile.com/pc/Ud0vVtXfLpYwxE-nlI3nzIpka9yKS1lLeouULNgUbEElag4870O6l9wsYu05C_sDmXKqvF8xz-Pgbz9r8ffpSA.jpg',
      'https://img.meituan.net/msmerchant/d1123850d70d8dd52322f323378e94a11012181.jpg@380w_214h_1e_1c'
    ]
  },
  onLoad(options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    // let cId = options.cId;
    // 获取食堂列表
    http.post('/restaurant/allCanteen').then((response) => {
      let list = [];
      for (let i = 0; i < response.object.length; i++) {
        list[i] = { id: i, name: response.object[i].restaurantName }
      }
      this.setData({
        list: list,
        listCur: list[0],
        elements:[]
      });

      for(let j=0;j<list.length;j++){
        let rid=list[j].id;
        let data = {restaurantId: rid}
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