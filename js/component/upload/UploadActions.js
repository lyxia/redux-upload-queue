//@flow

import {createAction} from 'redux-actions'

import {uploadImageWithPost} from '../../networking/FetchData'

import UploadEventEmitter from './UploadEventEmitter'

export const pushUploadItem = createAction('Upload/pushItem')
export const deleteUploadItem = createAction('Upload/deleteItem')
export const startuploadItem = createAction('Upload/startUploadItem')
export const uploadItemFailed = createAction('Upload/failedUploadItem')
export const uploadItemSuccess = createAction('Upload/successUploadItem')

export const startUpload = createAction('Upload/startUpload')
export const uploadComplete = createAction('Upload/uploadComplete')

export const uploadCancle = createAction('Upload/uploadCancle')
export const registerUpload = createAction('Upload/registerUpload')
export const destroyUpload = createAction('Upload/destroyUpload')

export function upload(name) {
    return (dispatch, getState) => {
        const state = getState()
        if(state.upload.get(name)) {
            if(!state.upload.get(name).uploading) {
                //开始上传
                dispatch(startUpload({upload: name}))
                uploadNextItem(name, dispatch, getState)
            }
        }
    }
}

function uploadItem(name, item, dispatch, getState) {
    dispatch(startuploadItem({upload: name}))
    uploadImageWithPost(item.filepath, item.name)
        .then((model) => {
            if(model.error == -1) {
                dispatch(uploadItemSuccess({upload: name, id:model.fileName}))
            } else {
                dispatch(uploadItemFailed({upload: name}))
            }
            uploadNextItem(name, dispatch, getState)
        })
        .catch((error) => {
            dispatch(uploadItemFailed({upload: name}))
            uploadNextItem(name, dispatch, getState)
        })
}

function getNextUploadItem(name, getState) {
    const state = getState()
    const upload = state.upload.get(name)
    if(!upload || upload.cancle) return null

    return upload.wattingQueue.first()
}

function uploadNextItem(name, dispatch, getState) {
    let nextItem = getNextUploadItem(name, getState)
    if(nextItem) {
        uploadItem(name, nextItem, dispatch, getState)
    } else {
        dispatch(uploadComplete({upload: name}))
        //发送事件
        UploadEventEmitter.emitComplete(name)
    }
}