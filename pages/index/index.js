const aliBailian = require('../../utils/aliBailian.js')

Page({
  data: {
    imagePath: '',
    isLoading: false,
    errorMsg: ''
  },

  // 选择图片
  chooseImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          imagePath: res.tempFiles[0].tempFilePath,
          errorMsg: ''
        })
      },
      fail: (err) => {
        console.error('选择图片失败:', err)
      }
    })
  },

  // 识别鸟类
  async identifyBird() {
    if (!this.data.imagePath) {
      this.setData({ errorMsg: '请先选择图片' })
      return
    }

    this.setData({ isLoading: true, errorMsg: '' })

    try {
      // 读取图片并转为 base64
      const base64Image = await this.getImageBase64(this.data.imagePath)
      
      // 调用阿里云百炼识别
      const result = await aliBailian.identifyBird(base64Image)
      
      if (result && result.result && result.result.length > 0) {
        // 跳转到结果页
        wx.navigateTo({
          url: '/pages/result/result?result=' + encodeURIComponent(JSON.stringify(result)) + 
               '&imagePath=' + encodeURIComponent(this.data.imagePath)
        })
      } else {
        this.setData({ errorMsg: '未能识别出鸟类，请尝试其他照片' })
      }
    } catch (error) {
      console.error('识别失败:', error)
      this.setData({ errorMsg: '识别失败: ' + (error.message || '请检查网络连接') })
    } finally {
      this.setData({ isLoading: false })
    }
  },

  // 获取图片 base64
  getImageBase64(filePath) {
    return new Promise((resolve, reject) => {
      wx.getFileSystemManager().readFile({
        filePath: filePath,
        encoding: 'base64',
        success: (res) => {
          resolve(res.data)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
})