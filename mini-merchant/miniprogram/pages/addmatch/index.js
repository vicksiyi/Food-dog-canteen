// pages/addmatch/index.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchs: [],
    foods: [],
    keyword: "",
    name: "",
    price: 0,
    desc: ""
  },
  onLoad() {
    wx.showToast({ title: '关键字为空获取全部菜品', icon: "none" })
  },
  search() {
    let _this = this;
    const { keyword } = this.data;
    // if (!keyword) {
    //   wx.showToast({ title: '关键词不能为空', icon: "none" })
    //   return;
    // }
    wx.showLoading({ title: '搜索中', mask: true })
    db.collection('food').where({
      title: db.RegExp({
        regexp: keyword,
        option: 'i'
      }),
      identity: _.neq(1)
    }).get({
      success: function (res) {
        _this.setData({ searchs: res.data })
      },
      complete() {
        wx.hideLoading()
      }
    })
  },
  inputChange(e) {
    this.setData({ keyword: e.detail })
  },
  addFoods(e) {
    const data = e.currentTarget.dataset.item;
    const { foods } = this.data;
    for (let i = 0; i < foods.length; i++) {
      if (foods[i]._id == data._id) {
        wx.showToast({ title: '不能重复添加', icon: "none" })
        return;
      }
    }
    foods.push(data);
    this.setData({ foods: foods })
  },
  add() {
    let _this = this;
    const { foods, name, price, desc } = this.data;
    if (!name || !desc || !foods.length) {
      wx.showToast({ title: '字段不能为空', icon: "none" })
      return;
    }
    wx.showLoading({ title: '正在添加', mask: true })
    db.collection('foods').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        name, price, desc, foods
      },
      success: function (res) {
        wx.showToast({ title: '添加成功', icon: "none" })
        _this.setData({
          foods: [],
          name: "",
          price: 0,
          desc: ""
        })
      },
      complete() {
        wx.hideLoading()
      }
    })
  }
})