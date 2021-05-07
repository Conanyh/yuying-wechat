// pages/staff/staff.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {"code":"陈笑","text":"技术部","type":"产品经理"},
      {"code":"徐婷婷","text":"技术部","type":"产品经理"},
      {"code":"张雪杨","text":"技术部","type":"PHP开发"},
      {"code":"邹捷","text":"技术部","type":"前端开发"},
      {"code":"许飞","text":"技术部","type":"前端开发"},
      {"code":"李洋","text":"技术部","type":"JAVA开发"},
      {"code":"李婷","text":"技术部","type":"设计师"},
      {"code":"藤源","text":"技术部","type":"项目经理"}
    ]
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

  // 获取员工列表
  getStaff: function () {
    var that = this;
    var openid = wx.getStorageSync('openid');
    wx.request({
      url: app.globalData.host + '/department/get',
      data: {
        openid: openid
      },
      method: 'GET',
      header: {
        'Content-Type': "application/json"
      },
      success: function (res) {
        if (res.data.code) {
          that.setData({
            list: res.data.data
          })
        }
      }
    })
  }
})