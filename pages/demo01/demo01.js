// pages/demo01/demo01.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:1,
    tabs: [
      {
        "name": "首页",
        "id": "0",
        "isActive": true
      },
      {
        "name": "原创",
        "id": "1",
        "isActive": false
      },
      {
        "name": "分类",
        "id": "2",
        "isActive": false
      },
      {
        "name": "关于",
        "id": "3",
        "isActive": false
      }
    ]
  },

  handleInput(e){
    this.setData({
      num:e.detail.value
    })
  },

  handletap(e){
    const operation = e.currentTarget.dataset.operation
    this.setData({
      num: this.data.num + operation
    })
  },
  //自定义事件接收子组件传递的数据
  handleItemChange(e){
    const {index}=e.detail
    let {tabs} = this.data
    tabs.forEach((v,i) => i===index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})