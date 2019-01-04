 var app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      token: wx.getStorageSync('token')
    });
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
    var that = this;
    var realName = app.realName;
    var id = app.id;
    var idNo = app.idNo;
    var phone = app.phone;
    var address = app.address;
    var instName = app.instName;
    var serviceInstName = app.serviceInstName;
    that.setData({
      realName: realName,
      idNo: idNo,
      id: id,
      phone: phone,
      address: address,
      instName: instName,
      serviceInstName: serviceInstName
    },function(){
      wx.request({
        url: app.globalData.baseUrl + '/inststaff/get_id/'+that.data.id,
        method: 'get',
        header: {
          'content-Type': 'application/x-www-form-urlencoded',
          'auth-token': that.data.token
        },
        success: function (res) {
          that.setData({
            coupons: res.data.data
          })
        }
      });
    })
  },
  click_cencel:function(){
    var that=this;
    wx.showModal({
      cancelColor: '#333333',
      confirmText: '确认',
      cancelText: '取消',
      content: '确认取消该护工认证?',
      confirmColor: '#5489FD',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.baseUrl + '/inststaff/cancel_certification/' + that.data.id,
            method: 'get',
            header: {
              'content-Type': 'application/x-www-form-urlencoded',
              'auth-token': that.data.token
            },
            success: function (res) {
              console.log(res)
              if (res.data.code == 200) {
                wx.showModal({
                  content: '取消认证成功',
                  showCancel: false,
                  confirmText: '返回',
                  confirmColor: '#5489FD',
                  success(res) {
                    if (res.confirm) {
                      wx.switchTab({
                        url: '../manage/manage',
                      })
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })
              }
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  click_edit:function(){
     var that=this;
     app.id=that.data.id
     wx.navigateTo({
      url: '../nurse_info_edit/nurse_info_edit',
    })
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