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

6、修改`redux-upload-queue/js/component/upload/UploadReducer.js`第107行：
```
//这个视服务器返回的资源id字段而定
const {upload, id} = action.payload
...
uploadItem = uploadItem.set('state', UPLOAD_STATE.UPLOADED).set('id', id)
```
修改`redux-upload-queue/js/networking/FetchData.js`的第16行：
```
 //视服务器要求的字段而定
formData.append('imgFile', file)
formData.append('type', 1)
```
修改`redux-upload-queue/js/networking/ServiceConfig.js`文件：
```
export const SERVER = "http://172.16.11.80";
export const UploadURL = '/app/uploadPhoto'
```

### 运行效果图
![](https://github.com/lyxia/redux-upload-queue/blob/master/images/page1.png)

### 使用方法
导入头文件：
```
import {
    redux_upload, //HOC
    UploadEventEmitter, //监听上传进度
    hasAllsccess, //判断是否全部上传完成
    getUpdateItemID, //获取上传成功后的资源id
    getUploadData, //通过uri获取上传状态
    getUploadedCount, //获取成功上传的数量
    getFailedCount, //获取上传失败的数量
    getWattingCount, //获取等待上传的数量
} from './component/upload'

//HOC
Supplement = redux_upload({
    upload: SupplementUploadKey, //上传队列的唯一标识符
})(Supplement)

```
选择图片时添加和删除上传队列中的图片：
```
    _selectImage = () => {
        ImagePicker.showImagePicker(ImagePickerOptions, (response) => {
            if(response.uri) {
                //name为外部对图片设置的名称，保证队列里面图片的唯一性
                const {name} = this.props
                ...
                this.props.deleteUploadItem(name)
                this.props.pushUploadItem(response.uri, name)
            }
        })
    }
```
开始上传图片：
```
    _onPress = () => {
        ...
        this.props.startUpload()
    }
```
监听图片是否上传成功：
```
let NextButton = class extends Component{
    uploadCompletesub: any

    componentDidMount() {
        this.uploadCompletesub = UploadEventEmitter.addCompleteListener((upload) => {
            if(upload === SupplementUploadKey){
                if(this.props.uploadSuccess) {
                    const {handleSubmit} = this.props
                    handleSubmit(this._submit)()
                } else {
                    this.props.formStopSubmit(null)
                    ToastAndroid.show('图片上传失败', ToastAndroid.SHORT)
                }
            }
        })
    }

    componentWillUnmount() {
        UploadEventEmitter.removeSubscription(this.uploadCompletesub)
    }

    _onPress = () => {
        this.props.formStartSubmit()
        this.props.startUpload()
    }

    _submit = (values) => {
        const fkb_photo_hz = getUpdateItemID(this.props.uploadObj, "accountHostUri")
        const fkb_photo_br = getUpdateItemID(this.props.uploadObj, "accountSelfUri")
        const xl_photo = getUpdateItemID(this.props.uploadObj, "educationUri")
        const sd_photo = getUpdateItemID(this.props.uploadObj, "sceneUri")
        const params = {
            fkb_photo_hz,
            fkb_photo_br,
            xl_photo,
            sd_photo,
        }
        this.props.formStopSubmit(null)
        //拿到服务返回的资源id，提交表单
        // this.props.gotoVerification({...this.props.applyRequestParams, ...params})
        this.props.formStopSubmit(null)
    }

    render() {
        const { submitting, valid } = this.props

        return (
            <SubmitButton
                enable = {!submitting && valid}
                text = {'下一步'}
                onPress = {this._onPress}
            />
        )
    }
}

NextButton = connect(
    (state) => {
        return {
            uploadSuccess: hasAllsccess(state, SupplementUploadKey),
        }
    },
    (dispatch) => ({
        formStartSubmit: () => dispatch(startSubmit(SupplementFormKey)),
        formStopSubmit: (error) => dispatch(stopSubmit(SupplementFormKey, error)),
    })
)(NextButton)
```
监听上传进度：
```
let UploadLoading = class extends Component {
    render() {
        return (
            <Loading
                show={this.props.show}
                text={`${this.props.uploadedCount}/${this.props.totalCount}`}
            />
        )
    }
}

UploadLoading = connect(
    (state) => {
        const uploadedCount = getUploadedCount(state, SupplementUploadKey)
        const wattingCount = getWattingCount(state, SupplementUploadKey)
        const failedCount = getFailedCount(state, SupplementUploadKey)
        const totalCount = uploadedCount + wattingCount + failedCount
        return {
            uploadedCount: uploadedCount,
            totalCount: totalCount,
            uploading: true,
        }
    },
    null,
)(UploadLoading)
```

### 使用到的第三方库
用来选取图片或拍照：
"react-native-image-picker"
https://github.com/react-community/react-native-image-picker
用来快速集成表单：
"redux-form"
https://github.com/erikras/redux-form
用来快速写action：
"redux-actions"
https://redux-actions.js.org/
用来在reducer中实现数据不可变性：
"immutable"
http://facebook.github.io/immutable-js/docs/
redux的异步请求中间件：
"redux-thunk"
https://github.com/gaearon/redux-thunk
