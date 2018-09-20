import mockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import React, { Component } from 'react'
import { Text } from 'react-native'
import { combineReducers } from 'redux'
import UploadReducer from '../UploadReducer'

const rootReducer = combineReducers({
    upload: UploadReducer
})
let initState = {}
export const store = mockStore((actions) => {
    let currentState = initState
    actions.forEach(action => {
        currentState = rootReducer(currentState, action)
    });
    return currentState
})

export class Foo extends Component {
    render() {
        return (
            <Text test-id="foo">hello</Text>
        )
    }
}

const uploadApi = async (filePath, name) => {
    const res = await fetch('/endPoint')
    const json = await res.json()
    return json
}

const config = {
    uploadApi: uploadApi,
    isSuccess: jest.fn((model) => model.error == null),
    getUUIDFuc: jest.fn((model) => model.id)
}
export default config