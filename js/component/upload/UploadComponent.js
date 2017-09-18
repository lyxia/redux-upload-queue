//@flow
//upload hoc

import React, {Component} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {hasAllsccess} from './Util'

import * as UploadActions from './UploadActions'

//管理上传队列
export default function(options) {
    return function(HOCCompon) {
        let Upload = class extends Component {
            componentDidMount() {
                this.props.registerUpload({upload: options.upload})
            }

            componentWillUnmount() {
                this.props.destroyUpload({upload: options.upload})
            }

            _pushUploadItem = (filePath, name) => {
                this.props.pushUploadItem({
                    upload: options.upload,
                    filePath: filePath,
                    name: name,
                })
            }

            _deleteUploadItem = (name) => {
                this.props.deleteUploadItem({
                    upload: options.upload,
                    name: name,
                })
            }

            _startUpload = () => {
                this.props.upload(options.upload)
            }

            _uploadCancle = () => {
                this.props.uploadCancle(options.upload)
            }

            render() {
                return (
                    <HOCCompon
                        {...this.props}
                        pushUploadItem = {this._pushUploadItem}
                        startUpload = {this._startUpload}
                        deleteUploadItem = {this._deleteUploadItem}
                        uploadCancle = {this._uploadCancle}
                    />
                )
            }
        }

        Upload = connect(
            null,
            dispatch => bindActionCreators(UploadActions, dispatch)
        )(Upload)

        return Upload
    }
}
