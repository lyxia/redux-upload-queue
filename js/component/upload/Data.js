//flow

import {
    Record,
    List,
} from 'immutable'

export const UPLOAD_STATE = {
    NONE: 'none',
    WATTING: 'watting',
    UPLOADED: 'uploaded',
    UPLOADING: 'uploading',
    FAILED: 'failed',
}

export const UploadItem = Record({
    filepath: null, //文件地址
    state: UPLOAD_STATE.NONE, //状态
    id: null, //资源id
    name: null,
}, 'UploadItem')

export const Upload = Record({
    wattingQueue: List([]), //等待上传的队列
    uploadedQueue: List([]), //已经上传的对象集合
    failedQueue: List([]), //上传失败的集合
    uploading: false,
    cancle: false,
    name: null,
}, 'Upload')