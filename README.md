### react-native使用redux做图片上传队列操作，兼容Android和iOS

### 可以实现：
- 批量上传
- 取消上传
- 批量上传过程中失败，重新以失败的地方开始上传
- 上传进度监听

### 运行示例
1、git clone https://github.com/lyxia/redux-upload-queue.git

2、yarn install

3、react-native link

4、AndroidManifest.xml中添加权限
```
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```

5、在iOS中的info.plist中添加权限
```
NSPhotoLibraryUsageDescription, NSCameraUsageDescription
```

### 运行效果图

