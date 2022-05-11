// pages/report/index.js
var wxCharts = require("../../utils/wxcharts.js");
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
    active: 1,
    asides: ["早餐", "中餐", "晚餐", "其他餐"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      series: [{
        name: '热量',
        data: [15, 14, 13.03, 15.4, 15.8, 12, 15.08, 15, 15, 15.09, 15.8, 13.202]
      }],
      yAxis: {
        format: function (val) {
          return val + '千';
        },
        /*max:400,
        min:0*/
      },
      width: 370,
      height: 200
    });
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
    this.setData({ date })
  }
})