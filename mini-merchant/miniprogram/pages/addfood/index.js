// pages/addFood/index.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: "",
    title: "",
    price: "",
    heat: "",
    desc: "",
    active: -1,
    asides: ["素菜", "荤菜", "饭后甜品"],
    show: false
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
  upload() {
    let _this = this;
    wx.chooseImage({
      count: 1,
      sourceType: ['album', 'camera'],
      success(res) {
        wx.showLoading({
          title: '上传中',
          mask: true
        })
        let url = res.tempFilePaths[0];
        let filenameArr = url.split("/");
        let filename = filenameArr[filenameArr.length - 1];
        wx.cloud.uploadFile({
          cloudPath: `food/${filename}`,
          filePath: url,
          config: { env: 'cloud1-6gyk321306fd5b0f' },
          success: res => { _this.setData({ img: res.fileID }) },
          complete() {
            wx.hideLoading()
          }
        })
      }
    })
  },
  add() {
    let _this = this;
    const { img, title, price, heat, desc, active, asides } = this.data;
    if (!img || !title || !price || !heat || !desc || active == -1) {
      wx.showToast({
        title: '字段不能为空',
        icon: 'none'
      })
      return;
    }
    wx.showLoading({
      title: '添加中',
      mask: true
    })
    db.collection('food').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        img, title, price, heat, desc, type: asides[active]
      },
      success: function (res) {
        _this.setData({
          img: "",
          title: "",
          price: "",
          heat: "",
          desc: "",
          active: -1,
        })
      },
      complete() {
        wx.showToast({
          title: '添加成功',
          icon: 'none'
        })
        wx.hideLoading()
      }
    })
  }
})