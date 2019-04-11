//index.js
//获取应用实例
const app = getApp();

function join(userInfo) {
  // 用code换取openid
  console.log(userInfo);
  let data = Object.assign(userInfo, { 'code': app.globalData.code });
  wx.request({
    url: 'https://sampling.alphamj.cn/xcx/login',
    method: 'POST',
    data: data,
    complete: res => {
      console.log('login result')
      console.log(res);
      app.globalData.userLoginInfo = res.data;
    }
  });
}



Page({
  data: {
    motto: '三百两弹幕抽奖系统',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    danmu_text: ""
  },
  
  /**
   * 进入房间跳转
   */
  goRoom:function(){
    wx.redirectTo({
      url: '../room/room',
    })
  },
  /**
   * 进入弹幕
   */
  goDanmu: function () {
    wx.redirectTo({
      url: '../danmu/danmu',
    })
  },
  onLoad: function (query) {
    console.log("111111");
    console.log(app.globalData.userInfo);
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
      console.log('join 1')
      join(this.data.userInfo);

    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        console.log('join 2')
        join(this.data.userInfo);
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
          join(this.data.userInfo);
        }
      });
    }
    if (query.scene) {
      console.log("has scene");
      var scene = decodeURIComponent(query.scene);
      console.log("scene is ", scene);
      var arrPara = scene.split("&");
      var arr = [];
      for (var i in arrPara) {
        arr = arrPara[i].split("=");
        wx.setStorageSync(arr[0], arr[1]);
        console.log("setStorageSync:", arr[0], "=", arr[1]);
      }
    } else {
      console.log("no scene");
    }

  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
    console.log('join 4')
    join(this.data.userInfo, app.globalData.userLoginInfo);
  },
  /**
   * 扫描二维码
   */
  click: function (option) {
    var that = this;
    var show;
    let qrId;
    wx.scanCode({
      success: (res) => {
        console.log(option)
        if (option.scene) {
          qrId = decodeURIComponent(option.scene),
          console.log(qrId);};
          
        this.show = "结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path;
        that.setData({
          show: this.show
        })
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '失败',
          icon: 'success',
          duration: 2000
        })
      },
      complete: (res) => {
      }
    })
  }

})
