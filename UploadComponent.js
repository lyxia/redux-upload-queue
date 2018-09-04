//@flow
//upload hoc

import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as UploadActions from './UploadActions'

// export let config = {}

// uploadApi: null, //图片上传api ie. uploadImageWithPost(item.filepath, item.name)
// getUUIDFuc: null, //获取图片上传成功后的唯一标识符 ie.getUUID(model) => string
//管理上传队列
export default function (options) {
    return function (HOCCompon) {
        let Upload = class extends Component {
            componentDidMount() {
                // config[options.upload] = options
                this.props.registerUpload({
                    upload: options.upload,
                })
            }

            componentWillUnmount() {
                this.props.destroyUpload({ upload: options.upload })
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
                const uploadConfig = options.config || {
                    uploadApi: options.uploadApi,
                    isSuccess: options.isSuccess,
                    getUUIDFuc: options.getUUIDFuc,
                };
                return this.props.upload(options.upload, uploadConfig)
            }

            _uploadCancle = () => {
                this.props.uploadCancle(options.upload)
            }

            _cleanUpload = () => {
                this.props.cleanUpload({ upload: options.upload })
            }

            render() {
                return (
                    <HOCCompon
                        {...this.props}
                        pushUploadItem={this._pushUploadItem}
                        startUpload={this._startUpload}
                        deleteUploadItem={this._deleteUploadItem}
                        uploadCancle={this._uploadCancle}
                        cleanUpload={this._cleanUpload}
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
