// pages/menu/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    asides: ["素菜", "荤菜", "饭后甜品"],
    height: 0,
    isNotice: true,
    selected: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let _this = this;
    let arr = new Array(40);
    for(let i = 0; i < arr.length; ++i) arr[i] = false;
    wx.getSystemInfo({
      success: (result) => {
        _this.setData({ height: result.windowHeight - 50, selected: arr })
      },
    })
  },
  closeNotice() {
    this.setData({
      isNotice: false
    })
  },
  nav() {
    wx.navigateTo({
      url: "../detail/index?type=1",
    })
  },
  select(e) {
    const { index } = e.currentTarget.dataset;
    this.setData({
      [`selected[${index}]`]: !this.data.selected[index]
    })
  }
})