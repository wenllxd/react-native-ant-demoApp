import React, { Component } from "react";
import {
    View,
    AsyncStorage,
    SafeAreaView,
    Image,
    StyleSheet,
    Text
} from "react-native";

import mineIcon1 from "../../assets/images/mine1.png";
import mineIcon2 from "../../assets/images/mine2.png";

// 我的--个人中心页面
export default class AuthTest extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {};
    }
    static navigationOptions = {
        title: "Welcome to the HomePage",
        tabBarLabel: "我的",
        //title: "个人中心", // 可以用作headerTitle和tabBarLabel的备选的通用标题，优先级低
        tabBarIcon: ({ focused }) => {
            if (focused) {
                return <Image style={styles.tabBarIcon} source={mineIcon2} />;
            }
            return <Image style={styles.tabBarIcon} source={mineIcon1} />;
        }
    };
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text
                        onPress={() => {
                            this.props.navigation.navigate("Login");
                        }}
                    >
                        跳到登录页面
                    </Text>
                    <Text
                        onPress={() => {
                            this.props.navigation.navigate("Register");
                        }}
                    >
                        跳到注册页面
                    </Text>
                    <Text
                        onPress={() => {
                            this.props.navigation.navigate("Sell");
                        }}
                    >
                        跳到淘页面
                    </Text>
                    <Text
                        onPress={() => {
                            this.props.navigation.navigate("AuthTest");
                        }}
                    >
                        跳到测试页面
                    </Text>
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: "#555",
        backgroundColor: "#fffff5"
    },
    tabBarIcon: {
        width: 22,
        height: 22
    }
});
