
// const apiUrl = 'https://check.dhydwh.top/api/';
const apiUrl = 'http://check.lo/api/';

export const http = {
  POST: (url, params, type = 1) => {
    return new Promise(function (resolve, reject) {
      wx.showLoading({
        title: "正在加载中...",
      })
      wx.request({
        url: apiUrl + url,
        data: params,
        header: {
          'content-type': type === 1 ? 'application/x-www-form-urlencoded' : 'application/json', // 默认值
        },
        method: 'POST',
        success: (res) => {
          if (res.statusCode === 200) {
            wx.hideLoading();
            resolve(res.data);
          } else {
            reject(res.data)
          }
        },
        fail: function (err) {
          reject(err);
        }
      })
    })
  },

  GET: (url, params) => {
    return new Promise(function (resolve, reject) {
      wx.request({
        url: apiUrl + url,
        data: params,
        header: {'content-type': 'application/x-www-form-urlencoded'},
        method: 'GET',
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            reject(res.data.error);
          }
        },
        fail: function (err) {
          reject(err)
        }
      })
    })
  }
}
