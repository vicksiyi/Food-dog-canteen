// pages/report/index.js
var wxCharts = require("../../utils/wxcharts.js");
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '选择日期',
    text: "年",
    //picker的日期范围
    start: '',
    end: '',
    //用户选择的日期
    userDate: '',
    textArray: ['年', '月', '日'],
    textIndex: 0,
    imageWidth: 0,
    active: 0,
    asides: ["早餐", "中餐", "晚餐", "其他餐"],
    foods: [],
    activeFoods: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  onChange(event) {
    let { asides, foods } = this.data;
    let activeFoods = foods.filter(value => value.type == asides[event.detail.index]);
    let data = {};
    data.xData = activeFoods.map(value => value.date);
    data.series = activeFoods.map(value => value.foods.foods.map(value => value.heat).reduce((total, num) => {
      return parseInt(total) + parseInt(num);
    }));
    this.updateChart(data);
    this.setData({ active: event.detail.index, activeFoods });
  },
  //选择日期
  selectDate(e) {
    let currentDate = e.detail.value;
    let { textIndex } = this.data;
    let date = null;
    if (textIndex === 0) {
      date = currentDate.split("-")[0]
    } else if (textIndex === 1) {
      date = currentDate.split("-")[0] + '-' + currentDate.split("-")[1]
    } else {
      date = currentDate;
    }
    this.getData(date);
    this.setData({
      userDate: currentDate, date
    })
  },
  //切换年月日
  toggle() {
    let length = this.data.textArray.length;
    if (this.data.textIndex === length - 1) {
      this.data.textIndex = 0;
    } else {
      this.data.textIndex++;
    }
    this.setData({
      text: this.data.textArray[this.data.textIndex]
    })
    if (!this.data.userDate) return;
    let date = null;
    if (this.data.textIndex === 0) {
      date = this.data.userDate.split("-")[0]
    } else if (this.data.textIndex === 1) {
      date = this.data.userDate.split("-")[0] + '-' + this.data.userDate.split("-")[1]
    } else {
      date = this.data.userDate;
    }
    this.getData(date);
    this.setData({ date })
  },
  updateChart(data) {
    new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      categories: data.xData,
      series: [{
        name: '热量',
        data: data.series
      }],
      yAxis: {
        format: function (val) {
          return val + 'Kgal';
        },
        /*max:400,
        min:0*/
      },
      width: 370,
      height: 200
    });
  },
  getData(date) {
    let _this = this;
    let { active, asides } = this.data;
    wx.showLoading({ title: '获取数据', mask: true })
    db.collection('plans').where({
      date: db.RegExp({
        regexp: date,
        option: 'i'
      })
    }).get({
      success: function (res) {
        let activeFoods = res.data.filter(value => value.type == asides[active]);
        let data = {};
        data.xData = activeFoods.map(value => value.date);
        data.series = activeFoods.map(value => value.foods.foods.map(value => value.heat).reduce((total, num) => {
          return parseInt(total) + parseInt(num);
        }));
        _this.updateChart(data);
        _this.setData({ foods: res.data, activeFoods })
      },
      complete() {
        wx.hideLoading()
      }
    })
  }
})