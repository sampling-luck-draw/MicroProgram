//index.js
//获取应用实例
const app = getApp();

function join(userInfo) {
  // 用code换取openid
  wx.request({
    url: 'https://sampling.alphamj.cn/xcx/login',
    method: 'POST',
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: {
      'code': app.globalData.code
    },
    complete: res => {
      console.log('login result')
      console.log(res);
      app.globalData.userLoginInfo = res.data;

      let data = Object.assign(userInfo, app.globalData.userLoginInfo);
      // 将个人信息发送到服务器
      wx.request({
        url: 'https://sampling.alphamj.cn/xcx/join',
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: data,
        complete: function (c) {
          console.log('join result')
          console.log(c);
        }
      })
    }
  });
}

Page({
  data: {
    motto: '三百两弹幕抽奖系统',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    danmu_text: "才哥"
  },
  send_danmu: function (e) {
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
  onLoad: function (query) {
    console.log(query);
    let sence = decodeURIComponent(query.scene);
    console.log(sence);
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

})
