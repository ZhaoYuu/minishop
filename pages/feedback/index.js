// pages/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        "name": "体验问题",
        "id": "0",
        "isActive": true
      },
      {
        "name": "商品、商家投诉",
        "id": "1",
        "isActive": false
      }
    ],
    // 被选中的图片路径
    chooseImgs:[],
    // 文本域内容
    textVal:""
  },
  // 外网的图片的路径数组
  UpLoadImgs:[],
  //自定义事件接收子组件传递的数据
  handleItemChange(e) {
    const { index } = e.detail
    let { tabs } = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },
  // 点击+上传图片
  handleChooseImg(){
    wx.chooseImage({
      // 同时选中的图片数量
      count:9,
      // 图片的格式  原图 压缩
      sizeType:['original','compressed'],
      // 图片的来源 相册 照相机
      sourceType:['album','camera'],
      success: (res) => {
        console.log(res)
        this.setData({
          // 图片数组拼接
          chooseImgs: [...this.data.chooseImgs, ...res.tempFilePaths]
        })
      },
    })
  },
  // 点击自定义图片组件
  handleRemoveImg(e){
    // 获取被点击的组件的索引
    const {index} = e.currentTarget.dataset;
    console.log(index)
    // 获取data中的图片数组
    let {chooseImgs} = this.data;
    // 删除元素
    chooseImgs.splice(index, 1);
    this.setData({
      chooseImgs
    })
  },
  // 文本域的输入事件
  handleTextInput(e){
    this.setData({
      textVal:e.detail.value
    })
  },
  // 提交按钮的点击事件
  handleFormSubmit(){
    // 获取文本域的内容
    const { textVal, chooseImgs} = this.data;
    // 合法性的验证
    if(!textVal.trim()){
      // 不合法
      wx.showToast({
        title: '输入不合法',
      })
      return;
    }

    // 准备上传图片到专门的图片服务器
    chooseImgs.forEach((v,i) => {
      wx.uploadFile({
        url: '',
        filePath: v,
        name: '',
        success:(res) => {
          console.log(res)
          let url = JSON.parse(res.data).url;
          this.UpLoadImgs.push(url)

          // 所有的图片都上传完成了才触发
          if(i===chooseImgs.length-1){
            console.log("把文本的内容和外网的图片数组提交到后台中去")
            // 提交都成功了
            // 重置页面
            this.setData({
              textVal:"",
              chooseImgs:[]
            })
            // 返回上一个页面
            wx.navigateBack({
              delta:1
            })
          }
        }
      })
    })
  }
  
})