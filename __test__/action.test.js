import * as UploadActions from '../UploadActions'
import config, {store} from './UploadConfig'

afterEach(() => {
  store.clearActions()
  fetch.resetMocks()
})

it('upload one file success action test', () => {
  fetch.mockResponseOnce(JSON.stringify({ error: null, id: '123456' }))

  store.dispatch(UploadActions.registerUpload({upload: 'uploadKey'}))
  store.dispatch(UploadActions.pushUploadItem({upload: 'uploadKey', name: 'fileOne', filePath: 'filePathOne'}))
  return store.dispatch(UploadActions.upload('uploadKey', config))
          .then(() => {
            expect(store.getActions()).toMatchSnapshot()
          })
})

it('upload one file fail action test', () => {
  fetch.mockResponseOnce(JSON.stringify({ error: new Error('fail') }))

  store.dispatch(UploadActions.registerUpload({upload: 'uploadKey'}))
  store.dispatch(UploadActions.pushUploadItem({upload: 'uploadKey', name: 'fileOne', filePath: 'filePathOne'}))
  return store.dispatch(UploadActions.upload('uploadKey', config))
          .then(() => {
            expect(store.getActions()).toMatchSnapshot()
          })
})

it('upload mult success action test', () => {
  fetch.mockResponse(JSON.stringify({ error: null, id: '123456' }))

  store.dispatch(UploadActions.registerUpload({upload: 'uploadKey'}))
  store.dispatch(UploadActions.pushUploadItem({upload: 'uploadKey', name: 'fileOne', filePath: 'filePathOne'}))
  store.dispatch(UploadActions.pushUploadItem({upload: 'uploadKey', name: 'fileTwo', filePath: 'filePathTwo'}))
  store.dispatch(UploadActions.pushUploadItem({upload: 'uploadKey', name: 'fileThree', filePath: 'filePathThree'}))
  return store.dispatch(UploadActions.upload('uploadKey', config))
          .then(() => {
            expect(store.getActions()).toMatchSnapshot()
          })
})

it('upload mult fail and reupload action test', () => {
  fetch.mockResponses(
    [
      JSON.stringify({ error: null, id: '123456' })
    ],
    [
      JSON.stringify({ error: null, id: '123456' })
    ],
    [
      JSON.stringify({ error: new Error('fail') })
    ],
    [
      JSON.stringify({ error: null, id: '123456' })
    ],
  )

  store.dispatch(UploadActions.registerUpload({upload: 'uploadKey'}))
  store.dispatch(UploadActions.pushUploadItem({upload: 'uploadKey', name: 'fileOne', filePath: 'filePathOne'}))
  store.dispatch(UploadActions.pushUploadItem({upload: 'uploadKey', name: 'fileTwo', filePath: 'filePathTwo'}))
  store.dispatch(UploadActions.pushUploadItem({upload: 'uploadKey', name: 'fileThree', filePath: 'filePathThree'}))
  return store.dispatch(UploadActions.upload('uploadKey', config))
          .then(() => {
            return store.dispatch(UploadActions.upload('uploadKey', config))
          })
          .then(() => {
            expect(store.getActions()).toMatchSnapshot()
          })
})
