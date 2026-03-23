/**
 * 阿里云百炼多模态识别服务
 * 文档: https://help.aliyun.com/zh/model-studio/vision
 * 
 * 支持模型:
 * - qwen-vl-max: 通义千问 VL Max，视觉理解能力强
 * - qwen-vl-plus: 通义千问 VL Plus，性价比高
 * - qwen3-vl-plus: 最新一代视觉模型
 * 
 * 计费: 按 Token 计费，图像也会转换为 Token 计算
 */

// 尝试读取本地配置文件（包含敏感信息，不提交到 Git）
let localConfig = {}
try {
  localConfig = require('../config/config.js')
} catch (e) {
  // 配置文件不存在，使用空配置
  console.log('未找到本地配置文件，使用默认配置')
}

// 阿里云百炼配置
const ALI_CONFIG = {
  // 优先使用本地配置文件的 API Key
  API_KEY: localConfig.ALI_API_KEY || '',
  
  // 接口地址
  BASE_URL: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
  
  // 使用的模型（优先使用本地配置）
  MODEL: localConfig.MODEL || 'qwen-vl-max',
  
  // 备用模型（主模型不可用时）
  FALLBACK_MODEL: 'qwen-vl-plus'
}

// 调用阿里云百炼视觉模型识别鸟类
async function identifyBird(imageBase64) {
  // 检查配置
  if (!ALI_CONFIG.API_KEY || ALI_CONFIG.API_KEY === 'your-ali-api-key-here') {
    console.log('未配置阿里云百炼 API，返回模拟数据')
    return mockIdentifyResult()
  }

  try {
    const result = await callVisionModel(imageBase64, ALI_CONFIG.MODEL)
    return result
  } catch (error) {
    console.error('主模型调用失败，尝试备用模型:', error)
    try {
      const result = await callVisionModel(imageBase64, ALI_CONFIG.FALLBACK_MODEL)
      return result
    } catch (fallbackError) {
      console.error('备用模型也失败:', fallbackError)
      return mockIdentifyResult()
    }
  }
}

// 调用视觉模型
function callVisionModel(imageBase64, model) {
  return new Promise((resolve, reject) => {
    const requestData = {
      model: model,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`
              }
            },
            {
              type: 'text',
              text: '这是一张什么鸟的照片？请识别这只鸟的种类，并返回以下格式的 JSON 数据（只返回 JSON，不要其他文字）：\n{\n  "bird_name": "鸟的中文名称",\n  "scientific_name": "拉丁学名（如果有）",\n  "confidence": 0.95,\n  "description": "简要描述特征",\n  "possible_species": [\n    {"name": "最可能的鸟种", "confidence": 0.95},\n    {"name": "次可能的鸟种", "confidence": 0.65},\n    {"name": "第三可能的鸟种", "confidence": 0.30}\n  ]\n}'
            }
          ]
        }
      ],
      max_tokens: 1000
    }

    wx.request({
      url: ALI_CONFIG.BASE_URL,
      method: 'POST',
      data: requestData,
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ALI_CONFIG.API_KEY}`
      },
      timeout: 30000,
      success: (res) => {
        if (res.statusCode === 200 && res.data.choices && res.data.choices[0]) {
          const content = res.data.choices[0].message.content
          const parsedResult = parseAIResponse(content)
          resolve(parsedResult)
        } else if (res.data.error) {
          reject(new Error(res.data.error.message || 'API 调用失败'))
        } else {
          reject(new Error('未知错误: ' + JSON.stringify(res.data)))
        }
      },
      fail: (err) => {
        reject(new Error('网络请求失败: ' + err.errMsg))
      }
    })
  })
}

// 解析 AI 返回的内容
function parseAIResponse(content) {
  try {
    // 尝试直接解析 JSON
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const data = JSON.parse(jsonMatch[0])
      
      // 转换为统一的返回格式
      const results = []
      
      // 主结果
      if (data.bird_name) {
        results.push({
          name: data.bird_name,
          score: data.confidence || 0.9
        })
      }
      
      // 其他可能的结果
      if (data.possible_species && Array.isArray(data.possible_species)) {
        data.possible_species.forEach(species => {
          if (species.name && species.name !== data.bird_name) {
            results.push({
              name: species.name,
              score: species.confidence || 0.5
            })
          }
        })
      }
      
      // 如果没有解析到结果，使用原始内容
      if (results.length === 0) {
        results.push({
          name: data.bird_name || '未知鸟类',
          score: data.confidence || 0.5
        })
      }
      
      return {
        result: results,
        description: data.description || '',
        raw_response: content
      }
    }
    
    // 如果无法解析 JSON，返回原始内容
    return {
      result: [{ name: '识别结果', score: 0.8 }],
      description: content,
      raw_response: content
    }
  } catch (e) {
    console.error('解析 AI 响应失败:', e)
    // 解析失败时返回原始内容
    return {
      result: [{ name: '识别结果', score: 0.8 }],
      description: content,
      raw_response: content
    }
  }
}

// 模拟识别结果（用于开发和测试）
function mockIdentifyResult() {
  const mockBirds = [
    { name: '麻雀', score: 0.95 },
    { name: '喜鹊', score: 0.82 },
    { name: '白头鹎', score: 0.67 },
    { name: '珠颈斑鸠', score: 0.45 },
    { name: '乌鸫', score: 0.23 }
  ]
  
  // 随机返回一些鸟类
  const shuffled = mockBirds.sort(() => 0.5 - Math.random())
  return {
    result: shuffled.slice(0, 3),
    description: '这是模拟数据，请配置阿里云百炼 API Key 以获得真实识别结果',
    isMock: true
  }
}

module.exports = {
  identifyBird,
  ALI_CONFIG
}