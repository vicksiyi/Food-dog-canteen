// pages/detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    type: 0,
    columns: ['早餐', '中餐', '晚餐', '其他餐'],
    show: false,
    active: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let _this = this;
    let { type, active } = options;
    if (type) this.setData({ type })
    if (active) this.setData({ active })
    wx.getSystemInfo({
      success: (result) => {
        _this.setData({
          height: result.windowHeight
        })
      },
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  select() {
    this.setData({ show: true });
  },
  onConfirm(event) {
    const { picker, value, index } = event.detail;
    this.setData({ active: index, show: false })
  }
})