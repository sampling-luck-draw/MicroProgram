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

function send_danmu(text) {
  if (text === "")
    return;
  console.log(text);
  return ;
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
  data: {
    motto: '三百两弹幕抽奖系统',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    danmu_text: ""
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
