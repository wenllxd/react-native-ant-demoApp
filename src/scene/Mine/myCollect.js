import React, { Component } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export default class MyCollect extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>我收藏的信息</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: "#555",
        backgroundColor: "#eee",
        //justifyContent: "center"
        alignItems: "center"
    }
});
