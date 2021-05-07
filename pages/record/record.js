// pages/record/record.js
const app = getApp()
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
    worklist: {},
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

    that.getRecord();   // 考核列表
  },

  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },

  swichNav: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
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

  detail: function () {
    wx.navigateTo({
      url: '/pages/detail/detail',
    })
  },

  comment: function () {
    wx.navigateTo({
      url: '/pages/comment/comment',
    })
  },

  // 获取考核记录列表
  getRecord: function () {
    var that = this;
    var openid = wx.getStorageSync('openid');
    var user_id = wx.getStorageSync('userInfo').id;

    wx.request({
      url: app.globalData.host + 'assessment/get',
      data: {
        user_id: user_id
      },
      method: 'GET',
      header: {
        "Content-type": "application/json"
      },
      success: function (res) {
        if (res.data.code) {
          // 
        }
      }
    })
  }

})