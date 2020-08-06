import { login } from "../../utils/asyncWx.js"
import { request } from '../../request/index.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  // 获取用户信息
  async handleGetUserInfo(e){
    try{
      console.log(e)
      const { encryptedData, iv, rawData, signature } = e.detail
      // 获取小程序登陆成功后的code值
      const { code } = await login()
      const loginParams = { encryptedData, iv, rawData, signature, code }
      // 发送请求获取用户token
      const res = await request({ url: "/users/wxlogin", data: loginParams, method: "post" })
      // 把token存入缓存中 同时跳转回上一个页面
      wx.setStorageSync("token", token)
      wx.navigateBack({
        delta: 1
      })
    }catch(error){
      console.log(error)
    }
  }
})