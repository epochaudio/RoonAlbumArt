# Roon 专辑封面显示 Android APP 开发文档

## 一、项目概述

### 1.1 项目目标
开发一个简单的 Android APP，用于显示 Roon 音乐播放器当前播放歌曲的专辑封面。

### 1.2 核心功能
- Roon Core 配对连接
- 实时显示专辑封面
- 全屏显示
- 自适应屏幕

## 二、技术方案

### 2.1 实现方式
采用 WebView 封装方案，将现有的 Web 应用转换为 Android APP。

### 2.2 技术栈
- Android WebView
- Roon API
- WebSocket
- JavaScript Bridge

## 三、核心模块设计

### 3.1 Roon 配对模块
```java
public class RoonConnection {
    private boolean isPaired = false;
    private WebView webView;
    
    // 配对状态监听
    private void setupWebSocket() {
        webView.evaluateJavascript(
            "socket.on('pairStatus', function(status) { " +
            "  Android.onPairStatusChanged(status.pairEnabled);" +
            "});", null
        );
    }
    
    // 配对状态处理
    @JavascriptInterface
    public void onPairStatusChanged(boolean paired) {
        isPaired = paired;
        if (paired) {
            startAlbumArtUpdates();
        } else {
            showPairingInstructions();
        }
    }
}
```

### 3.2 主界面模块
```java
public class AlbumArtActivity extends AppCompatActivity {
    private WebView webView;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // 全屏设置
        getWindow().setFlags(
            WindowManager.LayoutParams.FLAG_FULLSCREEN,
            WindowManager.LayoutParams.FLAG_FULLSCREEN
        );
        
        // 屏幕常亮
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        
        // WebView 配置
        setupWebView();
    }
    
    private void setupWebView() {
        webView = new WebView(this);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.loadUrl("http://[RoonServer]:9660/");
    }
}
```

## 四、配置要求

### 4.1 Android 权限
```xml
<!-- AndroidManifest.xml -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

### 4.2 Roon API 配置
```javascript
var roonConfig = {
    extension_id: "com.Epochaudio.web.controller",
    display_name: "RoonAlbumArt",
    display_version: "1.0.8",
    publisher: "门耳朵制作"
}
```

## 五、实现流程

### 5.1 初始化流程
1. APP 启动
2. 初始化 WebView
3. 连接 Roon Core
4. 等待配对确认
5. 开始显示封面

### 5.2 配对流程
1. 自动搜索局域网 Roon Core
2. 发送配对请求
3. 等待 Roon Core 确认
4. 保存配对状态
5. 开始获取封面

## 六、注意事项

### 6.1 网络处理
- 确保 APP 和 Roon Core 在同一网络
- 实现自动重连机制
- 处理网络切换情况

### 6.2 错误处理
- 配对失败处理
- 网络断开重连
- 图片加载失败处理

### 6.3 性能优化
- 图片缓存机制
- 内存管理
- 电池优化

## 七、用户界面

### 7.1 界面状态
- 未配对状态
- 配对中状态
- 正常显示状态
- 错误状态

### 7.2 提示信息
- 配对指导
- 网络诊断
- 错误提示

## 八、测试要点

### 8.1 功能测试
- 配对功能
- 封面显示
- 屏幕旋转
- 网络切换

### 8.2 性能测试
- 内存占用
- 电池消耗
- 网络延迟

## 九、部署说明

### 9.1 编译配置
- minSdkVersion
- targetSdkVersion
- 签名配置

### 9.2 发布注意事项
- 版本号管理
- 兼容性测试
- 错误日志收集

## 十、后续优化

### 10.1 功能优化
- 添加设置界面
- 支持多种分辨率
- 优化重连机制

### 10.2 性能优化
- 减少内存占用
- 优化启动速度
- 提高稳定性 

# Roon Album Art 全屏显示功能

## 功能说明
实现了跨平台的专辑封面全屏显示功能，支持桌面和移动端浏览器。

## 实现细节

### 1. 界面元素
- 左上角全屏按钮
- 右上角退出按钮
- 封面图片居中显示
- 背景模糊效果

### 2. 显示规格
```css
#coverImage {
    width: 98vw;          // 宽度为视窗宽度的98%
    height: auto;         // 高度自动按比例缩放
    max-height: 95vh;     // 最大高度为视窗高度的95%
    object-fit: contain;  // 保持图片比例
}
```

### 3. 平台支持

#### 桌面浏览器
- Chrome/Edge: 完整支持
- Firefox: 完整支持
- Safari: 完整支持

#### 移动设备
1. Android设备
   - Chrome: 完整支持
   - Firefox: 完整支持
   - 其他主流浏览器: 支持

2. iOS设备（iPhone/iPad）
   - Safari: 
     * 通过"添加到主屏幕"实现全屏
     * 点击全屏按钮会显示操作提示
   - 其他浏览器:
     * 建议使用Safari获得最佳体验

### 4. 使用说明

#### 桌面端
1. 点击左上角全屏按钮进入全屏
2. 按ESC或点击右上角按钮退出

#### Android设备
1. 点击左上角全屏按钮
2. 在权限提示中选择"允许"
3. 使用返回键或右上角按钮退出

#### iOS设备
1. 使用Safari浏览器访问
2. 点击分享按钮
3. 选择"添加到主屏幕"
4. 从主屏幕图标启动获得全屏体验

### 5. 技术实现

#### 区域选择状态保持
```javascript
// 区域状态管理
var settings = {
    theme: readCookie("settings['theme']") || 'dark',
    zoneID: readCookie("settings['zoneID']") || null
};

