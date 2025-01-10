# Roon Album Art 显示器

[![版本](https://img.shields.io/badge/版本-1.0.8-blue.svg)](https://github.com/your-repo/roonalbumart)

优雅的 Roon 专辑封面显示工具，让您的音乐聆听体验更加视觉化。

## 最新更新 (v1.0.8)

### 界面优化
- 优化非触摸设备的交互体验
  - 平时自动隐藏鼠标指针
  - 移动鼠标时显示指针
  - 悬停在按钮上时保持显示
- 改进按钮交互效果
  - 悬停时按钮亮度提升
  - 更流畅的过渡动画
- 优化封面图片显示
  - 保持原生显示效果
  - 轻微的悬停放大效果
- 触摸设备适配
  - 移除不必要的悬停效果
  - 优化触摸反馈

## 主要特性

- 专辑封面显示（可选4K分辨率）
- 完整的播放控制功能
- 主题切换（深色、主色调、封面背景）
- 实时播放状态更新
- 桌面通知支持
- 响应式设计，自动字体缩放
- 两种显示模式（标准和全屏）
- 区域选择状态保持
- WebSocket 实时连接
- Docker 容器化部署

## 系统要求

- Docker
- Roon Core 已安装并运行
- 现代网页浏览器

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
      - "3666:3666"
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
  --network host \
  --restart unless-stopped \
  epochaudio/roonalbumart:latest

```

## 使用方法

1. 启动服务后，打开浏览器访问：`http://<你的IP>:3666`
2. 首次使用时，需要在 Roon Core 中授权此扩展
3. 在界面中选择您要控制的 Roon 区域（Zone）

### 界面说明

- **标准播放界面** (`/nowplaying.html`)
  - 专辑封面和播放信息显示
  - 播放控制（播放/暂停、上一曲/下一曲）
  - 音量控制和播放设置（循环、随机、电台）
  - 可选4K专辑封面显示
  - 支持主题切换
  - 可选桌面通知

- **全屏模式** (`/fullscreen.html`)
  - 优雅的翻页时钟显示（小时:分钟）
  - 最大化的专辑封面显示
  - 智能背景主题（支持封面模糊、主色调、深色三种模式）
  - 简洁的页面切换按钮
  - 优雅的授权等待提示
  - 自动字体缩放
  - 沉浸式显示体验

### 显示模式选择
- **标准模式**：适合近距离操作，提供完整控制功能
- **全屏模式**：适合远距离观看，突出视觉体验
  - 通过界面右上角的切换按钮随时切换模式
  - 支持不同主题风格
  - 自动适应屏幕尺寸
  - 保持与标准模式相同的区域选择

提示：根据使用场景选择合适的显示模式：
- 桌面使用：标准播放界面
- 远距离观看：全屏模式


## 新功能：全屏专辑封面显示

### 功能特点
- 跨平台支持：支持所有主流桌面和移动端浏览器
- 高清显示：专辑封面占据98%屏幕宽度，保持原始比例
- 智能适配：自动适应不同设备和屏幕尺寸
- 简洁界面：仅保留必要的控制按钮
- 优雅过渡：平滑的动画效果和背景模糊

### 使用方法

#### 桌面浏览器
1. 访问全屏页面
2. 点击左上角全屏按钮
3. 按 ESC 或点击右上角按钮退出

#### Android 设备
1. 使用 Chrome 或其他主流浏览器访问
2. 点击左上角全屏按钮
3. 允许全屏权限请求
4. 使用返回键或右上角按钮退出

#### iOS 设备（推荐方式）
1. 使用 Safari 浏览器访问
2. 点击分享按钮
3. 选择"添加到主屏幕"
4. 从主屏幕图标启动，获得最佳全屏体验

### 浏览器支持
- Chrome/Edge/Firefox：完整支持全屏功能
- Safari：完整支持，iOS 设备建议使用"添加到主屏幕"
- 其他主流浏览器：基本支持全屏功能

### 注意事项
1. iOS 设备请使用 Safari 浏览器获得最佳体验
2. 确保浏览器已允许全屏权限
3. 如遇全屏异常，请尝试刷新页面


## 致谢

本项目基于以下开源项目进行开发：

- [Roon Web Controller](https://github.com/pluggemi/roon-web-controller) - 原始项目由 Mike Plugge 开发
- [Roon Web Controller (Miemo Fork)](https://github.com/miemo/roon-web-controller) - 提供了界面优化版本

特别感谢：
- Mike Plugge (@pluggemi) 创建了最初的 Roon Web Controller
- Miemo Penttinen 提供了界面优化版本
- Roon Labs 提供了优秀的音乐播放器和 API
- 所有为这个项目做出贡献的开发者

