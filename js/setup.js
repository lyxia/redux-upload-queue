import {
    AppRegistry,
} from 'react-native'

import App from './App'

if (!__DEV__) {
    console = {
        log: () => { },
        error: () => { },
        info: () => { },
        warn: () => { },
    }
}

AppRegistry.registerComponent('ReduxUploadDemo', () => App);