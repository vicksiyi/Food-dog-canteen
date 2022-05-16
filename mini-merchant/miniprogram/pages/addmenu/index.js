// pages/record/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:-1,
    columns: ['早餐', '中餐', '晚餐', '其他餐'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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