// components/tab/tab.js
Component({
  /**
   * 组件的属性列表
   * 存放从父组件中接收的数据，包括类型及默认值
   */
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    itemhandletap(e) {
      const {index} = e.currentTarget.dataset
      // let {tabs} = this.data
      // tabs.forEach((v,i) => i===index ? v.isActive = true : v.isActive = false);
      // this.setData({
      //   tabs
      // })

      //子向父传值
      this.triggerEvent("itemChange",{index})
    },
  }
})
