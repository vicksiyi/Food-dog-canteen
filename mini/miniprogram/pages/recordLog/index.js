// pages/recordLog/index.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    asides: ["早餐", "中餐", "晚餐", "其他餐"],
    height: 0,
    plans: [],
    active: 0,
    activePlans: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let _this = this;
    let { asides } = this.data;
    let activePlans = new Array(asides.length);
    for (let i = 0; i < asides.length; i++) { activePlans[i] = []; }
    wx.getSystemInfo({
      success: (result) => {
        _this.setData({ height: result.windowHeight })
      }
    })
    this.setData({ activePlans });
    this.getData();
  },
  getData() {
    let _this = this;
    let { asides, activePlans } = this.data;
    wx.showLoading({ title: '获取数据', mask: true })
    db.collection('plans').get({
      success: function (res) {
        for (let i = 0; i < asides.length; i++) {
          let _arr = res.data.filter(value => asides[i] === value.type)
          _arr = _arr.map(value => {
            value.heat = value.foods.foods.map(value => value.heat).reduce((total, num) => {
              return parseInt(total) + parseInt(num);
            })
            activePlans[i].unshift(value);
            return value;
          })
        }
        _this.setData({ plans: res.data, activePlans })
      },
      complete() {
        wx.hideLoading()
      }
    })
  },
  onChange(event) {
    this.setData({ active: event.detail.index })
  }
})