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
    getUpdatedIDs,
} from './Util'

import {
    pushUploadItem,
    deleteUploadItem,
    cleanUpload,
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
    getUpdatedIDs,

    pushUploadItem,
    deleteUploadItem,
    cleanUpload,
    registerUpload,
    destroyUpload,
    upload,
    uploadCancle,
}