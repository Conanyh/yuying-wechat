// pages/main/main.js
import { http } from "../../utils/request";

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    clientHeight: 0,
    // tab切换
    currentTab: 0,
    work: [],
    worklist: [],
    openid: ''
  },

  selected: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    if (index == 0) {
      that.setData({
        // selected: 0
        currentTab: 0
      })
    } else {
      that.setData({
        // selected: 1
        currentTab: 1
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: (result) => {
        that.setData({
          clientHeight: result.windowHeight-40
        })
      },
    })

  },

  bindChange: function(e) {
    const that = this;
    console.log(e.type)
    if (e.type == "tap") {
      console.log(1111)
      return
    }
    let cur = e.detail.current
    that.setData({
      currentTab:cur
    });
    console.log(111)
    that.getCheck(cur)
  },

  swichNav: function(e) {
    let cur = e.currentTarget.dataset.current
    const that = this;
    if (this.data.currentTab === cur) {
      return false;
    } else {
      that.setData({
        currentTab: cur
      })
    }
    this.getCheck(cur)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCheck(this.data.currentTab);
    var openid = wx.getStorageSync('openid')
    console.log(openid)
    this.setData({
      openid: openid
    })
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  join (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/join/join?id=' + id,
    })
  },

  detail (e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id,
    })
  },

  comment: function () {
    wx.navigateTo({
      url: '/pages/comment/comment',
    })
  },

  // 获取待评分考核列表
  getCheck: function (cur = 0) {
    const that = this;
    let openid = wx.getStorageSync('openid')
    let params =  {openid}
    if (cur > 0) {
      params.status = 1
    }
    http.GET('check/get', params).then(res => {
      this.setData({
        worklist: res.data
      })
    })
  }
})
