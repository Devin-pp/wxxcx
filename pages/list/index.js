// pages/list/index.js
//引入interfaces
const interfaces = require("../../utils/urlconfig.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    prolist: [],
    page: 1,// 当前请求的page
    size: 5, // 请求数据的size  
    noData: false // 是否有更多数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title
    })
    wx.showLoading({
      title: '正在加载中...',
    })
    const self = this;
    wx.request({
      url: interfaces.productionsList,
      success(res){
        // console.log(res)
        self.setData({
          prolist: res.data
        })
        wx.hideLoading();
      }
    })
  },

 

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    //显示加载状态
    wx.showNavigationBarLoading();
    //还原第一页数据
    this.setData({
      page:1,
      noData:false
    })
    let self = this;
    wx.request({
      url: interfaces.productionsList,
      success(res) {
        self.setData({
          prolist: res.data
        })
        //隐藏加载状态
        wx.stopPullDownRefresh();
        wx.hideNavigationBarLoading();
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //停止下拉刷新
    wx.stopPullDownRefresh();
    //标题栏加载
    wx.showNavigationBarLoading();
    //获取列表
    const prolist = this.data.prolist;
    //定义页数
    let page = this.data.page;
    //设置下拉 page +1
    this.setData({
      page:++page
    })
    //上拉请求数据
    const self = this;
    wx.request({
      url: interfaces.productionsList + '/' + self.data.page + '/' + self.data.size,
      success(res){
        if(res.data.length == 0){
          self.setData({
            noData:true
          })
        }else{
          res.data.forEach(item =>{
            prolist.push(item)
          })
          self.setData({
            prolist:prolist
          })
          // 隐藏加载状态
          wx.hideNavigationBarLoading()
        }
      }
    })
  },

  /**
   * 点击查看详情
  */
  switchProlistDetail: function (e) {
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/detail/index?id=' + this.data.prolist[index].id,
    })
  }
})