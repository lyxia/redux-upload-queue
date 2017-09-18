//@flow

import {DeviceEventEmitter} from 'react-native'

const uploadEventEmitter = {
    emitComplete: (upload) => {
        DeviceEventEmitter.emit('upload/complete', upload)
    },
    addCompleteListener: (listener) => {
        return DeviceEventEmitter.addListener('upload/complete', listener)
    },
    removeSubscription: (subscription) => {
        DeviceEventEmitter.removeSubscription(subscription)
    }
}

export default uploadEventEmitter