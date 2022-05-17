// pages/mineFoods/index.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foods: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow(options) {
    this.getData();
  },
  add() {
    wx.navigateTo({
      url: '../addFood/index',
    })
  },
  getData() {
    let _this = this;
    wx.showLoading({
      title: '获取数据',
      mask: true
    })
    db.collection('food').where({
      identity: 1
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