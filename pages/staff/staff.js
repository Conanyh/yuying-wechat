// pages/staff/staff.js
import { http } from "../../utils/request";

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStaff()
  },



  // 获取员工列表
  getStaff: function () {
    const that = this;
    let openid = wx.getStorageSync('openid');
    http.GET('department/get', {openid}).then(res => {
      this.setData({
        list: res.data
      })
    })
  }
})
