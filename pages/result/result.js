Page({
  data: {
    imagePath: '',
    results: []
  },

  onLoad(options) {
    if (options.result) {
      try {
        const results = JSON.parse(decodeURIComponent(options.result))
        // 格式化结果，将分数转换为百分比
        const formattedResults = results.map(item => ({
          name: item.name,
          score: Math.round(item.score * 100)
        }))
        this.setData({
          results: formattedResults,
          imagePath: decodeURIComponent(options.imagePath || '')
        })
      } catch (e) {
        console.error('解析结果失败:', e)
        wx.showToast({
          title: '结果解析失败',
          icon: 'none'
        })
      }
    }
  },

  goBack() {
    wx.navigateBack()
  }
})