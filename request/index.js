// 同时发送异步代码的次数
let ajaxTimes = 0
export const request=(params)=>{
  // 判断url中是否带有/my/请求的是私有的路径  带上header token
  let header = {...params.header}
  if(params.url.includes("/my/")){
    // 拼接header带上token
    // header["Authorization"] = wx.getStorageSync("token")
    header["Authorization"] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
  }

  ajaxTimes++
  // 显示loading
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve,reject) => {
    wx.request({
      ...params,
      header: header,
      url: baseUrl + params.url,
      success:(res) => {
        resolve(res.data.message);
      },
      fail:(err) => {
        reject(err);
      },
      complete:() => {
        ajaxTimes--;
        if(ajaxTimes === 0){
          // 关闭loading
          wx.hideLoading();
        }
      }
    })
  })
}