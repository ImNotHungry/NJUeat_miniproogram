import http from '../../utils/http'

// pages/basics/outside/outside.js
Page({
  onLoad: function (options) {
    // 获取校外推荐内容
    http.post('/restaurant/outside').then((response) => {
      console.log(response.object)
      this.setData({
        elements: response.object
      });
    });
  },
  data: {
    elements: [
      {
        logo: "http://www.fuxiaojie.cn/uploadfile/2019/1108/20191108060545871.jpg",
        address: "羊皮巷27号",
        money: "79",
        description: "付小姐在成都创始人“小哥”自述：“我是个重庆娃子，大家都叫 我小哥。”小哥从小就跟着妈妈在成都开馆子，妈妈姓付，由此取名：付小姐在成都。"
      },
      {
        logo: "https://img.meituan.net/msmerchant/b8da97e16d1842fcd247fc7fad564a70135241.jpg%40240w_180h_1e_1c_1l%7Cwatermark%3D0",
        address: "管家桥九号余斯达广场二楼",
        money: "65",
        description: "80后的我们背上行囊，带着一份倔强和梦想行至四方，终于功夫不负有心人，我们找到了那种力量——韩式正统手工炸鸡。"
      },
      {
        logo: "http://p1.meituan.net/mogu/eda8d31f09a0410e3e2b96b627c1c5ce85468.jpeg%40240w_180h_1e_1c_1l%7Cwatermark%3D0",
        address: "中山北路6号紫峰购物中心5楼A03",
        money: "67",
        description: "南京人展示独特金陵菜系的古典饭店品牌，在秉承原浓郁民俗风格基础之上，又有创新和升华，数百种民厨小食，田园时蔬，家常烹煮，口味地道。"
      },
      {
        logo: "https://img.meituan.net/msmerchant/8d49cc2054e3c770a9311868153b6e281153717.jpg%40700w_700h_0e_1l%7Cwatermark%3D1%26%26r%3D1%26p%3D9%26x%3D2%26y%3D2%26relative%3D1%26o%3D20",
        address: "中山路100号艾尚天地A座3层",
        money: "139",
        description: "我们采用的18种基础中药材料、5道严格把关工序加上3天手工熬制才能为食客门献上属于哥老官的锅底。"
      },
      {
        logo: "https://img.meituan.net/msmerchant/63589a213f1b8c8e4a0e53ed734b605e2468591.png%40240w_180h_1e_1c_1l%7Cwatermark%3D0",
        address: "中山路100号艾尚天地A座3层",
        money: "80",
        description: "“仙气缭绕”的江南花开，外酥里嫩、且有布丁解腻的芒果蛋香辣子鸡，有着江南风味甜的西湖冰粉，口感绵密、奶香十足的奶香南瓜……"
      }
    ]
  }
})
