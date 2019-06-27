import React, { Component } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export default class MyPublish extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            username: "",
            image: null,
            avatarSource: null
        };
        this._getAsyncState();
    }
    _getAsyncState = async () => {
        // key为name,值为用户名
        const userToken = await AsyncStorage.getItem("name");
        // console.log(userToken); // 输出密码
        //如果有token则跳转到主页，否则跳到登录操作去登录
        if (userToken) {
            this.setState({
                isLogin: true,
                username: userToken
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
