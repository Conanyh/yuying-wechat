// pages/info/info.js
import WxValidate from '../../utils/WxValidate.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: ['男', '女'],
    gender: 0,
    ageArr: ['20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '35', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50'],
    age: 0,
    age_name: '',
    name: '',
    phone: '',
    department_index: 0,
    department: [],
    department_id: '',
    department_name: '',
    post_index: 0,
    post: [],
    post_id: '',
    post_name: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options)
    var that = this;

    that.setData({
      name: options.name,
      phone: options.phone,
      age_name: options.age,
      department_name: options.department_name,
      post_name: options.post_name,
    })

    that.initValidate(); // 表单验证

    that.getDepartment(); // 获取部门
    that.getPost(); // 获取职务
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

  bindPickerChange: function (e) {
    console.log('picker发生选择改变', e)
  },

  bindPickerChangeSex: function (e) {
    var that = this;
    console.log(e);
    that.setData({
      gender: e.detail.value
    })
  },

  bindPickerChangeAge: function (e) {
    var that = this;
    that.setData({
      age: e.detail.value,
      age_name: that.data.ageArr[e.detail.value]
    })
  },

  bindPickerChangeDepartment: function (e) {
    console.log(e.detail.value)
    var that = this;
    that.setData({
      department_index: e.detail.value,
      department_name: that.data.department[e.detail.value].name
    })
  },

  bindPickerChangePost: function (e) {
    console.log(e)
    var that = this;
    that.setData({
      post_index: e.detail.value,
      post_name: that.data.post[e.detail.value].name
    })
  },

  // 清除对应输入框
  clearInput: function (e) {
    console.log(e)
    var that = this;
    var tip = e.currentTarget.dataset.tip;
    if (tip == "name") {
      that.setData({
        name: ''
      })
    } else if (tip == "phone") {
      that.setData({
        phone: ''
      })
    } else if (tip == "department") {
      that.setData({
        department: ''
      })
    } else if (tip == "post") {
      that.setData({
        post: ''
      })
    }

  },

  // 显示错误Toast框
  showToast(error) {
    wx.showToast({
      title: error.msg,
      icon: 'none'
    })
  },

  // 初始化验证
  initValidate() {
    const rules = {
      name: {
        required: true,
        minlength: 2
      },
      phone: {
        required: true,
        tel: true
      },
      // department: {
      //   required: true,
      //   minlength: 2
      // },
      // post: {
      //   required: true,
      //   minlength: 2
      // }
    }
    const messages = {
      name: {
        required: '请填写姓名',
        minlength:'请输入正确的名称'
      },
      phone: {
        required:'请填写手机号',
        tel:'请填写正确的手机号'
      },
      // department: {
      //   required:'请填写部门',
      //   minlength:'请填写正确的部门'
      // },
      // post: {
      //   required:'请填写部门',
      //   minlength:'请填写正确的部门'
      // }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },

  // 表单提交
  formSubmit: function (e) {
    var that = this;
    console.log(that.data.post_index) // 职务数组index
    console.log(that.data.post[that.data.post_index].id)  // 职务id
    console.log('form发生了submit事件，携带的数据为：', e.detail.value)
    const params = e.detail.value

    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showToast(error)
      return false
    }

    // 提交表单接口逻辑
    var openid = wx.getStorageSync('openid');
    console.log(openid);
    var realname = e.detail.value.name;
    var age = e.detail.value.age
    var mobile = e.detail.value.phone;
    var gender = e.detail.value.gender == '男' ? '1' : '0';
    var department_id = that.data.department[that.data.department_index].id;
    var department_position_id = that.data.post[that.data.post_index].id;

    wx.request({
      url: app.globalData.host + '/user/update',
      data: {
        openid: openid,
        realname: realname,
        age: age,
        mobile: mobile,
        gender: gender,
        department_id: department_id,
        department_position_id: department_position_id
      },
      method: 'POST',
      header: {
        "Content-type": 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.code) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          setTimeout(function() {
            wx.switchTab({
              url: '/pages/mine/mine',
            })
          }, 2000)
        }
      }
    })

    return false;
    this.showToast({
      msg: '提交成功'
    })
  },

  // 部门信息
  getDepartment: function () {
    var that = this;
    wx.request({
      url: app.globalData.host +  '/department/getDepartment',
      method: 'GET',
      header: {
        "Content-type": "application/json"
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          department: res.data.data
        })

      }
    })
  },

  // 职务信息
  getPost: function () {
    var that = this;
    wx.request({
      url: app.globalData.host +  '/department/getPosition',
      data: {
        id: 1
      },
      method: 'GET',
      header: {
        "Content-type": "application/json"
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          post: res.data.data
        })

      }
    })
  }

})
