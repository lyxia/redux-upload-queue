import * as Util from '../Util'
import {Upload, UploadItem, UPLOAD_STATE} from '../Data'
import {Map, List} from 'immutable'

const uploadName = 'uploadKey'
let state = {
    upload: Map({
        'uploadKey': new Upload({
            name: 'uploadKey',
            wattingQueue: List([]),
            uploadedQueue: List([
                new UploadItem({
                    name: 'fileThree',
                    filepath: 'fileThreePath',
                    state: UPLOAD_STATE.UPLOADED,
                    id: '123456',
                }),
                new UploadItem({
                    name: 'fileOne',
                    filepath: 'fileOnePath',
                    state: UPLOAD_STATE.UPLOADED,
                    id: '1234567',
                })
            ]),
            failedQueue: List([
                new UploadItem({
                    name: 'fileTwo',
                    filepath: 'fileTwoPath',
                    state: UPLOAD_STATE.FAILED,
                }),
            ]),
        })
    })
}

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