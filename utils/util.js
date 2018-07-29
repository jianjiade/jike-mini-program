const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


const wxRequest = (url,data={},resolve,reject) => {
  var token = wx.getStorageSync('auth-token');
  let header = {
    authority: 'app.jike.ruguoapp.com',
    method: 'GET',
    scheme: 'https',
    accept: 'application/json',
    'app-version': '4.1.0',
    'content-type': 'application/json',
    'platform': 'web',
  };
  if(token){
    header = Object.assign(header, {
      'x-jike-app-auth-jwt': token
    });
  }
  wx.request({
    url: url,
    header: header,
    data:data,
    success: function (e) {
      resolve(e);
    },
    fail: function (e) {
      reject(e);
    }
  })
}




module.exports = {
  formatTime: formatTime,
  wxRequest: wxRequest
}
