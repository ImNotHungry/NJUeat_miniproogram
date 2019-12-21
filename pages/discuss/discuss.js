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
    elements:[]
  }
})