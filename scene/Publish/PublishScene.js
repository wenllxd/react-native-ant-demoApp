import React, { Component } from "react";
import { SafeAreaView, Image, View, StyleSheet, Text } from "react-native";

const publish1 = require("../../images/publish1.png");
const publish2 = require("../../images/publish2.png");

// 首页
export default class PublishScene extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {};
    }

    static navigationOptions = {
        tabBarLabel: "发布",
        tabBarIcon: ({ focused }) => {
            if (focused) {
                return <Image style={styles.tabBarIcon} source={publish2} />;
            }
            return <Image style={styles.tabBarIcon} source={publish1} />;
        }
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text>发布</Text>
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
        width: 24,
        height: 24
    }
});
