// pages/menu/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    asides: ["早餐", "中餐", "晚餐", "其他餐"],
    height: 0,
    isNotice: true
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
  },
  closeNotice() {
    this.setData({
      isNotice: false
    })
  },
  nav() {
    let { activeKey } = this.data;
    wx.navigateTo({
      url: `../detail/index?active=${activeKey}`,
    })
  },
  onChange(event) {
    this.setData({ activeKey: event.detail })
  }
})