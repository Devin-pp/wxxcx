// pages/category/index.js
//引入interfaces
const interfaces = require("../../utils/urlconfig.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navLeftItems:[],
    navRightItems:[],
    curIndex:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //改变this指向
    const self = this;

    //加载start。。。
    wx.showLoading({
      title: '玩命加载中...',
    })

     //请求主页数据
    wx.request({
      url: interfaces.productions,
      header:{
        "content-type": "application/json"//默认值，返回的数据设置为json数据格式
      },
      success(res){
        // console.log(res.data)
        self.setData({
          navLeftItems:res.data.navLeftItems,
          navRightItems:res.data.navRightItems,
        })

        //加载end。。。
        wx.hideLoading();
      }
    })
  },
  // 记录左侧点击的按钮下标 
  switchRightTag:function(e){
    let index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      curIndex : index
    })
  },
  // 点击进入列表页
  // 列表页参数 title
  showListView:function(e){
    let txt = e.currentTarget.dataset.txt
    wx.navigateTo({
      url: '/pages/list/index?title=' + txt
    })
   
  }
})