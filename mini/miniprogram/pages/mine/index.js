// pages/mine/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}
  },
  onLoad() {
    let userInfo = wx.getStorageSync("userInfo");
    this.setData({ userInfo })
  },
  auth() {
    let _this = this;
    wx.getUserProfile({
      desc: '正在获取',
    }).then(result => {
      _this.setData({ userInfo: result.userInfo })
      wx.setStorageSync('userInfo', result.userInfo)
    })
  },
  exit() {
    wx.removeStorageSync('userInfo');
    this.setData({ userInfo: {} })
  }
})