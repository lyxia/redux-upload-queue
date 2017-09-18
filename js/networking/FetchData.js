//@flow

import {
    SERVER,
    UploadURL,
} from './ServiceConfig'

export function uploadImageWithPost(filePath, name) {
    const header = {
        'Content-Type':'multipart/form-data',
    }

    //create formData
    let formData = new FormData();
    let file = {uri: filePath, type: 'multipart/form-data', name: `${name}.jpg`};
    //视服务器要求的字段而定
    formData.append('imgFile', file)
    formData.append('type', 1)

    //send post request
    const url = SERVER + UploadURL
    let fetchPromise = fetch(url, {
        method: 'post',
        body: formData,
        headers: header,
    }).then((response) => {
        if(response.ok) {
            return response.json()
        } else {
            throw new Error('network error')
        }
    }).then((model) => {
        return model
    }).catch((error) => {
        throw error
    })
    return fetchPromise
}