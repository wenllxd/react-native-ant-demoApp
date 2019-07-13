import React, { Component } from "react";
import { TextInput, Platform } from "react-native";

// 首页
export default class MyTextInput extends Component {
    shouldComponentUpdate(nextProps) {
        return (
            Platform.OS !== "ios" ||
            (this.props.value === nextProps.value &&
                (nextProps.defaultValue == undefined ||
                    nextProps.defaultValue == "")) ||
            (this.props.defaultValue === nextProps.defaultValue &&
                (nextProps.value == undefined || nextProps.value == ""))
        );
    }

    render() {
        return <TextInput {...this.props} />;
    }
}
