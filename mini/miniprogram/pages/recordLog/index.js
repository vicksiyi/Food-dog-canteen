// pages/recordLog/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    asides: ["早餐", "中餐", "晚餐", "其他餐"],
    height: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let _this = this;
    wx.getSystemInfo({
      success: (result) => {
        _this.setData({ height: result.windowHeight })
      },
    })
  }
})