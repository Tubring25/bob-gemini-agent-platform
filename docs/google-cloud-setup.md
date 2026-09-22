# Bob插件Gemini Agent Platform：Google Cloud配置指南

> 当前内容涉及的Google Cloud界面与服务名称为2026-09-22截止的版本。

[返回README](../README.md)
## 适用范围

当前文档用于为Bob插件**Gemini Agent Platform**准备Google Cloud项目、Cloud Billing、Service Account和Authorization Key。

插件通过Google Cloud Vertex AI/Gemini Enterprise Agent Platform调用Gemini，请求发送到`aiplatform.googleapis.com`。它**不是Google AI Studio**中的Gemini Developer API，也不使用`generativelanguage.googleapis.com`。

插件当前调用以下形式的接口：

```text
https://aiplatform.googleapis.com/v1/projects/PROJECT_ID/locations/global/publishers/google/models/MODEL_ID:generateContent
```

因此，模型必须同时满足：
- 可通过Google Cloud Gemini Enterprise Agent Platform使用；
- 支持`global`endpoint；
- 支持`GenerateContent`；
- 支持文本输入和文本输出。

模型页面中出现的模型不一定都兼容本插件，比如仅支持图片、音频、实时会话、embedding或其他调用方法的模型不能直接用于翻译。

## 开始前准备

- 可登录Google Cloud控制台的Google账号；
- 一个已有或新建的Google Cloud项目；
- 可用的Cloud Billing Account，并有权限把项目关联到该Billing Account；
- Bob 1.8.0或更高版本；
- 创建Service Account、授予IAM角色、启用API和创建凭据所需的权限。

如果使用Google Cloud赠金，需要注意以下内容：
- 赠金通常记录在Billing Account层面，不是直接绑定某个Project；
- 插件使用的Project必须关联到持有赠金的Billing Account；
- 赠金是否抵扣取决于赠金条款、适用SKU、有效期和排除项，这些以赠金使用页面为准；

## 1.创建或选择Google Cloud项目
1. 打开[Google Cloud控制台](https://console.cloud.google.com/)。
2. 点击顶部项目选择器。
3. 选择已有项目，或点击`New Project`创建项目。
4. 确认后续操作始终在同一个目标Project中进行。
5. 记录该项目的**Project ID**。

Project ID通常类似`my-cloud-project`，但请以控制台实际显示值为准。不要填写纯数字的**Project Number**。

可以在`IAM & Admin`>`Settings`或项目选择器中查看Project ID。后面创建凭据、授权以及Bob配置时，都应再次确认当前选择的是这个Project。

## 2.关联Billing Account并检查赠金
Vertex AI/Gemini Enterprise Agent Platform用量进入Google Cloud Billing。Service Account本身不负责“绑定账单”，账单关联对象是Project。

### 关联Billing Account
1. 在Google Cloud控制台打开`Billing`。
2. 进入`My projects`或项目的Billing页面。
3. 找到目标Project。
4. 选择`Link a billing account`或`Change billing account`。
5. 选择计划承担费用、且可能持有赠金的Billing Account。
6. 确认项目状态显示为已启用Billing。

## 3.启用Agent Platform/Vertex AI服务
1. 在目标Project中打开`APIs & Services`>`Library`。
2. 搜索`aiplatform.googleapis.com`。
3. 打开对应结果并点击`Enable`。
4. 回到`Enabled APIs & services`确认该服务已启用。

## 4.创建Service Account
1. 打开`IAM & Admin`>`Service Accounts`。
2. 点击`Create service account`。
3. 输入便于识别的名称，例如专门用于Bob翻译的名称。
4. 创建后记录Service Account的邮箱地址。
5. 不要创建或下载JSON私钥；本插件需要的是后面创建的Authorization Key。

## 5.为Service Account授予最小权限
在**插件实际调用的Project**中授予Service Account以下角色：

```text
Agent Platform User（roles/aiplatform.user）
```

可按以下步骤操作：
1. 打开目标Project的`IAM & Admin`>`IAM`。
2. 点击`Grant access`。
3. 在`New principals`中填写Service Account邮箱。
4. 添加`Agent Platform User`角色，角色ID为`roles/aiplatform.user`。
5. 保存并等待权限传播。


### 找不到Service Account绑定选项
如果创建API Key时没有`Authenticate API calls through a service account`选项，可能与当前账号权限、项目状态、功能开放情况或Organization Policy有关。

组织项目还可能受到`iam.managed.disableServiceAccountApiKeyCreation`约束。个人项目并非一定不支持，组织项目也并非一定支持，应以当前控制台和项目策略为准。

## 6.创建Authorization Key
本插件需要的准确凭据类型是**Authorization Key（绑定Service Account的API Key）**。

### 控制台创建路径
1. 保持目标Project处于选中状态。
2. 打开`APIs & Services`>`Credentials`。
3. 点击`Create credentials`>`API key`。
4. 选择或勾选`Authenticate API calls through a service account`。
5. 点击`Select a service account`，选择前面创建的Service Account。
6. 点击`Create`。
7. 复制生成的key string，稍后填入Bob的`Authorization Key`。

## 7.限制Authorization Key
创建后进入该key的编辑页面，至少配置API restrictions：
1. 在`API restrictions`中选择`Restrict key`。
2. 只选择`aiplatform.googleapis.com`对应的服务。
3. 保存并等待配置传播。

> Application restrictions应根据实际环境设置。Bob是本地桌面应用，部分场景可能需要选择None；这不代表Key是安全的，因此仍应限制API、保持Service Account最小权限，并在泄露后立即撤销。

## 8.回到Bob完成配置
1. 在Bob中打开`Gemini Agent Platform`插件设置。
2. 填写`Authorization Key`和`Project ID`。
3. 选择模型；使用自定义模型时填写Model ID。
4. 点击验证按钮。

验证会发送一次很短的`hello`请求，并产生极少量用量。验证成功后，可以使用普通文本进行第一次翻译测试。

## 常见问题
- `API_KEY_SERVICE_BLOCKED`：检查API restrictions是否允许`aiplatform.googleapis.com`。
- `aiplatform.endpoints.predict`：检查Service Account是否在目标Project中拥有`roles/aiplatform.user`。
- `429`：检查请求频率、项目配额和Billing状态。
