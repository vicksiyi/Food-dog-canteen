// pages/detail/index.js
const db = wx.cloud.database()
const { dateFormat } = require("../../utils/utils");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    type: 0,
    columns: ['早餐', '中餐', '晚餐', '其他餐'],
    show: false,
    active: 0,
    foods: [],
    allHeat: 0,
    datas: [],
    type: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let _this = this;
    let { type, active, _id } = options;
    if (type) {
      let foods = wx.getStorageSync('_foods')
      this.setData({
        type, foods, allHeat: foods.map(value => value.heat).reduce((total, value) => {
          return parseInt(total) + parseInt(value);
        }),
        type: 1
      })
    }
    if (active) this.setData({ active })
    wx.getSystemInfo({
      success: (result) => {
        _this.setData({
          height: result.windowHeight
        })
      },
    })
    if (_id) this.getData(_id)
    else {

    }
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
  getData(_id) {
    let _this = this;
    wx.showLoading({
      title: '获取数据',
      mask: true
    })
    db.collection('foods').doc(_id).get({
      success: function (res) {
        _this.setData({
          foods: res.data.foods,
          datas: res.data,
          allHeat: res.data.foods.map(value => value.heat).reduce((total, value) => {
            return parseInt(total) + parseInt(value);
          })
        })
      },
      complete() {
        wx.hideLoading()
      }
    })
  },
  add() {
    let { datas, foods, columns, active, type } = this.data;
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
              foods: type == 1 ? {
                foods: foods,
                desc: foods.map(value => value.title).join("、"),
                name: "点菜添加",
                price: foods.map(value => value.price).reduce((total, num) => { return parseInt(total) + parseInt(num); })
              } : datas
            },
            success() {
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
              foods: type == 1 ? {
                foods: foods
              } : datas
            },
            success() {
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