// pages/record/record.js
import { http } from "../../utils/request";

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
    checkList: [],
    navData: [
      {
        key: 0,
        name: '已完成',
      },
      {
        key: 1,
        name: '待评价',
      },
    ]

  },

  selected: function(e) {
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
  onLoad: function(options) {
    var that = this;
    wx.getSystemInfo({
      success: (result) => {
        that.setData({
          clientHeight: result.windowHeight - 40
        })
      },
    })

    that.getRecord();   // 考核列表
  },

  bindChange: function(e) {
    const that = this;
    let cur = e.detail.current
    that.getRecord(cur)
    that.setData({
      currentTab: e.detail.current
    });
  },

  swichNav: function(e) {
    if (e.type === 'change') {
      return
    }
    const that = this;
    let cur = e.currentTarget.dataset.current
    if (that.data.currentTab === cur) {
      return false;
    } else {
      that.getRecord(cur)
      that.setData({
        currentTab: cur
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  detail(e) {
    console.log(e)
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/check-detail/check-detail?id=' + id,
    })
  },

  comment: function() {
    wx.navigateTo({
      url: '/pages/comment/comment',
    })
  },

  // 获取考核记录列表
  getRecord: function(cur = 0) {
    let openid = wx.getStorageSync('openid');
    let params = {openid}
    if (cur > 0) {
      params.status = 1
    }
    const _this =this
    http.GET('assessment/get', params).then(res => {
      this.setData({
        checkList: res.data
      })
    })
  },

})
