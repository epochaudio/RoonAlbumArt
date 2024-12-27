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
    display_version: "1.0.1",
    publisher: "门���朵制作"
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