export function tips(content = '提示', icon = 'none') {
  wx.showToast({
    title: content,
    icon: icon,
    duration: 2000
  })
}

export function pageTo(page, isTabbar = false) {
  if (isTabbar) {
    wx.switchTab({
      url: page
    })
  } else {
    wx.navigateTo({
      url: page
    })
  }
}
export function tipAndBack (content = '提示', delta = 1)  {
  tips(content)
  setTimeout(function () {
    wx.navigateBack({
      delta: delta
    })
  }, 2000)
}

