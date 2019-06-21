import React, { Component } from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import defaultImg from "../assets/images/default1.jpeg";

// 用户头像组件
export default class UserAvatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.img} source={defaultImg} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20
    }
});
