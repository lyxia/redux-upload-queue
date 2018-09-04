import config, { store } from './UploadConfig'
import * as UploadActions from '../UploadActions'
import * as Util from '../Util'

const uploadName = 'uploadKey'
let state = null
beforeAll(() => {
    fetch.mockResponses(
        [
            JSON.stringify({ error: null, id: '123456' })
        ],
        [
            JSON.stringify({ error: new Error('fail') })
        ],
        [
            JSON.stringify({ error: null, id: '1234567' })
        ],
    )

    store.dispatch(UploadActions.registerUpload({ upload: uploadName }))
    store.dispatch(UploadActions.pushUploadItem({ upload: uploadName, name: 'fileOne', filePath: 'filePathOne' }))
    store.dispatch(UploadActions.pushUploadItem({ upload: uploadName, name: 'fileTwo', filePath: 'filePathTwo' }))
    store.dispatch(UploadActions.pushUploadItem({ upload: uploadName, name: 'fileThree', filePath: 'filePathThree' }))
    return store.dispatch(UploadActions.upload(uploadName, config))
        .then(() => {
            state = store.getState()
            return expect(state).toMatchSnapshot()
        })
})

afterAll(() => {
    store.clearActions()
    fetch.resetMocks()
})

test('upload Util getUploadData test', () => {
    expect(Util.getUploadData(state, uploadName)).toMatchSnapshot()
})

test('upload Util getUploadedCount test', () => {
    expect(Util.getUploadedCount(state, uploadName)).toMatchSnapshot()
})

test('upload Util getWattingCount test', () => {
    expect(Util.getWattingCount(state, uploadName)).toMatchSnapshot()
})

test('upload Util getFailedCount test', () => {
    expect(Util.getFailedCount(state, uploadName)).toMatchSnapshot()
})

test('upload Util hasAllsccess test', () => {
    expect(Util.hasAllsccess(state, uploadName)).toMatchSnapshot()
})

test('upload Util getUpdateItemID test', () => {
    const uploadObj = Util.getUploadData(state, uploadName)
    expect(Util.getUpdateItemID(uploadObj, 'fileOne')).toMatchSnapshot()
})

test('upload Util getUpdatedIDs test', () => {
    const uploadObj = Util.getUploadData(state, uploadName)
    expect(Util.getUpdatedIDs(uploadObj)).toMatchSnapshot()
})