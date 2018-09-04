//@flow

import {handleActions} from 'redux-actions'

import {
    Upload,
    UploadItem,
    UPLOAD_STATE,
} from './Data'

import {
    pushUploadItem,
    deleteUploadItem,
    cleanUpload,
    startuploadItem,
    uploadItemSuccess,
    uploadItemFailed,

    startUpload,
    uploadComplete,

    uploadCancle,
    registerUpload,
    destroyUpload,
} from './UploadActions'

import {Map} from 'immutable'

export default handleActions({
    [pushUploadItem]: (state, action) => {
        const {upload, filePath, name} = action.payload
        let uploadObj = state.get(upload)
        if(!uploadObj) {
            return state
        }
        
        const uploadItem = new UploadItem({filepath: filePath, name:name})
        uploadObj = uploadObj.update('wattingQueue', (wattingQueue) => {
            return wattingQueue.push(uploadItem)
        })

        return state.set(upload, uploadObj)
    },
    [deleteUploadItem]: (state, action) => {
        const {upload, name} = action.payload
        let uploadObj = state.get(upload)
        if(!uploadObj || uploadObj.uploading) {
            return state
        }

        let hasFind = false
        let wattingQueue = uploadObj.get('wattingQueue')
        let size = wattingQueue.size
        for(let i = 0; i < size; i++) {
            if(wattingQueue.get(i).get('name') === name) {
                wattingQueue = wattingQueue.delete(i)
                hasFind = true
                uploadObj = uploadObj.set('wattingQueue', wattingQueue)
                break;
            }
        }

        if(!hasFind) {
            let failedQueue = uploadObj.get('failedQueue')
            let size = failedQueue.size
            for(let i = 0; i < size; i++) {
                if(failedQueue.get(i).get('name') === name) {
                    failedQueue = failedQueue.delete(i)
                    uploadObj = uploadObj.set('failedQueue', failedQueue)
                    hasFind = true
                    break;
                }
            }
        }

        if(!hasFind) {
            let uploadedQueue = uploadObj.get('uploadedQueue')
            let size = uploadedQueue.size
            for(let i = 0; i < size; i++) {
                if(uploadedQueue.get(i).get('name') === name) {
                    uploadedQueue = uploadedQueue.delete(i)
                    uploadObj = uploadObj.set('uploadedQueue', uploadedQueue)
                    hasFind = true
                    break;
                }
            }
        }

        return state.set(upload, uploadObj)
    },
    [cleanUpload]: (state, action) => {
        const {upload} = action.payload
        let uploadObj = state.get(upload)
        if(!uploadObj) return state

        console.log('cleanupload')

        return state.set(
            upload,
            new Upload({name: upload})
        )
    },
    [startuploadItem]: (state, action) => {
        const {upload} = action.payload
        let uploadObj = state.get(upload)
        if(!uploadObj) return state

        uploadObj = uploadObj.update(
            'wattingQueue',
            (wattingQueue) => wattingQueue.update(
                0,
                (value) => value.set('state', UPLOAD_STATE.UPLOADING)
            )
        )

        return state.set(upload, uploadObj)
    },
    [uploadItemSuccess]: (state, action) => {
        const {upload, id} = action.payload
        let uploadObj = state.get(upload)
        if(!uploadObj || uploadObj.cancle) return state

        let uploadItem = uploadObj.get('wattingQueue').first()
        uploadItem = uploadItem.set('state', UPLOAD_STATE.UPLOADED).set('id', id)

        uploadObj = uploadObj.update(
            'wattingQueue',
            (wattingQueue) => wattingQueue.shift()
        )

        uploadObj = uploadObj.update(
            'uploadedQueue',
            (uploadedQueue) => uploadedQueue.push(uploadItem)
        )

        return state.set(upload, uploadObj)
    },
    [uploadItemFailed]: (state, action) => {
        const {upload} = action.payload
        let uploadObj = state.get(upload)
        if(!uploadObj || uploadObj.cancle) return state

        let uploadItem = uploadObj.get('wattingQueue').first()
        uploadItem = uploadItem.set('state', UPLOAD_STATE.FAILED)

        uploadObj = uploadObj.update(
            'wattingQueue',
            (wattingQueue) => wattingQueue.shift()
        )

        uploadObj = uploadObj.update(
            'failedQueue',
            (failedQueue) => failedQueue.push(uploadItem)
        )

        return state.set(upload, uploadObj)
    },

    [startUpload]: (state, action) => {
        const {upload} = action.payload
        let uploadObj = state.get(upload)
        if(!upload) {
            return state
        }

        let wattingQueue = uploadObj.get('wattingQueue')
        let failedQueue = uploadObj.get('failedQueue')
        wattingQueue = wattingQueue.concat(failedQueue)
        let size = wattingQueue.size
        for(let i = 0; i < size; i++) {
            wattingQueue = wattingQueue.update(i, (value) => value.set('state', UPLOAD_STATE.WATTING))
        }

        failedQueue = failedQueue.clear()

        uploadObj = uploadObj
            .set('wattingQueue', wattingQueue)
            .set('failedQueue', failedQueue)
            .set('uploading', true)
            .set('cancle', false)

        return state.set(upload, uploadObj)
    },
    [uploadComplete]: (state, action) => {
        const {upload} = action.payload
        let uploadObj = state.get(upload)
        if(!uploadObj) return state

        uploadObj = uploadObj.set('uploading', false)
        return state.set(upload, uploadObj)
    },
    [uploadCancle]: (state, action) => {
        const {upload} = action.payload
        let uploadObj = state.get(upload)
        if(!uploadObj) return state

        uploadObj = uploadObj
            .set('uploading', false)
            .set('cancle', true)
        return state.set(upload, uploadObj)
    },
    [registerUpload]: (state, action) => {
        const {upload} = action.payload
        let uploadObj = state.get(upload)
        if(!uploadObj) {
            uploadObj = new Upload({
                name: upload,
            })
        }
        return state.set(upload, uploadObj)
    },
    [destroyUpload]: (state, action) => {
        const {upload} = action.payload
        let uploadObj = state.get(upload)
        if(!uploadObj) {
            return state
        }
        return state.delete(upload)
    },
}, Map({}))