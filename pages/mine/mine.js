// pages/mine/mine.js
import { http } from "../../utils/request";
import { pageTo, tips } from "../../utils/common";

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
    userInfos: [],
    user: {
      avatarUrl: "",
      nickName: ""
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
          height: result.statusBarHeight + 10
        })
      },
    })


    wx.getUserInfo({
      success: function(res) {
        var avatarUrl = 'user.avatarUrl';
        var nickName = 'user.nickName';
        that.setData({
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]: res.userInfo.nickName,
        })
      }
    })

    // that.getUserInfo(); // 获取用户信息
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;

    that.getUserInfo();
  },

  /**
   * 跳转个人资料
   */
  goToInfo: function() {
    var that = this;
    let userInfo = that.data.userInfo
    var name = userInfo ? userInfo.realname : '';
    var phone = userInfo ? userInfo.mobile : '';
    var gender = userInfo ? userInfo.gender : '';
    var age = userInfo ? userInfo.age : '';
    var department_name = userInfo ? userInfo.department.name : '';
    var post_name = userInfo ? userInfo.departmentposition.name : '';
    var department_name_id = userInfo ? userInfo.department_id : '';
    var post_name_id = userInfo ? userInfo.department_position_id : '';
    wx.navigateTo({
      url: '/pages/info/info?name=' + name + '&phone=' + phone + '&gender=' + gender + '&age=' + age + '&department_name=' + department_name + '&post_name=' + post_name + '&department_name_id=' + department_name_id + '&post_name_id=' + post_name_id,
    })
  },

  /**
   * 跳转我的综合评分
   */
  goToScore: function() {
    wx.navigateTo({
      url: '/pages/score/score',
    })
  },

  /**
   * 跳转部门员工列表
   */
  goToStaff: function() {
    wx.navigateTo({
      url: '/pages/staff/staff',
    })
  },

  /**
   * 员工考核记录
   */
  goToRecord: function() {
    wx.navigateTo({
      url: '/pages/record/record',
    })
  },

  goLogin: function () {
    let openid = wx.getStorageSync('openid')
    if (!openid) {
      pageTo('/pages/login/login')
    }
  },

  // 获取用户信息
  getUserInfo: function() {
    let openid = wx.getStorageSync('openid')
    if (openid) {
      http.GET('user/getUserInfo', {openid}).then(res => {
        if (!res.data) {
          tips('请完善个人信息');
          return
        }
        wx.setStorageSync('userInfo', res.data)
        this.setData({
          userInfo: res.data
        })
      })
    } else {
      pageTo('/pages/login/login')
    }
  }

})
