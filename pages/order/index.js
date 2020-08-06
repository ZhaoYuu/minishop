import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        "name": "全部",
        "id": "0",
        "isActive": true
      },
      {
        "name": "待付款",
        "id": "1",
        "isActive": false
      },
      {
        "name": "代发货",
        "id": "2",
        "isActive": false
      },
      {
        "name": "退货/退款",
        "id": "3",
        "isActive": false
      }
    ],
    orders:[]
  },
  // 根据标题索引来激活选中标题数组
  changeTitleByIndex(index){
    let { tabs } = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },  
  //自定义事件接收子组件传递的数据
  handleItemChange(e) {
    const { index } = e.detail
    this.changeTitleByIndex(index)
    // 重新发送请求 type=1 index=0
    this.getOrders(index+1)
  },

  // onshow不同于onload无法在形参上接收options参数
  onShow(){
    // 判断有无token
    // const token = wx.getStorageSync("key")
    // if(!token){
    //   wx.navigateTo({
    //     url: '/pages/auth/index',
    //   })
    //   return;
    // }
    //  获取当前的小程序的页面栈-数组  长度最大是10页面
    let pages = getCurrentPages();
    // 数组中索引最大的页面就是当前页面
    let  currentPage = pages[pages.length - 1]
    // 获取url上的type参数
    const {type} = currentPage.options;
    // 激活选中页面标题 当type=1 index=0
    this.changeTitleByIndex(type-1)
    this.getOrders(type);
  },
  // 获取订单列表的方法
  async getOrders(type){
    const { orders } = await request({
      url:"/my/orders/all",
      data:{type}
    })
    this.setData({
      // 乘1000是变为以毫秒为单位的时间戳
      orders: orders.map(v => ({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
    })
  }

})