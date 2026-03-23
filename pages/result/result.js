Page({
  data: {
    imagePath: '',
    results: [],
    description: '',
    isMock: false
  },

  onLoad(options) {
    if (options.result) {
      try {
        const data = JSON.parse(decodeURIComponent(options.result))
        
        // 处理结果数组
        let results = []
        if (Array.isArray(data)) {
          results = data
        } else if (data.result && Array.isArray(data.result)) {
          results = data.result
        }
        
        // 格式化结果，将分数转换为百分比
        const formattedResults = results.map(item => ({
          name: item.name,
          score: Math.round(item.score * 100)
        }))
        
        this.setData({
          results: formattedResults,
          description: data.description || '',
          isMock: data.isMock || false,
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