// pages/upload/index.js
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foods: []
  },
  add() {
    wx.navigateTo({
      url: '../addfood/index',
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
    db.collection('food').where({
      identity: _.neq(1)
    }).get({
      success: function (res) {
        _this.setData({ foods: res.data })
      },
      complete() {
        wx.hideLoading()
      }
    })
  }
})