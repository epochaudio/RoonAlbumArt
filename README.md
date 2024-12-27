# Roon 网页控制器

这是一个用于 Roon 音乐播放器的网页控制界面，让你可以通过网页浏览器来控制 Roon 的播放。

## 功能特性

- 支持多区域(Zone)控制
- 实时音量调节
- 播放控制（播放/暂停/上一曲/下一曲/停止）
- 播放设置调整（随机播放/自动电台/循环播放）
- 专辑封面显示（支持高清4K图片）
- 响应式网页设计
- WebSocket 实时状态更新
- Docker 容器化部署支持

## 系统要求

### Docker 部署
- Docker
- Docker Compose
- Roon Core 已安装并运行

### 直接部署
- Node.js
- Roon Core 已安装并运行
- 网页浏览器

## 安装和运行

### 方式一：Docker 部署（推荐）

1. 克隆或下载此仓库
2. 在项目目录下运行：
```bash
docker-compose up -d
```

这将自动构建镜像并在后台启动容器。容器会自动设置为在系统启动时运行。

### 方式二：直接部署

1. 克隆或下载此仓库
2. 安装依赖包：
```bash
npm install
```
3. 运行应用：
```bash
node app.js --port 9660
```

## 访问方式

启动服务后，打开浏览器访问：`http://<你的IP>:9660`

注意：
- 首次使用时需要在 Roon Core 中授权此扩展
- 确保防火墙已开放 9660 端口

## 配置选项

### Docker 配置
服务默认运行在 9660 端口上。如需修改，请同时更新：
- Dockerfile 中的 `EXPOSE` 和 `CMD` 命令
- 确保防火墙规则相应更新

### 命令行参数（仅适用于直接部署）
- `--help` 或 `-h`: 显示帮助信息
- `--port` 或 `-p`: 指定服务器监听端口（默认：9660）
 

## 最近更新

### 2024年更新
1. 界面简化
   - 移除了右上角菜单按钮和相关功能
   - 删除了音乐库切换功能
   - 删除了所有音乐库相关文件（library.html、library.js、library.css）
   - 移除了 Library、Playlists、My Live Radio、Genres、TIDAL、Qobuz、Settings 等菜单项
   - 简化了用户界面，专注于播放控制
2. Docker 配置更新
   - 服务名称更改为 roonalbumart

## 版本信息

当前版本：1.0.1

## 致谢

本项目基于以下开源项目进行开发：

- [Roon Web Controller](https://github.com/pluggemi/roon-web-controller) - 原始项目由 Mike Plugge 开发
- [Roon Web Controller (Miemo Fork)](https://github.com/miemo/roon-web-controller) - 提供了界面优化版本

特别感谢：
- Mike Plugge (@pluggemi) 创建了最初的 Roon Web Controller
- Miemo Penttinen 提供了界面优化版本
- Roon Labs 提供了优秀的音乐播放器和 API
- 所有为这个项目做出贡献的开发者
