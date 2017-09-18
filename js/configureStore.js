//@flow

import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';

import reducer from './reducers';

//config middlewars
const middlewares = [thunk];

const enhancer = compose(applyMiddleware(...middlewares));


export default function configureStore(initialState) {
    const store = createStore(reducer, initialState, enhancer);
    return store;
}