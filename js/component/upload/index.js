//@flow

import UploadComponent from './UploadComponent'
import UploadReducer from './UploadReducer'
import UploadEventEmitter from './UploadEventEmitter'
import {
    hasAllsccess,
    getFailedCount,
    getWattingCount,
    getUploadedCount,
    getUploadData,
    getUpdateItemID,
} from './Util'

import {
    pushUploadItem,
    deleteUploadItem,
    registerUpload,
    destroyUpload,
    upload,
    uploadCancle,
} from './UploadActions.js'

const redux_upload = UploadComponent

export {
    redux_upload,
    UploadReducer,
    UploadEventEmitter,

    hasAllsccess,
    getFailedCount,
    getWattingCount,
    getUploadedCount,
    getUploadData,
    getUpdateItemID,

    pushUploadItem,
    deleteUploadItem,
    registerUpload,
    destroyUpload,
    upload,
    uploadCancle,
}