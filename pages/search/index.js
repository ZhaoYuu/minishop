import { request } from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    // 取消按钮是否显示
    isFocus:false,
    inputValue:""
  },
  TimeId:-1,
  // 输入框的值改变就会触发的事件
  handleInput(e){
    // 获取输入框的值
    const {value} = e.detail;
    // 检测合法性
    if(!value.trim()){
      // 值不合法
      this.setData({
        isFocus: false,
        goods:[]
      })
      return;
    }
    // 准备发送请求 运用防抖技术  一般防抖用于输入框  节流用于上拉下拉  
    this.setData({
      isFocus:true
    })
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      this.qsearch(value);
    },1000)
  },
  // 发送请求获取的搜索建议数据
  async qsearch(query){
    const res = await request({
      url:"/goods/qsearch",
      data:{query}
    })
    this.setData({
      goods:res
    })
  },
  // 点击取消按钮
  handleCancel(){
    this.setData({
      isFocus: false,
      goods: [],
      inputValue:""
    })
  }
})