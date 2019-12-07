Page({
  data: {
    elements: [
      {
        name: "大盘鸡",
        photo: "https://ali.xinshipu.cn/20171219/original/1513669121940.jpg@288w_216h_50q_1e_1c.jpg",
        description: "新疆大盘鸡又名为沙湾大盘鸡，是新疆名菜，主要用料为鸡块和土豆块、四川粉皮，配皮带面烹饪而成。",
        location: "一食堂四川风味",
        price: "8",
      },
      {
        name: "清蒸螃蟹",
        photo: "https://i8.meishichina.com/attachment/recipe/201109/201109131405454.jpg?x-oss-process=style/p800",
        description: "原汁原味，味觉盛宴，鲜美可口，快来品尝",
        location: "一食堂淮扬餐厅",
        price: "20",
      }
    ]
  },
  onLoad: function (options) {
    // 获取收藏内容
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
    //     elements = [];
    //     ..........
    //   }
    // })
  },
})