// pages/addFood/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    price: "",
    heat: "",
    desc: "",
    active: -1,
    asides: ["素菜", "荤菜", "饭后甜品"],
    show: false
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