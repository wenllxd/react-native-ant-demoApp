import React, { Component } from "react";
import {
    View,
    AsyncStorage,
    SafeAreaView,
    Image,
    StyleSheet,
    Text
} from "react-native";

const mine1 = require("../../images/mine1.png");
const mine2 = require("../../images/mine2.png");

// 我的--个人中心页面
export default class MineScene extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    static navigationOptions = {
        tabBarLabel: "我的",
        tabBarIcon: ({ focused }) => {
            if (focused) {
                return <Image style={styles.tabBarIcon} source={mine2} />;
            }
            return <Image style={styles.tabBarIcon} source={mine1} />;
        }
    };
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text>个人中心</Text>
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
