// pages/menu/index.js
const db = wx.cloud.database()
const { dateFormat } = require("../../utils/utils");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    asides: ["早餐", "中餐", "晚餐", "其他餐"],
    height: 0,
    isNotice: true,
    foods: [],
    activeFoods: []
  },
  onShow() {
    this.getData();
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
  nav(e) {
    const { _id } = e.currentTarget.dataset;
    let { activeKey } = this.data;
    wx.navigateTo({
      url: `../detail/index?active=${activeKey}&_id=${_id}`,
    })
  },
  getData() {
    let _this = this;
    let { activeKey, asides } = this.data;
    wx.showLoading({ title: '获取数据', mask: true })
    let nowDay = new Date();
    db.collection('menus').where({
      date: dateFormat("YYYY-mm-dd", nowDay)
    }).get({
      success: function (res) {
        let activeFoods = res.data.filter(value => value.type == asides[activeKey])
        _this.setData({ foods: res.data, activeFoods })
      },
      complete() {
        wx.hideLoading()
      }
    })
  },
  onChange(event) {
    let { foods, asides } = this.data;
    let activeFoods = foods.filter(value => value.type == asides[event.detail])
    this.setData({ activeFoods, activeKey: event.detail })
  }
})