// pages/score/score.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.getScore()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  detail: function () {
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },

  getScore: function () {
    var that = this;
    var openid = wx.getStorageSync('openid');
    console.log(openid)
    wx.request({
      url: app.globalData.host + '/user/getMyGrade',
      data: {
        openid: openid
      },
      method: "GET",
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res)
        if (res.data.code) {
          that.setData({
            list: res.data.data
          })
        }
      }
    })
  }
})