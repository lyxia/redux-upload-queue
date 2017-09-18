//@flow

import React, {Component} from 'react'

import {
    View,
    Modal,
    StyleSheet,
    ActivityIndicator,
    Text,
} from 'react-native'

export default class LoadingView extends Component {
    _onRequestClose = () => {

    }

    render() {
        const {show, text} = this.props

        return (
            <Modal
                animationType="none"
                onRequestClose={this._onRequestClose}
                transparent={true}
                visible={show}
            >
                <View style={styles.root}>
                    <View style={styles.background}>
                        <ActivityIndicator
                            animating={show}
                            style={[styles.centering]}
                            color={'white'}
                            size="large"
                        />
                        {text ? <Text style={{color: 'white'}}>{text}</Text> : null}
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    background: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
