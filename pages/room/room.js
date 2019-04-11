const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var arr = [];
    if (options.scene) {
      console.log("has scene");
      var scene = decodeURIComponent(options.scene);
      console.log("scene is ", scene);
      var arrPara = scene.split("&");

      for (var i in arrPara) {
        arr = arrPara[i].split("=");
        wx.setStorageSync(arr[0], arr[1]);
        console.log("setStorageSync:", arr[0], "=", arr[1]);
      }
      
    } else {
      console.log("no scene");
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
      console.log('join 1')
      console.log(this.data.userInfo);
      console.log(app.globalData.code);
      let data = Object.assign(this.data.userInfo, { 'code': app.globalData.code, 'activity_id': arr[1] });
      wx.request({
        url: 'https://sampling.alphamj.cn/xcx/login',
        method: 'POST',
        data: data,
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          console.log(res.data)
        },
      })

    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        console.log('join 2')
        console.log(this.data.userInfo);
        console.log(app.globalData.code);
        let data = Object.assign(this.data.userInfo, { 'code': app.globalData.code, 'activity_id': arr[1] });
        wx.request({
          url: 'https://sampling.alphamj.cn/xcx/login',
          method: 'POST',
          data: data,
          header: {
            'content-type': 'application/json'
          },
          success(res) {
            console.log(res.data)
          },
        })
        //console.log(res);
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
          console.log('join 3')
          console.log(this.data.userInfo);
          console.log(app.globalData.code);
          let data = Object.assign(this.data.userInfo, { 'code': app.globalData.code, 'activity_id': arr[1] });
          wx.request({
            url: 'https://sampling.alphamj.cn/xcx/login',
            method: 'POST',
            data: data,
            header: {
              'content-type': 'application/json'
            },
            success(res) {
              console.log(res.data)
            },
          })
        }
      });
    }
    
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