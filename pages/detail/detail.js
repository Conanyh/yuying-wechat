import { tips } from "../../utils/common";
import { http } from "../../utils/request";

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
      address: '../../images/bg-inline.png' // 加个背景 不加就是没有
    },
    // 导航头的高度
    height: 0,
    info: {
      userInfo: [
        {
          name: '陈笑',
          deparment: '技术部',
          created_at: '2021年3月28日',
          reviewer: '朱经理',
          post: '产品经理'
        }
      ],
      comment: 'comment详情'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.getSystemInfo({
      success: (result) => {
        that.setData({
          height: result.statusBarHeight + 10
        })
      },
    })
    if (!options.id || typeof options.id === 'undefined') {
      tips('资源不存在')
      return
    }
    that.initPageData(options.id)

  },

  initPageData(id){
    let openid = wx.getStorageSync('openid')
    http.GET('assessment/view', {id, openid}).then(res => {
      if (res.code === 0) {
        tips(res.msg)
        return
      }
      this.setData({
        assessment: res.data.assessment,
        questionInfo: res.data.questionInfo,
        userInfo: res.data.user,
      })
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

  goback: function () {
    wx.navigateBack({
      delta: 1
    })
  }
})
