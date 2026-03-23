# 🐦 鸟类识别小程序

一个基于微信小程序的鸟类识别应用，使用阿里云百炼（通义千问 VL）多模态大模型进行图像识别。

## 功能特性

- 📷 支持拍照或从相册选择照片
- 🤖 使用阿里云百炼 qwen-vl 多模态模型识别鸟类
- 📊 展示识别结果及置信度
- 📝 显示鸟类特征描述
- 🎯 显示最可能匹配的鸟类品种

## 项目结构

```
bird-identifier-weapp/
├── app.js                 # 小程序入口
├── app.json               # 全局配置
├── app.wxss               # 全局样式
├── sitemap.json           # 站点地图
├── README.md              # 项目说明
├── pages/
│   ├── index/             # 首页 - 上传照片
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxml
│   │   └── index.wxss
│   └── result/            # 结果页 - 展示识别结果
│       ├── result.js
│       ├── result.json
│       ├── result.wxml
│       └── result.wxss
└── utils/
    ├── aliBailian.js      # 阿里云百炼识别服务
    └── baiduAI.js         # 百度 AI 识别服务（备用）
```

## 使用说明

### 1. 申请阿里云百炼服务

1. 访问 [阿里云百炼平台](https://bailian.console.aliyun.com/)
2. 使用阿里云账号登录
3. 开通「模型广场」服务
4. 在「API Key 管理」中创建 API Key

### 2. 配置 API 密钥

编辑 `utils/aliBailian.js` 文件，填入你的阿里云百炼 API Key：

```javascript
const ALI_CONFIG = {
  API_KEY: '你的阿里云百炼 API Key',
  // ...
}
```

### 3. 选择模型（可选）

阿里云百炼提供多个视觉模型，可在 `utils/aliBailian.js` 中切换：

```javascript
const ALI_CONFIG = {
  // 视觉理解能力最强的模型
  MODEL: 'qwen-vl-max',
  
  // 或者使用性价比更高的模型
  // MODEL: 'qwen-vl-plus',
  
  // 最新的 Qwen3 视觉模型
  // MODEL: 'qwen3-vl-plus',
}
```

**模型对比：**
| 模型 | 特点 | 适用场景 |
|------|------|----------|
| qwen-vl-max | 视觉理解能力最强 | 追求最高识别准确度 |
| qwen-vl-plus | 性价比高，速度快 | 日常使用 |
| qwen3-vl-plus | 最新一代模型 | 需要最新技术 |

### 4. 运行小程序

1. 下载并安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 导入本项目
3. 点击「编译」运行

## 费用说明

阿里云百炼按 Token 计费：
- 输入（图像 + 文本）：按图像尺寸和复杂度计算 Token
- 输出（识别结果）：按生成文本长度计算 Token
- 新用户有免费额度，具体请参考 [阿里云百炼定价](https://help.aliyun.com/zh/model-studio/billing-and-pricing)

## 开发计划

- [x] 基础项目结构
- [x] 照片上传功能
- [x] 阿里云百炼多模态识别集成
- [x] 结果展示页面
- [ ] 识别历史记录
- [ ] 鸟类详情信息展示
- [ ] 分享功能

## 技术栈

- 微信小程序原生开发
- 阿里云百炼多模态大模型 API (qwen-vl)

## License

MIT