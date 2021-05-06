// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    // wx.getSetting({
    //   success: function (res) {
    //     console.log(res)
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console.log(res)
    //           // 用户已经授权过
    //           wx.switchTab({
    //             url: '/pages/main/main',
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
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

  bindGetUserInfo: function (e) {
    console.log(e)
    if (e.detail.userInfo) {
      // wx.navigateTo({
      //   url: '/pages/login/phone/phone',
      // })
      // return false;

      // 用户按了允许授权按钮
      wx.login({
        success: function (res) {
          wx.request({
            url: app.globalData.host + 'user/getOpenId',
            data: {
              code: res.code
            },
            success: function (res) {
              console.log(res)
              if (res.data.code === 1) {
                wx.setStorage({
                  data: res.data.data,
                  key: 'openid',
                })

                wx.navigateTo({
                  url: '/pages/login/phone/phone',
                })
              }
            }
          })
        }
      })
    } else {
      // 用户拒绝授权
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  }
})