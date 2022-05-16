// pages/matchdetail/index.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foods: {}
  },
  onLoad(options) {
    let { _id } = options;
    this.getData(_id);
  },
  getData(_id) {
    let _this = this;
    wx.showLoading({
      title: '获取数据',
      mask: true
    })
    db.collection('foods').doc(_id).get({
      success: function (res) {
        _this.setData({
          foods: res.data.foods, allHeat: res.data.foods.map(value=>value.heat).reduce((total, value) => {
            return parseInt(total) + parseInt(value);
          })
        })
      },
      complete() {
        wx.hideLoading()
      }
    })
  }
})