import * as UPloadActions from '../UploadActions'
import UploadReducer from '../UploadReducer'
import {Upload, UploadItem} from '../Data'
import {Map, List} from 'immutable'

describe("upload component reducer test", () => {
    describe("one file upload", () => {
        let currentState = Map({})
        beforeAll(() => {
            currentState = UploadReducer(currentState, UPloadActions.registerUpload({upload: 'uploadTestKey'}))
            expect(currentState).toMatchSnapshot()
        })
    
        afterAll(() => {
            currentState = UploadReducer(currentState, UPloadActions.destroyUpload({upload: 'uploadTestKey'}))
            expect(currentState).toMatchSnapshot()
        })
    
        test("handler pushItem", () => {
                let state = UploadReducer(currentState, UPloadActions.pushUploadItem({upload: 'uploadTestKey', name: 'fileOne', filePath: 'fileOnePath'}))
                state = UploadReducer(state, UPloadActions.pushUploadItem({upload: 'uploadNoExsitKey', name: 'fileOne', filePath: 'fileOnePath'}))
                expect(state).toMatchSnapshot()
        })

        test("handle deleteItem", () => {
            let state = UploadReducer(currentState, UPloadActions.pushUploadItem({upload: 'uploadTestKey', name: 'fileOne', filePath: 'fileOnePath'}))
            expect(state).toMatchSnapshot()
            state = UploadReducer(currentState, UPloadActions.deleteUploadItem({upload: 'uploadTestKey', name: 'fileOne'}))
            expect(state).toMatchSnapshot()
        })

        test("handle upload success", () => {
            let state = UploadReducer(currentState, UPloadActions.pushUploadItem({upload: 'uploadTestKey', name: 'fileOne', filePath: 'fileOnePath'}))
            expect(state).toMatchSnapshot()
            state = UploadReducer(state, UPloadActions.startUpload({upload: 'uploadTestKey'}))
            expect(state).toMatchSnapshot()
            state = UploadReducer(state, UPloadActions.startuploadItem({upload: 'uploadTestKey'}))
            expect(state).toMatchSnapshot()
            state = UploadReducer(state, UPloadActions.uploadItemSuccess({upload: 'uploadTestKey', id: '12345'}))
            expect(state).toMatchSnapshot()
            state = UploadReducer(state, UPloadActions.uploadComplete({upload: 'uploadTestKey'}))
            expect(state).toMatchSnapshot()
            
        })

        test("handler upload failed", () => {
            let state = UploadReducer(currentState, UPloadActions.pushUploadItem({upload: 'uploadTestKey', name: 'fileOne', filePath: 'fileOnePath'}))
            state = UploadReducer(state, UPloadActions.startUpload({upload: 'uploadTestKey'}))
            expect(state).toMatchSnapshot()
            state = UploadReducer(state, UPloadActions.startuploadItem({upload: 'uploadTestKey'}))
            expect(state).toMatchSnapshot()
            state = UploadReducer(state, UPloadActions.uploadItemFailed({upload: 'uploadTestKey'}))
            expect(state).toMatchSnapshot()
            state = UploadReducer(state, UPloadActions.uploadComplete({upload: 'uploadTestKey'}))
            expect(state).toMatchSnapshot()
        })

        test("handler reupload success", () => {
            let state = UploadReducer(currentState, UPloadActions.pushUploadItem({upload: 'uploadTestKey', name: 'fileOne', filePath: 'fileOnePath'}))
            state = UploadReducer(state, UPloadActions.startUpload({upload: 'uploadTestKey'}))
            state = UploadReducer(state, UPloadActions.startuploadItem({upload: 'uploadTestKey'}))
            state = UploadReducer(state, UPloadActions.uploadItemFailed({upload: 'uploadTestKey'}))
            state = UploadReducer(state, UPloadActions.uploadComplete({upload: 'uploadTestKey'}))
            expect(state).toMatchSnapshot()
            state = UploadReducer(state, UPloadActions.startUpload({upload: 'uploadTestKey'}))
            expect(state).toMatchSnapshot()
            state = UploadReducer(state, UPloadActions.startuploadItem({upload: 'uploadTestKey'}))
            state = UploadReducer(state, UPloadActions.uploadItemSuccess({upload: 'uploadTestKey', id: '12345'}))
            state = UploadReducer(state, UPloadActions.uploadComplete({upload: 'uploadTestKey'}))
            expect(state).toMatchSnapshot()
        })
    })
    describe("mult file upload", () => {
        let currentState = Map({})
        beforeAll(() => {
            currentState = UploadReducer(currentState, UPloadActions.registerUpload({upload: 'uploadTestMulKey'}))
            expect(currentState).toMatchSnapshot()
        })

        afterAll(() => {
            currentState = UploadReducer(currentState, UPloadActions.destroyUpload({upload: 'uploadTestMulKey'}))
            expect(currentState).toMatchSnapshot()
        })
        test("handle push mult files", () => {
            let state = UploadReducer(currentState, UPloadActions.pushUploadItem({upload: 'uploadTestMulKey', name: 'fileOne', filePath: 'fileOnePath'}))
            state = UploadReducer(state, UPloadActions.pushUploadItem({upload: 'uploadTestMulKey', name: 'fileTwo', filePath: 'fileTwoPath'}))
            state = UploadReducer(state, UPloadActions.pushUploadItem({upload: 'uploadTestMulKey', name: 'fileThree', filePath: 'fileThreePath'}))
            expect(state).toMatchSnapshot()
        })

        test("handle delete files", () => {
            let state = UploadReducer(currentState, UPloadActions.pushUploadItem({upload: 'uploadTestMulKey', name: 'fileOne', filePath: 'fileOnePath'}))
            state = UploadReducer(state, UPloadActions.pushUploadItem({upload: 'uploadTestMulKey', name: 'fileTwo', filePath: 'fileTwoPath'}))
            state = UploadReducer(state, UPloadActions.pushUploadItem({upload: 'uploadTestMulKey', name: 'fileThree', filePath: 'fileThreePath'}))
            expect(state).toMatchSnapshot()
            state = UploadReducer(state, UPloadActions.deleteUploadItem({upload: 'uploadTestMulKey', name: 'fileOne'}))
            expect(state).toMatchSnapshot()
        })

        test("handle upload successed", () => {
            let state = UploadReducer(currentState, UPloadActions.pushUploadItem({upload: 'uploadTestMulKey', name: 'fileOne', filePath: 'fileOnePath'}))
            state = UploadReducer(state, UPloadActions.pushUploadItem({upload: 'uploadTestMulKey', name: 'fileTwo', filePath: 'fileTwoPath'}))
            state = UploadReducer(state, UPloadActions.pushUploadItem({upload: 'uploadTestMulKey', name: 'fileThree', filePath: 'fileThreePath'}))
            expect(state).toMatchSnapshot()
            state = UploadReducer(state, UPloadActions.startUpload({upload: 'uploadTestMulKey'}))
            expect(state).toMatchSnapshot()
            state = UploadReducer(state, UPloadActions.startuploadItem({upload: 'uploadTestMulKey'}))
            expect(state).toMatchSnapshot()
            state = UploadReducer(state, UPloadActions.uploadItemSuccess({upload: 'uploadTestMulKey', id: '12345'}))
            expect(state).toMatchSnapshot()
            state = UploadReducer(state, UPloadActions.startuploadItem({upload: 'uploadTestMulKey'}))
            expect(state).toMatchSnapshot()
            state = UploadReducer(state, UPloadActions.uploadItemSuccess({upload: 'uploadTestMulKey', id: '123456'}))
            expect(state).toMatchSnapshot()
            state = UploadReducer(state, UPloadActions.startuploadItem({upload: 'uploadTestMulKey'}))
            expect(state).toMatchSnapshot()
            state = UploadReducer(state, UPloadActions.uploadItemSuccess({upload: 'uploadTestMulKey', id: '1234567'}))
            expect(state).toMatchSnapshot()
            state = UploadReducer(state, UPloadActions.uploadComplete({upload: 'uploadTestMulKey'}))
            expect(state).toMatchSnapshot()
        })

        test("handle upload failed", () => {
            let state = UploadReducer(currentState, UPloadActions.pushUploadItem({upload: 'uploadTestMulKey', name: 'fileOne', filePath: 'fileOnePath'}))
            state = UploadReducer(state, UPloadActions.pushUploadItem({upload: 'uploadTestMulKey', name: 'fileTwo', filePath: 'fileTwoPath'}))
            state = UploadReducer(state, UPloadActions.pushUploadItem({upload: 'uploadTestMulKey', name: 'fileThree', filePath: 'fileThreePath'}))
            expect(state).toMatchSnapshot()
            state = UploadReducer(state, UPloadActions.startUpload({upload: 'uploadTestMulKey'}))
            expect(state).toMatchSnapshot()
            state = UploadReducer(state, UPloadActions.startuploadItem({upload: 'uploadTestMulKey'}))
            expect(state).toMatchSnapshot()
            state = UploadReducer(state, UPloadActions.uploadItemFailed({upload: 'uploadTestMulKey'}))
            expect(state).toMatchSnapshot()
            state = UploadReducer(state, UPloadActions.startuploadItem({upload: 'uploadTestMulKey'}))
            expect(state).toMatchSnapshot()
            state = UploadReducer(state, UPloadActions.uploadItemSuccess({upload: 'uploadTestMulKey', id: '123456'}))
            expect(state).toMatchSnapshot()
            state = UploadReducer(state, UPloadActions.startuploadItem({upload: 'uploadTestMulKey'}))
            expect(state).toMatchSnapshot()
            state = UploadReducer(state, UPloadActions.uploadItemFailed({upload: 'uploadTestMulKey'}))
            expect(state).toMatchSnapshot()
            state = UploadReducer(state, UPloadActions.uploadComplete({upload: 'uploadTestMulKey'}))
            expect(state).toMatchSnapshot()
        })

        test("hanlde reupload successed", () => {
            let state = UploadReducer(currentState, UPloadActions.pushUploadItem({upload: 'uploadTestMulKey', name: 'fileOne', filePath: 'fileOnePath'}))
            state = UploadReducer(state, UPloadActions.pushUploadItem({upload: 'uploadTestMulKey', name: 'fileTwo', filePath: 'fileTwoPath'}))
            state = UploadReducer(state, UPloadActions.pushUploadItem({upload: 'uploadTestMulKey', name: 'fileThree', filePath: 'fileThreePath'}))
            state = UploadReducer(state, UPloadActions.startUpload({upload: 'uploadTestMulKey'}))
            state = UploadReducer(state, UPloadActions.startuploadItem({upload: 'uploadTestMulKey'}))
            state = UploadReducer(state, UPloadActions.uploadItemFailed({upload: 'uploadTestMulKey'}))
            state = UploadReducer(state, UPloadActions.startuploadItem({upload: 'uploadTestMulKey'}))
            state = UploadReducer(state, UPloadActions.uploadItemSuccess({upload: 'uploadTestMulKey', id: '123456'}))
            state = UploadReducer(state, UPloadActions.startuploadItem({upload: 'uploadTestMulKey'}))
            state = UploadReducer(state, UPloadActions.uploadItemFailed({upload: 'uploadTestMulKey'}))
            state = UploadReducer(state, UPloadActions.uploadComplete({upload: 'uploadTestMulKey'}))
            expect(state).toMatchSnapshot()

            state = UploadReducer(state, UPloadActions.startUpload({upload: 'uploadTestMulKey'}))
            expect(state).toMatchSnapshot()
            state = UploadReducer(state, UPloadActions.startuploadItem({upload: 'uploadTestMulKey'}))
            state = UploadReducer(state, UPloadActions.uploadItemSuccess({upload: 'uploadTestMulKey', id: '1234567'}))
            state = UploadReducer(state, UPloadActions.startuploadItem({upload: 'uploadTestMulKey'}))
            state = UploadReducer(state, UPloadActions.uploadItemSuccess({upload: 'uploadTestMulKey', id: '1234568'}))
            state = UploadReducer(state, UPloadActions.uploadComplete({upload: 'uploadTestMulKey'}))
            expect(state).toMatchSnapshot()
        })
    })
    
})