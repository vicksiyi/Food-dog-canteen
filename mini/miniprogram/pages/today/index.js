// pages/today/index.js
const db = wx.cloud.database()
const { dateFormat } = require("../../utils/utils");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    asides: ["早餐", "中餐", "晚餐", "其他餐"],
    active: 0,
    height: 0,
    activeFoods: {},
    foods: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let _this = this;
    wx.getSystemInfo({
      success: (result) => {
        _this.setData({
          height: result.windowHeight
        })
      },
    })
    this.getData();
  },
  getData() {
    let _this = this;
    let { asides, active } = this.data;
    wx.showLoading({ title: '获取数据', mask: true })
    let nowDay = new Date();
    db.collection('plans').where({
      date: dateFormat("YYYY-mm-dd", nowDay)
    }).get({
      success: function (res) {
        let activeFoods = res.data.filter(value => value.type == asides[active])
        _this.setData({ foods: res.data, activeFoods })
      },
      complete() {
        wx.hideLoading()
      }
    })
  },
  onChange(event) {
    let { foods, asides } = this.data;
    let activeFoods = foods.filter(value => value.type == asides[event.detail.index])
    this.setData({ activeFoods, active: event.detail.index })
  }
})