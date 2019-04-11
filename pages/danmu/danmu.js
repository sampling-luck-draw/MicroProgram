// pages/danmu/danmu.js
function send_danmu(text) {
  if (text === "")
    return;
  console.log(text);
  return;
  wx.request({
    'url': 'https://sampling.alphamj.cn/xcx/sanddanmu',
    'method': 'POST',
    'data': {
      'openid': app.globalData.userLoginInfo.openid,
      'danmu': text
    },
    complete: function (e) {
      console.log('send danmu result')
      console.log(e);
    }
  });
}
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  handle_send_button: function (e) {
    // console.log(e);
    send_danmu(e.detail.value.danmu_input);
    this.setData({
      danmu_text: ""
    });
  },
  handle_send_keyboard(e) {
    // console.log(e);
    send_danmu(e.detail.value);
    this.setData({
      danmu_text: ""
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})