//@flow

import React, {Component} from 'react'

import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    ToastAndroid,
} from 'react-native'

import ImagePicker from 'react-native-image-picker'
import {
    reduxForm,
    getFormValues,
    change,
    startSubmit,
    stopSubmit,
    registerField,
    unregisterField,
    Field,
} from 'redux-form'

import SubmitButton from './component/SubmitButton'
import {
    redux_upload,
    UploadEventEmitter,
    hasAllsccess,
    getUpdateItemID,
    getUploadData,
    getUploadedCount,
    getFailedCount,
    getWattingCount,
} from './component/upload'
import Loading from './component/Loading'

import {
    lineColor,
    tintColor,
} from './common/styles'

import {
    required,
} from './component/form/Validafunctions'

import {connect} from 'react-redux'

const ImagePickerOptions = {
    title: null,
    cancelButtonTitle: "取消",
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '从相册中获取',
    permissionDenied: {
        title: '获取相机权限',
        text: '从相机和图库中获取图片',
        okTitle: '允许',
        reTryTitle: '拒绝',
    },
    quality: 0.3,
}

const SupplementFormKey = 'supplementApplyInfo'
const SupplementUploadKey = 'supplementApplyInfo'

let ImageSelect = class extends Component {
    componentDidMount() {
        this.props.registerField(this.props.name)
    }

    componentWillUnmount() {
        this.props.unregisterField(this.props.name)
    }

    _selectImage = () => {
        ImagePicker.showImagePicker(ImagePickerOptions, (response) => {
            if(response.uri) {
                const {name} = this.props
                this.props.change(name, response.uri)
                this.props.deleteUploadItem(name)
                this.props.pushUploadItem(response.uri, name)
            }
        })
    }

    render() {
        const {text, uri} = this.props

        return (
            <TouchableWithoutFeedback onPress={this._selectImage}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 15,
                }}>
                    {
                        uri ? (
                            <Image
                                style={{
                                    width: 50,
                                    height: 50,
                                }}
                                resizeMode="stretch"
                                source={{uri:uri, isStatic: true}}
                            />
                        ) : (
                            <Image source={require('./resources/photo.png')}/>
                        )
                    }
                    <Text style={{
                        fontSize: 12,
                        color: '#999999',
                        marginTop: 3,
                    }}>{text}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

ImageSelect = connect(
    (state, props) => {
        const values = getFormValues(SupplementFormKey)(state) || {}
        return {
            uri: values[props.name]
        }
    },
    (dispatch) => ({
        change: (name, uri) => dispatch(change(SupplementFormKey, name, uri)),
        registerField: (name) => dispatch(registerField(SupplementFormKey, name, 'Field')),
        unregisterField: (name) => dispatch(unregisterField(SupplementFormKey, name)),
    })

)(ImageSelect)

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
        const uploadedCount = getUploadedCount(state, SupplementUploadKey)
        const wattingCount = getWattingCount(state, SupplementUploadKey)
        const failedCount = getFailedCount(state, SupplementUploadKey)
        const totalCount = uploadedCount + wattingCount + failedCount
        return {
            uploadSuccess: hasAllsccess(state, SupplementUploadKey),
            uploadObj: getUploadData(state, SupplementUploadKey),
            uploadedCount: uploadedCount,
            totalCount: totalCount,
        }
    },
    (dispatch) => ({
        formStartSubmit: () => dispatch(startSubmit(SupplementFormKey)),
        formStopSubmit: (error) => dispatch(stopSubmit(SupplementFormKey, error)),
    })
)(NextButton)

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

let Supplement = class extends Component {
    _renderDes = (text) => {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <View style={styles.cricle}/>
                <Text style={{
                    fontSize: 15,
                    color: '#666666'
                }}>{text}</Text>
            </View>
        )
    }

    render() {
        const { submitting } = this.props

        return (
            <View style={styles.root}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.rowAndSpace}>
                        {this._renderDes('oooooo')}
                        <View style={styles.row}>
                            <ImageSelect
                                text="111"
                                name="accountHostUri"
                                pushUploadItem={this.props.pushUploadItem}
                                deleteUploadItem = {this.props.deleteUploadItem}
                            />
                            <ImageSelect
                                text="2222"
                                name="accountSelfUri"
                                pushUploadItem={this.props.pushUploadItem}
                                deleteUploadItem = {this.props.deleteUploadItem}
                            />
                        </View>
                    </View>
                    <View style={styles.rowAndSpace}>
                        {this._renderDes('oooooo')}
                        <ImageSelect
                            text="333"
                            name="educationUri"
                            pushUploadItem={this.props.pushUploadItem}
                            deleteUploadItem = {this.props.deleteUploadItem}
                        />
                    </View>
                    <View style={styles.rowAndSpace}>
                        {this._renderDes('oooooo')}
                        <ImageSelect
                            text="444"
                            name="sceneUri"
                            pushUploadItem={this.props.pushUploadItem}
                            deleteUploadItem = {this.props.deleteUploadItem}
                        />
                    </View>
                </ScrollView>
                <UploadLoading show={submitting}/>
                <NextButton {...this.props}/>
            </View>
        )
    }
}

function vaildateForm(values:Object, props:Object) {
    let error = {}
    error.accountHostUri = required(values.accountHostUri)
    error.accountSelfUri = required(values.accountSelfUri)
    error.educationUri = required(values.educationUri)
    error.sceneUri = required(values.sceneUri)
    return error
}

Supplement = reduxForm({
    form: SupplementFormKey,
    validate: vaildateForm,
})(Supplement)

Supplement = redux_upload({
    upload: SupplementUploadKey,
})(Supplement)

export default connect(
    (state) => ({

    }),
    (dispatch) => ({
        formChange: (name, value) => dispatch(change(SupplementFormKey, name, value)),
        formRegisterField: (name) => dispatch(registerField(SupplementFormKey, name, 'Field')),
        formUnregisterField: (name) => dispatch(unregisterField(SupplementFormKey, name)),
    })
)(Supplement)

const styles = StyleSheet.create({
    root: {
        flex: 1,
        marginTop: 10,
    },
    scrollView: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
    },
    rowAndSpace: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: lineColor,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    cricle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: tintColor,
        marginLeft: 20,
        marginRight: 10,
    },
})