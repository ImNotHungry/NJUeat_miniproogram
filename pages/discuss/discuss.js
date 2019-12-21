import http from '../../utils/http'

Component({
  created: function () {
    // 获取评论内容
    http.post('/appraise/viewComment').then((response) => {
      this.setData({
        elements: response.object
      });
    })
  },
  options: {
    addGlobalClass: true,
  },
  data: {
    elements:[]
  },
  pageLifetimes: {
    show: function () {
      // 获取评论内容
      http.post('/appraise/viewComment').then((response) => {
        this.setData({
          elements: response.object
        });
      })
    }
  }
})