/**
 * 配置文件模板
 * 
 * 使用说明：
 * 1. 复制本文件为 config.js
 * 2. 在 config.js 中填入你的真实 API Key
 * 3. config.js 不会被提交到 GitHub（已在 .gitignore 中忽略）
 */

module.exports = {
  // 阿里云百炼 API Key
  // 申请地址：https://bailian.console.aliyun.com/
  ALI_API_KEY: 'your-ali-api-key-here',
  
  // 可选：选择使用的模型
  // 可选值：'qwen-vl-max' | 'qwen-vl-plus' | 'qwen3-vl-plus'
  MODEL: 'qwen-vl-max'
}