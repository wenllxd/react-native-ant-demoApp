import React, { Component } from "react";
import { SafeAreaView, View, Image, StyleSheet, Text } from "react-native";

const sell1 = require("../../images/sell1.png");
const sell2 = require("../../images/sell2.png");

// 首页
export default class SellScene extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {};
    }
    static navigationOptions = {
        tabBarLabel: "淘",
        tabBarIcon: ({ focused }) => {
            if (focused) {
                return <Image style={styles.tabBarIcon} source={sell2} />;
            }
            return <Image style={styles.tabBarIcon} source={sell1} />;
        }
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text>淘</Text>
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
        width: 22,
        height: 22
    }
});
