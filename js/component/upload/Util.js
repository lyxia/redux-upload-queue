//@flow

export function getUploadData(state, upload) {
    const uploadObj = state.upload.get(upload)
    return uploadObj
}

export function getUploadedCount(state, upload) {
    const uploadObj = getUploadData(state, upload)
    if(uploadObj) {
        return uploadObj.uploadedQueue.size
    }
    return 0
}

export function getWattingCount(state, upload) {
    const uploadObj = getUploadData(state, upload)
    if(uploadObj) {
        return uploadObj.wattingQueue.size
    }
    return 0
}

export function getFailedCount(state, upload) {
    const uploadObj = getUploadData(state, upload)
    if(uploadObj) {
        return uploadObj.failedQueue.size
    }
    return 0
}

export function hasAllsccess(state, upload) {
    if(getWattingCount(state, upload) == 0 && getFailedCount(state, upload) == 0) {
        return true
    }
    return false
}

export function getUpdateItemID(uploadObj, name) {
    let id = ''
    if(uploadObj) {
        const uploadedQueue = uploadObj.get('uploadedQueue')
        uploadedQueue.forEach((value) => {
            if(value.get('name') === name) {
                id = value.get('id')
                return 
            }
        })
    }
    return id
}