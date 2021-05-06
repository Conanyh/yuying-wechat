// pages/login/phone/phone.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 验证授权， 接口对接好删除
    wx.getSetting({
      success: function (res) {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              // 用户已经授权过
              wx.switchTab({
                url: '/pages/main/main',
              })
            }
          })
        }
      }
    })
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

  getPhoneNumber: function (e) {
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: app.globalData.host + 'user/getPhone',
            data: {
              'encryptedData': encodeURIComponent(e.detail.encryptedData),
              'iv': e.detail.iv,
              'code': res.code
            },
            method: 'GET',
            header: {
              'content-type':'application/json'
            },
            success: function (res) {
              console.log(res)
              if (res.status == 200) {
                // ...
              }
            },
            fail: function (err) {
              console.log(err)
            }
          })
        }
      }
    })
  }
})