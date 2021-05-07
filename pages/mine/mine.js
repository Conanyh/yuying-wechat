// pages/mine/mine.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nvabarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      title: '标题', //导航栏 中间的标题
      white: true, // 是就显示白的，不是就显示黑的。
      address: '../../images/bg@3x.png' // 加个背景 不加就是没有
    },
    // 导航头的高度
    height: 0,
    userInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: (result) => {
        console.log(result)
        console.log(result.statusBarHeight)
        that.setData({
          height: result.statusBarHeight + 10
        })
      },
    })

    that.getUserInfo(); // 获取用户信息
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

    that.getUserInfo();
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

  /**
   * 跳转个人资料
   */
  goToInfo: function () {
    var that = this;
    var name = that.data.userInfo.realname;
    var phone = that.data.userInfo.mobile;
    var gender = that.data.userInfo.gender;
    var age = that.data.userInfo.age;
    var department_name = that.data.userInfo.department.name;
    var post_name = that.data.userInfo.departmentposition.name;
    wx.navigateTo({
      url: '/pages/info/info?name='+name+'&phone='+phone+'&gender='+gender+'&age='+age+'&department_name='+department_name+'&post_name='+post_name,
    })
  },

  /**
   * 跳转我的综合评分
   */
  goToScore: function () {
    wx.navigateTo({
      url: '/pages/score/score',
    })
  },

  /**
   * 跳转部门员工列表
   */
  goToStaff: function () {
    wx.navigateTo({
      url: '/pages/staff/staff',
    })
  },

  /**
   * 员工考核记录
   */
  goToRecord: function () {
    wx.navigateTo({
      url: '/pages/record/record',
    })
  },

  // 获取用户信息
  getUserInfo: function () {
    var that = this;
    var openid = wx.getStorageSync('openid')
    wx.request({
      url: app.globalData.host + '/user/getUserInfo',
      data: {
        openid: openid
      },
      method: 'GET',
      header: {
        "Content-type": "application/json"
      },
      success: function (res) {
        console.log(res)
        if (res.data.code) {
          that.setData({
            userInfo: res.data.data,
          })
          wx.setStorageSync('userInfo', res.data.data)
        }
      }
    })
  }

})