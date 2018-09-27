import config, {store, Foo} from './UploadConfig'
import uploadComponent from '../UploadComponent'

import React from 'react'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme';    

afterEach(() => {
    store.clearActions()
    fetch.resetMocks()
})

test('uploadComponent new', () => {
    fetch.mockResponseOnce(JSON.stringify({ error: null, id: '123456' }))
    
    const Component = uploadComponent({ upload: 'uploadKey', config: config })(Foo)
    const componentWrap = shallow(
        <Component store={store}/>
    )
    const fooWrap = componentWrap.shallow()
    const fooProps = fooWrap.props()
    fooProps.pushUploadItem('fileOnePath', 'fileOne')
    return fooProps.startUpload().then(() => {
        expect(store.getActions()).toMatchSnapshot()
    })
})

test('uploadComponent old', () => {
    fetch.mockResponseOnce(JSON.stringify({ error: null, id: '123456' }))
    
    const Component = uploadComponent({
        upload: 'uploadKey',
        uploadApi: config.uploadApi, //api.uploadImageWithPost
        getUUIDFuc: config.getUUIDFuc,
        isSuccess: config.isSuccess,
    })(Foo)
    const componentWrap = shallow(
        <Component store={store}/>
    )
    const fooWrap = componentWrap.shallow()
    const fooProps = fooWrap.props()
    fooProps.pushUploadItem('fileOnePath', 'fileOne')
    return fooProps.startUpload().then(() => {
        expect(store.getActions()).toMatchSnapshot()
    })
})

