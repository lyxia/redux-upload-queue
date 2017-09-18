//@flow

import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
} from 'react-native'

import {
    buttonBgColor_gray,
    tintColor,
    color_white,
} from '../common/styles.js'

export default class SubmitButton extends Component {
    _onPress = () => {
        const {enable, onPress} = this.props

        if(enable) {
            onPress()
        }
    }

    render() {
        const {enable, text, style} = this.props

        return (
            <TouchableWithoutFeedback onPress={this._onPress}>
                <View style={[enable ? styles.enable : styles.noEnable, style]}>
                    <Text style={styles.text}>{text}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    enable: {
        backgroundColor: tintColor,
        alignItems: 'center',
    },
    noEnable: {
        backgroundColor: buttonBgColor_gray,
        alignItems: 'center',
    },
    text: {
        color: color_white,
        fontSize: 18,
        paddingVertical: 15,
    },
})