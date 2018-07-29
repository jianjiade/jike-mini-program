//index.js
//获取应用实例
import drawQrcode from '../../utils/weapp.qrcode.min.js';
const util = require('../../utils/util.js')
const app = getApp()
let timer = '';
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    try {
      var value = wx.getStorageSync('auth-token')
      if (value) {
        console.log(value);
        wx.navigateTo({
          url: '../../pages/profile/profile'
        })
        return false;
      }
    } catch (e) {
      // Do something when catch error
    }


    let url = 'https://app.jike.ruguoapp.com/sessions.create';
    util.wxRequest(url,{},(res)=>{
      console.log(res);
      let uuid = res.data.uuid;
      this.drawQR(uuid);
    },function(e){
      console.log(e);
    });
  },
  drawQR:function(uuid='jike'){
    let url = encodeURIComponent('https://ruguoapp.com/account/scan?uuid=' + uuid);
    let qrOrignCode = "jike://page.jk/web?url=" + url + "&displayHeader=false&displayFooter=false"
    drawQrcode({
      width: 200,
      height: 200,
      canvasId: 'myQrcode',
      text: qrOrignCode,
      callback:()=> {
        this.waitForLogin(uuid);
      }
    });
  },
  waitForLogin:function(uuid){
    let url = 'https://app.jike.ruguoapp.com/sessions.wait_for_login';
    util.wxRequest(url,{uuid:uuid},(res)=>{
      this.waitForConfirmation(uuid);
    },(e)=>{

    });

  },
  waitForConfirmation:function(uuid){
    let url = 'https://app.jike.ruguoapp.com/sessions.wait_for_confirmation';
    util.wxRequest(url,{uuid:uuid},(res)=>{
  
    if(res.data.confirmed){
      this.saveToken(res.data.token);
    }
    },(e)=>{
    
    })
  },
  saveToken:function(token){
    wx.setStorage({
      key: "auth-token",
      data: token,
      success:()=>{
        console.log('save done');
      }
    })
  }
})
