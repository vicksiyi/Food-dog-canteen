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
        color: "#EF81B6"
      },
      {
        title: "消费记录",
        icon: "../../images/icon/2.png",
        color: "#04E474"
      },
      {
        title: "热量查询",
        icon: "../../images/icon/3.png",
        color: "#FCA705"
      },
      {
        title: "健康报告",
        icon: "../../images/icon/4.png",
        color: "#94EC94"
      }
    ]
  },
});
