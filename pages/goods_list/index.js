import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        "name": "综合",
        "id": "0",
        "isActive": true
      },
      {
        "name": "销量",
        "id": "1",
        "isActive": false
      },
      {
        "name": "价格",
        "id": "2",
        "isActive": false
      }
    ],
    goodsList:[]
  },
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  // 总页数
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid
    this.getGoodsList()
  },

  // 获取商品列表数据
  async getGoodsList(){
    const res = await request({url:"/goods/search",data:this.QueryParams})
    // 获取总条数
    const total = res.total
    // 计算总页数
    this.totalPages = Math.ceil(total/this.QueryParams.pagesize)
    this.setData({
      // 拼接数组
      goodsList: [...this.data.goodsList, ...res.goods]
    })
    // 关闭下拉刷新的窗口
    wx.stopPullDownRefresh();
  },

  //自定义事件接收子组件传递的数据
  handleItemChange(e) {
    const { index } = e.detail
    let { tabs } = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 重置数组
    this.setData({
      goodsList:[]
    })
    // 重置页码
    this.QueryParams.pagenum = 1
    // 发送请求
    this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 判断有没有下一页数据
    if(this.QueryParams.pagenum >= this.totalPages){
      // 没有下一页数据
      wx.showToast({
        title: '没有数据了',
      })
    }else{
      // 还有下一页数据
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  
})