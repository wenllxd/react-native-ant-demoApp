import React, { Component } from "react";
import {
    View,
    SafeAreaView,
    Image,
    StyleSheet,
    Text,
    Button
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import mineIcon1 from "../../assets/images/mine1.png";
import mineIcon2 from "../../assets/images/mine2.png";

// 我的--个人中心页面
export default class MineScene extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {
            isLogin: false
        };
        this._getAsyncState();
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

    //获取登录状态
    _getAsyncState = async () => {
        const userToken = await AsyncStorage.getItem("user");
        //如果有token则跳转到主页，否则跳到登录操作去登录
        if (userToken) {
            this.setState({
                isLogin: true
            });
        } else {
            // Login1 外面的路由
            this.props.navigation.navigate("Login1");
        }
    };

    //注销
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.setState({ isLogin: false });
        this.props.navigation.navigate("Login1");
    };

    // 点击登录
    _login = () => {
        if (this.state.isLogin) {
            console.log("已登录，不做跳转");
        } else {
            this.props.navigation.navigate("Login");
        }
    };

    render() {
        const { navigate, state, setParams } = this.props.navigation;
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text onPress={this._login}>跳到登录页面</Text>
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
                    <Text onPress={this._signOutAsync}>注销</Text>
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
