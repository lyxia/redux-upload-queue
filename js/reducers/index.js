//@flow

import {combineReducers} from 'redux'

import {reducer as formReducer} from 'redux-form'
import {UploadReducer} from '../component/upload'

export default combineReducers({
    form: formReducer,
    upload: UploadReducer,
});