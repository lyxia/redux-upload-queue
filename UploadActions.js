//@flow

import {createAction} from 'redux-actions'

import UploadEventEmitter from './UploadEventEmitter'

import {config} from './UploadComponent'

export const pushUploadItem = createAction('Upload/pushItem')
export const deleteUploadItem = createAction('Upload/deleteItem')
export const cleanUpload = createAction('Upload/cleanUpload')
export const startuploadItem = createAction('Upload/startUploadItem')
export const uploadItemFailed = createAction('Upload/failedUploadItem')
export const uploadItemSuccess = createAction('Upload/successUploadItem')

export const startUpload = createAction('Upload/startUpload')
export const uploadComplete = createAction('Upload/uploadComplete')

export const uploadCancle = createAction('Upload/uploadCancle')
export const registerUpload = createAction('Upload/registerUpload')
export const destroyUpload = createAction('Upload/destroyUpload')

export function upload(name, config) {
    return (dispatch, getState) => {
        const state = getState()
        if(state.upload.get(name)) {
            if(!state.upload.get(name).uploading) {
                //开始上传
                dispatch(startUpload({upload: name}))
                return uploadNextItem(name, dispatch, getState, config)
            }
        }
        return Promise.resolve()
    }
}

function uploadItem(name, item, dispatch, getState, config) {
    dispatch(startuploadItem({upload: name}))
    return config.uploadApi(item.filepath, item.name)
        .then((model) => {
            if(config.isSuccess(model)) {
                //fileName
                dispatch(uploadItemSuccess({upload: name, id:config.getUUIDFuc(model)}))
            } else {
                dispatch(uploadItemFailed({upload: name}))
            }
            return uploadNextItem(name, dispatch, getState, config)
        })
        .catch((error) => {
            dispatch(uploadItemFailed({upload: name}))
            return uploadNextItem(name, dispatch, getState, config)
        })
}

function getNextUploadItem(name, getState) {
    const state = getState()
    const upload = state.upload.get(name)
    if(!upload || upload.cancle) return null

    return upload.wattingQueue.first()
}

function uploadNextItem(name, dispatch, getState, config) {
    let nextItem = getNextUploadItem(name, getState)
    if(nextItem) {
        return uploadItem(name, nextItem, dispatch, getState, config)
    } else {
        dispatch(uploadComplete({upload: name}))
        //发送事件
        UploadEventEmitter.emitComplete(name)
        return Promise.resolve()
    }
}