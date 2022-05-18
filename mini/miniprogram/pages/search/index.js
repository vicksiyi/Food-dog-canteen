// pages/search/index.js
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    searchs: [],
    keyword: ""
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
  inputChange(e) {
    this.setData({ keyword: e.detail })
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
  }
})