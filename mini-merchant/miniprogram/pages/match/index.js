// pages/match/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  nav() {
    wx.navigateTo({
      url: '../matchdetail/index',
    })
  },
  add() {
    wx.navigateTo({
      url: '../addmatch/index',
    })
  }
})