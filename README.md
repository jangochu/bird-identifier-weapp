# 🐦 鸟类识别小程序

一个基于微信小程序的鸟类识别应用，用户可以拍照或上传照片来识别鸟类品种。

## 功能特性

- 📷 支持拍照或从相册选择照片
- 🔍 使用百度 AI 进行动物/鸟类识别
- 📊 展示识别结果及置信度
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
    └── baiduAI.js         # 百度 AI 识别服务
```

## 使用说明

### 1. 申请百度 AI 服务

1. 访问 [百度 AI 开放平台](https://ai.baidu.com/tech/imagerecognition/animal)
2. 注册并登录账号
3. 创建应用，获取 API Key 和 Secret Key
4. 开通"动物识别"服务

### 2. 配置 API 密钥

编辑 `utils/baiduAI.js` 文件，填入你的百度 AI 密钥：

```javascript
const BAIDU_CONFIG = {
  API_KEY: '你的 API Key',
  SECRET_KEY: '你的 Secret Key',
  // ...
}
```

### 3. 运行小程序

1. 下载并安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 导入本项目
3. 点击"编译"运行

## 开发计划

- [x] 基础项目结构
- [x] 照片上传功能
- [x] 百度 AI 识别集成
- [x] 结果展示页面
- [ ] 识别历史记录
- [ ] 鸟类详情信息展示
- [ ] 分享功能

## 技术栈

- 微信小程序原生开发
- 百度 AI 动物识别 API

## License

MIT