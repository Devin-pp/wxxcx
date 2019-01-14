// pages/detail/index.js
// 引入接口配置文件urlconfig
const interfaces = require('../../utils/urlconfig.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    partData: {},
    baitiao: [],
    baitiaoSelectItem: {
      desc: "【白条支付】首单享立减优惠"
    },
    hideBaitiao: true, // 是否隐藏白条的遮罩
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    const self = this
    // 发送接口请求
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: interfaces.productionDetail,
      success(res) {
        // console.log(res.data)
        let result = null
        res.data.forEach(data => {
          if (data.partData.id == id)
            result = data
        })

        self.setData({
          partData: result.partData,
          baitiao: result.baitiao
        })
        wx.hideLoading()
      }
    })
  },

/**
   * 显示白条弹框
   */
  popBaitiaoView:function(){
    this.setData({
      hideBaitiao: false
    })
  },

   /**
   * 显示商品弹框
   */
  popBuyView:function(){
    
  }
})