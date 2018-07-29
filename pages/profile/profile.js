const util = require('../../utils/util.js');

Page({
  data: {
    profile: {}
  },
  onLoad: function () {
    var token = wx.getStorageSync('auth-token');
    let url = 'https://app.jike.ruguoapp.com/1.0/users/profile';
    util.wxRequest(url,{},(res)=>{
      console.log(res);
      this.setData({
        profile:res.data.user
      })
    },()=>{

    });
  }
})