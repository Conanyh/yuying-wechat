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
      item_one:[
        {
          id:1,
          title:"责任心",
          name: 'one1',
          self_score: '4',
          num:1,
          leader_score: '4',
          score: 4
        },
        {
          id: 2,
          title: "积极性",
          name: 'one2',
          self_score: '4',
          num: 1,
          leader_score: '4',
          score: 4
        },
        {
          id: 3,
          title: "沟通能力",
          name: 'one3',
          self_score: '4',
          num: 1,
          leader_score: '4',
          score: 4
        },
        {
          id: 4,
          title: "协作精神",
          name: 'one4',
          self_score: '4',
          num: 1,
          leader_score: '4',
          score: 4
        },
        {
          id: 5,
          title: "制度遵守",
          name: 'one5',
          self_score: '4',
          num: 1,
          leader_score: '4',
          score: 4
        },
      ],
      item_two:[
        {
          id:1,
          title:"creams数据",
          name: 'two1',
          self_score: '4',
          num:1,
          leader_score: '4',
          score: 15
        },
        {
          id: 2,
          title: "工资核算及发放",
          name: 'two2',
          self_score: '4',
          num: 1,
          leader_score: '4',
          score: 15
        },
        {
          id: 3,
          title: "收付款",
          name: 'two3',
          self_score: '4',
          num: 1,
          leader_score: '4',
          score: 15
        },
        {
          id: 4,
          title: "报销审核",
          name: 'two4',
          self_score: '4',
          num: 1,
          leader_score: '4',
          score: 15
        },
        {
          id: 5,
          title: "单据管理",
          name: 'two5',
          self_score: '4',
          num: 1,
          leader_score: '4',
          score: 10
        },
        {
          id: 6,
          title: "资金管理",
          name: 'two6',
          self_score: '4',
          num: 1,
          leader_score: '4',
          score: 10
        }
      ],
      comment: 'comment详情'
    }
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