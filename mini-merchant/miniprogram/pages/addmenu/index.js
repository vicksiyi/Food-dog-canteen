// pages/record/index.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: -1,
    columns: ['早餐', '中餐', '晚餐', '其他餐'],
    keyword: "",
    searchs: [],
    foods: {},
    start: '',
    end: '',
    date: '选择日期',
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
  },
  search() {
    let _this = this;
    const { keyword } = this.data;
    // if (!keyword) {
    //   wx.showToast({ title: '关键词不能为空', icon: "none" })
    //   return;
    // }
    wx.showLoading({ title: '搜索中', mask: true })
    db.collection('foods').where({
      name: db.RegExp({
        regexp: keyword,
        option: 'i'
      })
    }).get({
      success: function (res) {
        _this.setData({ searchs: res.data })
      },
      complete() {
        wx.hideLoading()
      }
    })
  },
  selected(e) {
    const { item } = e.currentTarget.dataset;
    this.setData({
      foods: item
    })
  },
  //选择日期
  selectDate(e) {
    let currentDate = e.detail.value;
    this.setData({
      date: currentDate
    })
  },
  add() {
    let _this = this;
    const { foods, columns, active, date } = this.data;
    if (!foods.price || active == -1 || date == "选择日期") {
      wx.showToast({ title: '字段不能为空', icon: "none" })
      return;
    }
    wx.showLoading({ title: '添加中', mask: true })
    db.collection('menus').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        foods, date, type: columns[active]
      },
      success: function (res) {
        _this.setData({
          foods: {},
          date: "选择日期",
          active: -1,
        })
        wx.showToast({title: '添加成功',icon: 'none'})
      },
      complete() {
        wx.hideLoading()
      }
    })
  }
})