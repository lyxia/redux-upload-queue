//@flow

import React, {Component} from 'react'

import {Provider} from 'react-redux'

import configureStore from './configureStore'

import Supplement from './Supplement'

export const store = configureStore({})

export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <Supplement/>
            </Provider>
        );
    }
}