import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftMenuList:[],
    rightMenuList:[],
    currentIndex:0,
    scrollTop:0
  },
  Cates:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1先判断一下本地存储中有没有旧的数据
    // {time:Date.now().data:[...]}
    // 2没有旧数据 直接发送请求
    // 3有旧数据同时旧的数据也没有过期旧使用本地存储中的旧数据即可
    const Cates = wx.getStorageSync("cates");
    if(!Cates){
      this.getCates()
    }else{
      // 有旧的数据 定义过期时间
      if(Date.now() - Cates.time > 1000 * 60 * 5){
        this.getCates()
      }else{
        // 用旧数据
        this.Cates = Cates.data
        console.log(this.Cates)
        let leftMenuList = this.Cates.map(v => v.cat_name)
        let rightMenuList = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightMenuList
        })
      }
    }
  },

  // 获取分类数据
  async getCates(){
    // request({
    //   url: "/categories"
    // }).then(res => {
      
    //   this.Cates = res.data.message
    //   // 把接口的数据存入到本地存储
    //   wx.setStorageSync("cates", {
    //     time:Date.now(),
    //     data:this.Cates
    //   })
    //   let leftMenuList = this.Cates.map(v => v.cat_name)
    //   let rightMenuList = this.Cates[0].children
    //   this.setData({
    //     leftMenuList,
    //     rightMenuList
    //   })
    // })

    const res = await request({ url: "/categories" });
    this.Cates = res
    // 把接口的数据存入到本地存储
    wx.setStorageSync("cates", {
      time:Date.now(),
      data:this.Cates
    })
    let leftMenuList = this.Cates.map(v => v.cat_name)
    let rightMenuList = this.Cates[0].children
    this.setData({
      leftMenuList,
      rightMenuList
    })

  },

  // 左侧菜单的点击事件
  handleItemTap(e){
    const {index} = e.currentTarget.dataset
    let rightMenuList = this.Cates[index].children
    this.setData({
      currentIndex:index,
      rightMenuList,
      // 重新设置scrolltop
      scrollTop:0
    })
  }, 
})