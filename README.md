# Gemini Agent Platform for Bob

## 简介
通过Vertex AI/Agent Platform调用Gemini，用量计入Google Cloud Billing.
(做这个其实是为了使用Google的赠金)

## 使用要求
- Bob 1.8.0+
- 已关联Cloud Billing Account的Google Cloud Project
- 已启用`aiplatform.googleapis.com`
- 拥有`roles/aiplatform.user` 权限的Service Account
- 绑定该Service Account的Authorization Key

详细步骤请参考[Google Cloud 配置指南](docs/google-cloud-setup.md)。

## 安装
[下载最新版本](https://github.com/Tubring25/bob-gemini-agent-platform/releases/latest)
双击`.bobplugin`安装

## Bob配置
- **Authorization Key**：**必须**  绑定Service Account的Google Cloud Authorization Key。
- **Project ID**：**必须**  用于调用Vertex AI并结算用量的Google Cloud Project ID。
- **Model**：**必须**  选择翻译模型，默认gemini-3.5-flash-lite。
- **Custom Model**：`Model`选择`Custom Model`时为**必须**，填入使用的Model。
- **Custom Prompt**：**可选**  自定义翻译要求，追加在原有的Prompt后，仅做补充说明用。


## 支持模型
### 固定模型
目前固定可选择的模型为以下模型：
- gemini-3.5-flash-lite
- gemini-3.5-flash
- gemini-3.8-flash
- gemini-3.7-flash
- gemini-3.6-flash
- gemini-3.1-flash-lite

### 自定义模型
其他在[Agent Platform](https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/google-models?hl=zh-cn)中提供的支持global endpoint、GenerateContent、文本输入和文本输出的模型，可以通过`Custom Model`填写模型ID使用。

## 赠金与计费
Vertex AI的用量进入Cloud Billing。
注意：只有覆盖对应的SKU的赠金才能抵扣。

## 安全说明
插件从用户的PC直接请求`aiplatform.googleapis.com`。Authorization Key和翻译文本不会发送到第三方中转服务。

请勿在Git、Issue、截图或日志中公开Authorization Key。

## License
MIT