// 切换全屏时保持区域选择
function toggleFullscreen() {
    if (window.self !== window.top) {
        window.parent.location.href = '/nowplaying.html';
    } else {
        setCookie("settings['zoneID']", settings.zoneID);
        window.location.href = '/fullscreen.html';
    }
}

// 全屏模式下的区域状态恢复
$(document).ready(function() {
    socket.on("zoneStatus", function(payload) {
        if (payload && payload.length > 0) {
            if (!settings.zoneID) {
                settings.zoneID = payload[0].zone_id;
                setCookie("settings['zoneID']", settings.zoneID);
            }
            const zone = payload.find(z => z.zone_id === settings.zoneID) || payload[0];
            // 更新显示
            updateDisplay(zone);
        }
    });
});
```

#### 设备检测
```javascript
// iOS设备检测
function isIOS() {
    return [
        'iPad Simulator', 'iPhone Simulator', 'iPod Simulator',
        'iPad', 'iPhone', 'iPod'
    ].includes(navigator.platform)
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
}
```

#### 全屏控制
```javascript
// 全屏切换函数
function toggleFullScreen() {
    try {
        if (isIOS()) {
            // iOS设备特殊处理
            if (document.documentElement.webkitEnterFullscreen) {
                document.documentElement.webkitEnterFullscreen();
            }
            return;
        }

        // 其他设备的处理
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        }
    } catch (err) {
        console.log('全屏切换出错:', err);
    }
}
```

#### 事件监听
```javascript
// 全屏状态变化监听
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

function handleFullscreenChange() {
    const fullscreenButton = document.getElementById('fullscreenButton');
    if (document.fullscreenElement) {
        fullscreenButton.style.display = 'none';
    } else {
        fullscreenButton.style.display = 'flex';
    }
}
```

### 6. 样式设计
```css
#fullscreenButton {
    position: fixed;
    top: 20px;
    left: 20px;
    background: rgba(0, 0, 0, 0.8);
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 12px;
    color: white;
    opacity: 1;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

#fullscreenButton:hover {
    border-color: rgba(255, 255, 255, 0.8);
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0,0,0,0.4);
}
```

### 7. 注意事项
1. iOS限制
   - 只能通过用户交互触发全屏
   - 建议使用"添加到主屏幕"方式

2. 浏览器兼容性
   - 需要处理不同浏览器的全屏API
   - 需要监听不同的全屏事件

3. 用户体验
   - 提供清晰的操作提示
   - 保持界面简洁直观
   - 确保按钮易于点击