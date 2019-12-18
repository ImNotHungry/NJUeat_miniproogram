import http from '../../utils/http'

Component({
  created: function (options) {
    // 获取评论内容
    http.post('/appraise/viewComment').then((response) => {
      this.setData({
        elements: response.object
      });
      console.log(this.data.elements);
    })
  },
  options: {
    addGlobalClass: true,
  },
  data: {
    elements:[
      {
        comment_name:"不愿透露姓名的XXX",
        comment_icon:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573660285079&di=6c05fe10d4a9a28969ec5a03c8bdd036&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20160215%2FImg437427783.jpg",
        comment_date:"2019年12月3日",
        comment_text:"ball ball食堂多弄一点热菜吧！"
      },
      {
        comment_name: "不愿透露姓名的YYY",
        comment_icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573660285079&di=6c05fe10d4a9a28969ec5a03c8bdd036&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20160215%2FImg437427783.jpg",
        comment_date: "2019年12月4日",
        comment_text: "OMG！食堂太清淡啦！"
      },
      {
        comment_name: "不愿透露姓名的ZZZ",
        comment_icon: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573660285079&di=6c05fe10d4a9a28969ec5a03c8bdd036&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20160215%2FImg437427783.jpg",
        comment_date: "2019年12月4日",
        comment_text: "为什么食堂的肉这么贵？"
      }
    ]
  }
})