import React, { Component } from "react";
import { SafeAreaView, View, Image, StyleSheet, Text } from "react-native";

const image1 = require("../../images/home1.png");
const image2 = require("../../images/home2.png");

// 首页
export default class HomeScene extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {};
    }

    static navigationOptions = {
        tabBarLabel: "首页",
        tabBarIcon: ({ focused }) => {
            if (focused) {
                return <Image style={styles.tabBarIcon} source={image2} />;
            }
            return <Image style={styles.tabBarIcon} source={image1} />;
        }
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text>首页</Text>
                </View>
            </SafeAreaView>
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
        width: 32,
        height: 32
    }
});
