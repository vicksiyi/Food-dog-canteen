// pages/match/index.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foods: []
  },
  nav(e) {
    const { _id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../matchdetail/index?_id=${_id}`,
    })
  },
  add() {
    wx.navigateTo({
      url: '../addmatch/index',
    })
  },
  onShow() {
    this.getData();
  },
  getData() {
    let _this = this;
    wx.showLoading({
      title: '获取数据',
      mask: true
    })
    db.collection('foods').get({
      success: function (res) {
        _this.setData({ foods: res.data })
      },
      complete() {
        wx.hideLoading()
      }
    })
  }
})