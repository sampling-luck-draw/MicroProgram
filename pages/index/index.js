//index.js
//获取应用实例
const app = getApp();

function join(userInfo, userLoginInfo) {
  let data = Object.assign(userInfo, userLoginInfo);
  console.log(data);
  wx.request({
    url: 'https://sampling.alphamj.cn/xcx/join',
    method: 'POST',
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    }, 
    data: data,
    fail: function (c) {
      console.log(c);
    }
  })
}

Page({
  data: {
    motto: '三百两弹幕抽奖系统',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    danmu_text: "才哥"
  },
  send_danmu: function(e) {
    //console.log(app.globalData.userLoginInfo);
    wx.request({
      'url': 'https://sampling.alphamj.cn/wx/senddanmu', 
      'method': 'GET',
      'data': {
        'uname': this.data.userInfo.nickName,
        'danmu': this.data.danmu_text
      }
    });
    this.setData({
      danmu_text: ""
    });
  },
  onLoad: function () {
    if (app.globalData.userInfo) {  
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
      join(this.data.userInfo, app.globalData.userLoginInfo);
      //console.log(app.globalData.userInfo);
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        join(this.data.userInfo, app.globalData.userLoginInfo);
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
          })
          join(this.data.userInfo, app.globalData.userLoginInfo);
        }
      });
    }

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

})
