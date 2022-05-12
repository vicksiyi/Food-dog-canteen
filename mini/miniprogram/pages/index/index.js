// index.js
// const app = getApp()
Page({
  data: {
    indicatorDots: true,
    vertical: false,
    interval: 2000,
    duration: 500,
    background: ["cloud://cloud1-6gyk321306fd5b0f.636c-cloud1-6gyk321306fd5b0f-1311839739/bg1.jpg", "cloud://cloud1-6gyk321306fd5b0f.636c-cloud1-6gyk321306fd5b0f-1311839739/bg2.jpg"],
    tools: [
      {
        title: "今日菜谱",
        icon: "../../images/icon/1.png",
        color: "#EF81B6",
        path: "../menu/index"
      },
      {
        title: "今日点菜",
        icon: "../../images/icon/5.png",
        color: "#5cadff",
        path: "../order/index"
      },
      {
        title: "消费记录",
        icon: "../../images/icon/2.png",
        color: "#04E474",
        path: "../recordLog/index"
      },
      {
        title: "热量查询",
        icon: "../../images/icon/3.png",
        color: "#FCA705",
        path: "../search/index"
      },
      {
        title: "健康报告",
        icon: "../../images/icon/4.png",
        color: "#94EC94",
        path: "../report/index"
      },
      {
        title: "今日计划",
        icon: "../../images/icon/6.png",
        color: "#E8E071",
        path: "../today/index"
      },
      {
        title: "我的菜品",
        icon: "../../images/icon/7.png",
        color: "#E5C280",
        path: "../mineFoods/index"
      }
    ]
  },
  nav(e) {
    const path = e.currentTarget.dataset.path;
    wx.navigateTo({
      url: path
    })
  }
});
