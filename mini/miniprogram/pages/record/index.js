// pages/record/index.js
const db = wx.cloud.database()
const { dateFormat } = require("../../utils/utils");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: -1,
    columns: ['早餐', '中餐', '晚餐', '其他餐'],
    keyword: "",
    searchs: [],
    foods: []
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
  inputChange(e) {
    console.log(e);
    this.setData({ keyword: e.detail })
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
    db.collection('food').where({
      title: db.RegExp({
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
  selectSearch(e) {
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
    let { foods, active, columns } = this.data;
    if (active === -1) {
      wx.showToast({ title: '请选择类别', icon: "none" })
      return;
    }
    if (!foods.length) {
      wx.showToast({ title: '请选择菜品', icon: "none" })
      return;
    }
    let nowDay = new Date();
    let day = dateFormat("YYYY-mm-dd", nowDay);
    wx.showLoading({ title: '添加中', mask: true });
    db.collection('plans').where({
      date: day,
      type: columns[active]
    }).get({
      success(res) {
        if (res.data.length) {
          db.collection('plans').where({
            date: day,
            type: columns[active]
          }).update({
            data: {
              date: day,
              type: columns[active],
              foods: {
                foods: foods,
                desc: foods.map(value => value.title).join("、"),
                name: "记录添加",
                price: foods.map(value => value.price).reduce((total, num) => { return parseInt(total) + parseInt(num); })
              }
            },
            success() {
              _this.setData({ foods: [], active: -1 })
              wx.showToast({ title: '更新成功', icon: 'none' })
            },
            complete() {
              wx.hideLoading()
            },
            fail(err) {
              console.log(err);
              wx.showToast({ title: '更新失败', icon: 'none' })
            }
          })
        } else {
          db.collection('plans').add({
            data: {
              date: day,
              type: columns[active],
              foods: {
                foods: foods,
                desc: foods.map(value => value.title).join("、"),
                name: "记录添加",
                price: foods.map(value => value.price).reduce((total, num) => { return parseInt(total) + parseInt(num); })
              }
            },
            success() {
              _this.setData({ foods: [], active: -1 })
              wx.showToast({ title: '添加成功', icon: 'none' })
            },
            complete() {
              wx.hideLoading()
            },
            fail() {
              wx.showToast({ title: '添加失败', icon: 'none' })
            }
          })
        }
      },
      fail(err) {
        wx.showToast({ title: err, icon: 'none' })
        wx.hideLoading()
      }
    })
  }
})