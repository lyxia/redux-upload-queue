//@flow

import {DeviceEventEmitter,Platform} from 'react-native'
var events = require('events');
var EventEmitter = new events.EventEmitter();

const uploadEventEmitter = {
    emitComplete: (upload) => {
        if (Platform.OS === 'web') {
            EventEmitter.emit('edmoney/upload/complete', upload)
        } else {
            DeviceEventEmitter.emit('edmoney/upload/complete', upload)
        }

    },
    addCompleteListener: (listener) => {
        if (Platform.OS === 'web') {
            return EventEmitter.addListener('edmoney/upload/complete', listener)
        } else {
            return DeviceEventEmitter.addListener('edmoney/upload/complete', listener)
        }

    },
    removeSubscription: (subscription) => {
        if (Platform.OS === 'web') {
            EventEmitter.removeSubscription(subscription)
        } else {
            DeviceEventEmitter.removeSubscription(subscription)
        }

    }
}

export default uploadEventEmitter