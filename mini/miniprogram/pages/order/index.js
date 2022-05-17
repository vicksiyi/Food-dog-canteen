// pages/menu/index.js
const db = wx.cloud.database()
const _ = db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    asides: ["素菜", "荤菜", "饭后甜品"],
    height: 0,
    isNotice: true,
    selected: [],
    foods: [],
    activeFoods: [],
    arrLen: [0, 0, 0]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let _this = this;
    wx.getSystemInfo({
      success: (result) => {
        _this.setData({ height: result.windowHeight - 50 })
      },
    })
    this.getData();
  },
  closeNotice() {
    this.setData({
      isNotice: false
    })
  },
  nav() {
    let { selected, foods, arrLen, asides } = this.data;
    let _temp = new Array(arrLen.length);
    for (let i = 0; i < _temp.length; i++) {
      _temp[i] = [];
    }
    for (let i = 0; i < foods.length; i++) {
      _temp[asides.indexOf(foods[i].type)].push(foods[i]);
    }
    let _data = [];
    for (let i = 0; i < selected.length; i++) {
      if (selected[i]) {
        let _len = i, _start = 0;
        while (_len - arrLen[_start] + 1 >= 0) {
          _start++;
        }
        _data.push(foods[_len]);
      }
    }
    wx.setStorageSync('_foods', _data)
    wx.navigateTo({
      url: "../detail/index?type=1",
    })
  },
  select(e) {
    let { activeKey, arrLen } = this.data;
    let { index } = e.currentTarget.dataset;
    index = activeKey == 0 ? index : index + arrLen[activeKey - 1];
    this.setData({
      [`selected[${index}]`]: !this.data.selected[index]
    })
  },
  getData() {
    let _this = this;
    let { asides, activeKey, arrLen } = this.data;
    wx.showLoading({
      title: '获取数据',
      mask: true
    })
    db.collection('food').where({
      identity: _.neq(1)
    }).get({
      success: function (res) {
        let activeFoods = res.data.filter(value => value.type == asides[activeKey])
        let arr = new Array(res.data.length);
        for (let i = 0; i < arr.length; ++i) arr[i] = false;
        res.data.forEach(element => {
          arrLen[asides.indexOf(element.type)]++;
        });
        for (let i = 1; i < arrLen.length; ++i) {
          arrLen[i] += arrLen[i - 1];
        }
        _this.setData({ foods: res.data, activeFoods, selected: arr, arrLen })
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