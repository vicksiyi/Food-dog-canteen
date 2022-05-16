// index.js
Page({
  data: {
    tools: [
      {
        title: "今日菜谱",
        icon: "../../images/1.png",
        color: "#EF81B6",
        path: "../menu/index"
      },
      {
        title: "菜谱搭配",
        icon: "../../images/5.png",
        color: "#5cadff",
        path: "../match/index"
      },
      {
        title: "上传菜品",
        icon: "../../images/3.png",
        color: "#FCA705",
        path: "../upload/index"
      }
    ]
  },
  nav(e) {
    const { path } = e.currentTarget.dataset;
    wx.navigateTo({
      url: path,
    })
  }
});
