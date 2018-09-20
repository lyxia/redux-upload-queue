import * as UPloadActions from '../UploadActions'
import UploadReducer from '../UploadReducer'
import {Upload, UploadItem, UPLOAD_STATE} from '../Data'
import {Map, List} from 'immutable'

describe("upload component reducer test", () => {
    it('register upload action will register a upload queue to state', () => {
        let currentState = Map({})
        currentState = UploadReducer(currentState, UPloadActions.registerUpload({upload: 'uploadTestKey'}))
        expect(currentState).toMatchSnapshot()
    })

    it('destroy upload action will remove upload queue from state', () => {
        let currentState = Map({
            'uploadTestKey': new Upload({
                name: 'uploadTestKey'
            })
        })
        currentState = UploadReducer(currentState, UPloadActions.destroyUpload({upload: 'uploadTestKey'}))
        expect(currentState).toMatchSnapshot()
    })

    it('push upload item action will add an uploadItem into upload\'s wattingQueue', () => {
        let currentState = Map({
            'uploadTestKey': new Upload({
                name: 'uploadTestKey'
            })
        })
        currentState = UploadReducer(currentState, UPloadActions.pushUploadItem({upload: 'uploadTestKey', name: 'fileOne', filePath: 'fileOnePath'}))
        expect(currentState).toMatchSnapshot()
    })

    it('delete upload item action will remove an uploadItem from upload\'s all queue', () => {
        //remove from wattingQueue
        let currentState = Map({
            'uploadTestKey': new Upload({
                name: 'uploadTestKey',
                wattingQueue: List([new UploadItem({
                    name: 'fileOne',
                    filepath: 'fileOnePath'
                })])
            })
        })
        currentState = UploadReducer(currentState, UPloadActions.deleteUploadItem({upload: 'uploadTestKey', name: 'fileOne'}))
        expect(currentState).toMatchSnapshot()
        //remove from uploadedQueue
        currentState = Map({
            'uploadTestKey': new Upload({
                name: 'uploadTestKey',
                uploadedQueue: List([new UploadItem({
                    name: 'fileOne',
                    filepath: 'fileOnePath',
                    id: '123456',
                    state: UPLOAD_STATE.UPLOADED,
                })])
            })
        })
        currentState = UploadReducer(currentState, UPloadActions.deleteUploadItem({upload: 'uploadTestKey', name: 'fileOne'}))
        expect(currentState).toMatchSnapshot()
        //remove from failedQueue
        currentState = Map({
            'uploadTestKey': new Upload({
                name: 'uploadTestKey',
                failedQueue: List([new UploadItem({
                    name: 'fileOne',
                    filepath: 'fileOnePath',
                    state: UPLOAD_STATE.FAILED,
                })])
            })
        })
        currentState = UploadReducer(currentState, UPloadActions.deleteUploadItem({upload: 'uploadTestKey', name: 'fileOne'}))
        expect(currentState).toMatchSnapshot()
        //remove item does not in any queue
        currentState = Map({
            'uploadTestKey': new Upload({
                name: 'uploadTestKey',
            })
        })
        currentState = UploadReducer(currentState, UPloadActions.deleteUploadItem({upload: 'uploadTestKey', name: 'fileOne'}))
        expect(currentState).toMatchSnapshot()
    })

    it('start upload action will combine upload\'s watting queue and failed queue then update upload\'s uploading state', () => {
        let currentState = Map({
            'uploadTestKey': new Upload({
                name: 'uploadTestKey',
                wattingQueue: List([
                    new UploadItem({
                        name: 'fileTwo',
                        filepath: 'fileTwoPath'
                    })
                ]),
                uploadedQueue: List([
                    new UploadItem({
                        name: 'fileThree',
                        filepath: 'fileThreePath'
                    }),
                ]),
                failedQueue: List([
                    new UploadItem({
                        name: 'fileOne',
                        filepath: 'fileOnePath'
                    }),
                ]),
            })
        })
        currentState = UploadReducer(currentState, UPloadActions.startUpload({upload: 'uploadTestKey'}))
        expect(currentState).toMatchSnapshot()
    })

    it('start upload item action will get the first item in upload\'s watting queue to start upload', () => {
        //update item in watting queue
        let currentState = Map({
            'uploadTestKey': new Upload({
                name: 'uploadTestKey',
                uploading: 'true',
                wattingQueue: List([
                    new UploadItem({
                        name: 'fileOne',
                        filepath: 'fileOnePath'
                    }),
                    new UploadItem({
                        name: 'fileTwo',
                        filepath: 'fileTwoPath'
                    })
                ])
            })
        })
        currentState = UploadReducer(currentState, UPloadActions.startuploadItem({upload: 'uploadTestKey'}))
        expect(currentState).toMatchSnapshot()
    })

    it('upload item success action will get the first item in upload\'s watting queue then update this some field and move it to uploaded queue', () => {
        let currentState = Map({
            'uploadTestKey': new Upload({
                name: 'uploadTestKey',
                uploading: 'true',
                wattingQueue: List([
                    new UploadItem({
                        name: 'fileOne',
                        filepath: 'fileOnePath'
                    }),
                    new UploadItem({
                        name: 'fileTwo',
                        filepath: 'fileTwoPath'
                    })
                ])
            })
        })
        currentState = UploadReducer(currentState, UPloadActions.uploadItemSuccess({upload: 'uploadTestKey', id: '12345'}))
        expect(currentState).toMatchSnapshot()
    })

    it('upload item failed action will get the first item in upload\'s watting queue then update this some field and move it to failedQueue queue', () => {
        let currentState = Map({
            'uploadTestKey': new Upload({
                name: 'uploadTestKey',
                uploading: 'true',
                wattingQueue: List([
                    new UploadItem({
                        name: 'fileOne',
                        filepath: 'fileOnePath'
                    }),
                    new UploadItem({
                        name: 'fileTwo',
                        filepath: 'fileTwoPath'
                    })
                ])
            })
        })
        currentState = UploadReducer(currentState, UPloadActions.uploadItemFailed({upload: 'uploadTestKey'}))
        expect(currentState).toMatchSnapshot()
    })

    it('upload complete action will set upload\'s uploading field to false', () => {
        let currentState = Map({
            'uploadTestKey': new Upload({
                name: 'uploadTestKey',
                uploading: 'false',
            })
        })
        currentState = UploadReducer(currentState, UPloadActions.uploadComplete({upload: 'uploadTestKey'}))
        expect(currentState).toMatchSnapshot()
    })
})