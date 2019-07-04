import React, { Component } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export default class MyPublish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            username: "", //用户名
            avatar: null,
            nickName: "" //昵称
        };
        this._getAsyncState();
    }

    //获取登录状态
    _getAsyncState = async () => {
        // key为name,值为用户名
        const userToken = await AsyncStorage.getItem("user");
        //反序列化
        let userData = JSON.parse(userToken);
        console.log(JSON.parse(userToken)); // 输出密码
        //如果有token则跳转到主页，否则跳到登录操作去登录
        if (userToken) {
            this.setState({
                isLogin: true,
                username: userData.name,
                nickName: userData.nickName,
                avatar: userData.avatar
            });
        } else {
            // Login1 外面的路由
            this.props.navigation.navigate("Login1");
        }
    };
    render() {
        return (
            <View style={styles.container}>
                <Text>我发布的信息</Text>
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
