# Roon Album Art 显示器

优雅的 Roon 专辑封面显示工具，让您的音乐聆听体验更加视觉化。

## 主要特性

- 高清专辑封面显示（支持4K分辨率）
- 实时更新当前播放状态
- 支持多种显示模式：
  - 全屏封面显示
  - 并排显示模式
  - 标准播放界面
- 响应式设计，适配各种屏幕尺寸
- WebSocket 实时数据更新
- 轻量级 Docker 部署

## 系统要求

- Docker
- Roon Core 已安装并运行
- 网页浏览器

## 快速开始

### 方式一：使用 Docker Compose（推荐）

1. 创建 `docker-compose.yml` 文件：
```yaml
version: '3'
services:
  roonalbumart:
    image: epochaudio/roonalbumart:latest
    container_name: roonalbumart
    ports:
      - "9660:9660"
    restart: unless-stopped
```

2. 运行容器：
```bash
docker-compose up -d
```

### 方式二：直接使用 Docker

```bash
docker run -d \
  --name roonalbumart \
  -p 9660:9660 \
  --restart unless-stopped \
  epochaudio/roonalbumart:latest
```

## 使用方法

1. 启动服务后，打开浏览器访问：`http://<你的IP>:9660`
2. 首次使用时，需要在 Roon Core 中授权此扩展
3. 选择您喜欢的显示模式：

### 显示模式说明

- **标准播放界面** (`/nowplaying.html`)
  - 完整的播放控制界面
  - 显示专辑封面、音乐信息和播放控制
  - 支持主题切换（深色、主色调、封面）
  - 包含音量控制和播放设置（循环、随机、电台）
  - 支持4K专辑封面显示

- **全屏显示模式** (`/fullscreen.html`)
  - 全屏优化的播放控制界面
  - 最大化显示区域利用
  - 适合大屏幕显示

- **并排显示模式** (`/side-by-side.html`)
  - 左侧显示播放控制界面
  - 右侧显示音乐库浏览器
  - 适合同时控制播放和浏览音乐库

提示：您可以根据不同场景选择合适的显示模式：
- 普通使用：推荐使用标准播放界面
- 大屏幕显示：推荐使用全屏显示模式
- 音乐探索：推荐使用并排显示模式

## 致谢

本项目基于以下开源项目进行开发：

- [Roon Web Controller](https://github.com/pluggemi/roon-web-controller) - 原始项目由 Mike Plugge 开发
- [Roon Web Controller (Miemo Fork)](https://github.com/miemo/roon-web-controller) - 提供了界面优化版本

特别感谢：
- Mike Plugge (@pluggemi) 创建了最初的 Roon Web Controller
- Miemo Penttinen 提供了界面优化版本
- Roon Labs 提供了优秀的音乐播放器和 API
- 所有为这个项目做出贡献的开发者
