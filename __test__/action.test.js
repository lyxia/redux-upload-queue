import {store} from './UploadConfig'
import * as UploadActions from '../UploadActions'

afterEach(() => {
  store.clearActions()
})

it('register upload action' , () => {
  store.dispatch(UploadActions.registerUpload({upload: 'uploadKey'}))
  expect(store.getActions()).toMatchSnapshot()
})

it('destroy upload action', () => {

  store.dispatch(UploadActions.destroyUpload({upload: 'uploadTestKey'}))
  expect(store.getActions()).toMatchSnapshot()
})

it('push upload item action', () => {
 store.dispatch(UploadActions.pushUploadItem({upload: 'uploadKey', name: 'fileOne', filePath: 'filePathOne'}))
  expect(store.getActions()).toMatchSnapshot()
})

it('delete upload item action', () => {
  store.dispatch(UploadActions.deleteUploadItem({upload: 'uploadTestKey', name: 'fileOne'}))
  expect(store.getActions()).toMatchSnapshot()
})

it('start upload action', () => {
  store.dispatch(UploadActions.startUpload({upload: 'uploadTestKey'}))
  expect(store.getActions()).toMatchSnapshot()
})

it('start upload item action', () => {
  store.dispatch(UploadActions.startuploadItem({upload: 'uploadTestKey'}))
  expect(store.getActions()).toMatchSnapshot()
})

it('upload item success action', () => {
  store.dispatch(UploadActions.uploadItemSuccess({upload: 'uploadTestKey', id:'123456'}))
  expect(store.getActions()).toMatchSnapshot()
})

it('upload item failed action', () => {
  store.dispatch(UploadActions.uploadItemFailed({upload: 'uploadTestKey'}))
  expect(store.getActions()).toMatchSnapshot()
})

it('upload complete action', () => {
  store.dispatch(UploadActions.uploadComplete({upload: 'uploadTestKey'}))
  expect(store.getActions()).toMatchSnapshot()
})