import React, { Component } from "react";
import { SafeAreaView, Image, View, StyleSheet, Text } from "react-native";

// 求
export default class DemandScene extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>123</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: "#555",
        backgroundColor: "#eee"
    },
    tabBarIcon: {
        width: 20,
        height: 20
    }
});
