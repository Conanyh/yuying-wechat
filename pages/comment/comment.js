// pages/comment/comment.js
import { http } from "../../utils/request";
import { tips } from "../../utils/common";

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
    },
    questionList: [],
    commentStr: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    if (!options.id || typeof options.id === "undefined") {
      tips('资源不存在')
    }

    this.initPageData(options.id)

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

  initPageData(id) {
    let openid = wx.getStorageSync('openid')
    http.GET('assessment/getStaffRecord', {id, openid}).then(res => {
      this.setData({
        assessment: res.data.assessment,
        questionList: res.data.questionInfo,
      })
    })
  },

  // 减
  sub: function(e) {
    const that = this;
    let parentIndex = e.currentTarget.dataset.parent
    let index = e.currentTarget.dataset.index;
    let questionList = that.data.questionList
    if (questionList[parentIndex].checkCaptionItem[index].leader_score - 1 < 0) {
      return
    }
    if (questionList[parentIndex].checkCaptionItem[index].leader_score - 1 === 0) {
      questionList[parentIndex].checkCaptionItem[index].minusStatus = 'disabled'
    }
    questionList[parentIndex].checkCaptionItem[index].leader_score -= 1
    questionList[parentIndex].checkCaptionItem[index].maxStatus = 'normal'

    that.setData({
      questionList,
    })
  },

  // 加
  add: function(e) {
    const that = this;
    let parentIndex = e.currentTarget.dataset.parent
    let index = e.currentTarget.dataset.index;
    let questionList = that.data.questionList
    if (questionList[parentIndex].checkCaptionItem[index].leader_score + 1 > questionList[parentIndex].checkCaptionItem[index].score) {
      return
    }
    if (questionList[parentIndex].checkCaptionItem[index].leader_score + 1 === questionList[parentIndex].checkCaptionItem[index].score) {
      questionList[parentIndex].checkCaptionItem[index].maxStatus = 'disabled'
    }
    questionList[parentIndex].checkCaptionItem[index].leader_score += 1
    questionList[parentIndex].checkCaptionItem[index].minusStatus = 'normal'
    that.setData({
      questionList,
    })
  },

  // 返回上一页
  goback: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  formSubmit: function(e) {
    let openid = wx.getStorageSync('openid')
    let originData = this.data.questionList
    if (this.data.commentStr === '') {
      tips('评语不可为空')
      return
    }

    let postData = {};
    let arrData = []
    for (let index in originData) {
      for (let idx in originData[index].checkCaptionItem) {
        let localData = {}
        localData.id = originData[index].checkCaptionItem[idx].item_id
        localData.score = originData[index].checkCaptionItem[idx].leader_score
        arrData.push(localData)
      }
    }
    postData.id = this.data.assessment.id
    postData.openid = openid
    postData.item = arrData
    postData.comment = this.data.commentStr
    console.log(postData)
    http.POST('assessment/addLeader', postData, 2).then(res => {
      if (res.code === 1) {
        tips('提交成功')
      } else {
        tips(res.msg)
      }
    })
  },
  getComment(e){
    let val = e.detail.value
    console.log(val)
    this.setData({
      commentStr: val
    })
  },

})
