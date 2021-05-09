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
    questionList: [],
    checkTitle: {},
    userInfo: {},

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
    const that = this;
    wx.getSystemInfo({
      success: (result) => {
        that.setData({
          height: result.statusBarHeight + 10
        })
      },
    })
    if (!options.id || typeof options.id === 'undefined') {
      tips('文件不存在')
    }

    this.initPageData(options.id)
  },

  initPageData(id){
    let openid = wx.getStorageSync('openid')
    http.GET('check/view',{id,openid}).then(res=>{
      this.setData({
        userInfo: res.data.user,
        questionList: res.data.questionList,
        checkTitle: res.data.checkTitle,
      })
      console.log(res)
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
    const that = this;
    let parentIndex = e.currentTarget.dataset.parent
    let index = e.currentTarget.dataset.index;
    let questionList = that.data.questionList
    if (questionList[parentIndex].checkCaptionItem[index].self_score - 1 < 0) {
      return
    }
    if (questionList[parentIndex].checkCaptionItem[index].self_score - 1 === 0) {
      questionList[parentIndex].checkCaptionItem[index].minusStatus = 'disabled'
    }
    questionList[parentIndex].checkCaptionItem[index].self_score -= 1
    questionList[parentIndex].checkCaptionItem[index].maxStatus = 'normal'

    that.setData({
      questionList,
    })
  },

  // 加
  add: function (e) {
    const that = this;
    let parentIndex = e.currentTarget.dataset.parent
    let index = e.currentTarget.dataset.index;
    let questionList = that.data.questionList
    if (questionList[parentIndex].checkCaptionItem[index].self_score + 1 > questionList[parentIndex].checkCaptionItem[index].score) {
      return
    }
    if (questionList[parentIndex].checkCaptionItem[index].self_score + 1 === questionList[parentIndex].checkCaptionItem[index].score) {
      questionList[parentIndex].checkCaptionItem[index].maxStatus = 'disabled'
    }
    questionList[parentIndex].checkCaptionItem[index].self_score += 1
    questionList[parentIndex].checkCaptionItem[index].minusStatus = 'normal'
    that.setData({
      questionList,
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
    const that = this;
    console.log(e)
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
    let openid = wx.getStorageSync('openid')
    let originData = this.data.questionList
    let postData = {};
    let arrData = []
    for (let index in originData) {
      for (let idx in originData[index].checkCaptionItem) {
        let localData = {}
        localData.id = originData[index].checkCaptionItem[idx].id
        localData.score = originData[index].checkCaptionItem[idx].self_score
        localData.name = originData[index].checkCaptionItem[idx].name
        arrData.push(localData)
      }
    }
    postData.check_id = this.data.checkTitle.id
    postData.openid = openid
    postData.item = arrData
    http.POST('check/addSelf', postData, 2).then(res => {
      if (res.code === 1) {
        tips('提交成功')
      } else {
        tips(res.msg)
      }
    })
  }
})
