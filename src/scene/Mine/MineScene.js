import React, { Component } from "react";
import {
    View,
    AsyncStorage,
    SafeAreaView,
    Image,
    StyleSheet,
    Text,
    Button
} from "react-native";

import mineIcon1 from "../../assets/images/mine1.png";
import mineIcon2 from "../../assets/images/mine2.png";

// 我的--个人中心页面
export default class MineScene extends Component {
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
        const { navigate, state, setParams } = this.props.navigation;
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text
                        onPress={() => {
                            navigate("Login");
                        }}
                    >
                        跳到登录页面
                    </Text>
                    <Text
                        onPress={() => {
                            navigate("Register");
                        }}
                    >
                        跳到注册页面
                    </Text>
                    <Text
                        onPress={() => {
                            navigate("Sell");
                        }}
                    >
                        跳到淘页面
                    </Text>
                    <Text
                        onPress={() => {
                            navigate("AuthTest");
                        }}
                    >
                        跳到测试页面
                    </Text>
                    <Button
                        title="跳转到别的页面的子路由"
                        onPress={() => {
                            navigate("Detail", {
                                // 退回的上一级页面,而不是父页面
                                backRouteName: state.routeName
                            });
                        }}
                    />
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
