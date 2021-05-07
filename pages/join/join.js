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

    list: {
      userInfo: [],
      item_one:[
        {
          id:1,
          title:"责任心",
          name: 'one1',
          num:1,
          score: 4,
          minusStatus: 'disabled'
        },
        {
          id: 2,
          title: "积极性",
          name: 'one2',
          num: 1,
          score: 4,
          minusStatus: 'disabled'
        },
        {
          id: 3,
          title: "沟通能力",
          name: 'one3',
          num: 1,
          score: 4,
          minusStatus: 'disabled'
        },
        {
          id: 4,
          title: "协作精神",
          name: 'one4',
          num: 1,
          score: 4,
          minusStatus: 'disabled'
        },
        {
          id: 5,
          title: "制度遵守",
          name: 'one5',
          num: 1,
          score: 4,
          minusStatus: 'disabled'
        },
      ],
      item_two:[
        {
          id:1,
          title:"creams数据",
          name: 'two1',
          num:1,
          score: 15,
          minusStatus: 'disabled'
        },
        {
          id: 2,
          title: "工资核算及发放",
          name: 'two2',
          num: 1,
          score: 15,
          minusStatus: 'disabled'
        },
        {
          id: 3,
          title: "收付款",
          name: 'two3',
          num: 1,
          score: 15,
          minusStatus: 'disabled'
        },
        {
          id: 4,
          title: "报销审核",
          name: 'two4',
          num: 1,
          score: 15,
          minusStatus: 'disabled'
        },
        {
          id: 5,
          title: "单据管理",
          name: 'two5',
          num: 1,
          score: 10,
          minusStatus: 'disabled'
        },
        {
          id: 6,
          title: "资金管理",
          name: 'two6',
          num: 1,
          score: 10,
          minusStatus: 'disabled'
        }
      ],
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

  // 减
  sub: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    let item_one = that.data.list.item_one;
    let num = item_one[index].num;
    var item = "list.item_one";
    if (num < 3) {
      var minusStatus = 'disabled';
      item_one[index].minusStatus = minusStatus;
      that.setData({
        [item]: item_one
      })
    }
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    item_one[index].num = num
    that.setData({
      [item]: item_one,
    })
  },

  // 加
  add: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    let item_one = that.data.list.item_one;
    let num = item_one[index].num;
    num = num + 1;
    if (num > item_one[index].score) {
      num = item_one[index].score
    }
    var minusStatus = 'normal';
    item_one[index].minusStatus = minusStatus;
    item_one[index].num = num;
    var item = "list.item_one";
    that.setData({
      [item] : item_one
    })
  },

  // 减
  sub2: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    let item_two = that.data.list.item_two;
    var item = "list.item_two";
    let num = item_two[index].num;
    if (num < 3) {
      var minusStatus = 'disabled';
      item_two[index].minusStatus = minusStatus;
      that.setData({
        [item]: item_two
      })
    }
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    item_two[index].num = num
    that.setData({
      [item]: item_two,
    })
  },

  // 加
  add2: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    let item_two = that.data.list.item_two;
    var item = "list.item_two";
    let num = item_two[index].num;
    num = num + 1;
    if (num > item_two[index].score) {
      num = item_two[index].score
    }
    var minusStatus = 'normal';
    item_two[index].minusStatus = minusStatus;
    item_two[index].num = num;
    that.setData({
      [item]: item_two,
    })
  },

  goback: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  formSubmit: function (e) {
    console.log(e)
  }
})