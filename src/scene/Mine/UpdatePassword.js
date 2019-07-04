import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Button,
    Text,
    TextInput,
    Alert,
    TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export default class UpdatePassword extends Component {
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
        const userToken = await AsyncStorage.getItem("user");
        const userData = JSON.parse(userToken);
        // console.log(userToken); // 输出密码
        //如果有token则跳转到主页，否则跳到登录操作去登录
        if (userToken) {
            this.setState({
                isLogin: true,
                username: userData.name,
                avatarSource: userData.avatar
            });
        } else {
            // Login1 外面的路由
            this.props.navigation.navigate("Login1");
        }
    };

    _updateAvatar = async source => {
        const newAvatar = {
            avatar: source
        };
        const newStr = JSON.stringify(newAvatar);
        const userToken = await AsyncStorage.mergeItem("user", newStr);
        console.log("update:" + userToken);
    };

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.name}
                    placeholder="请输入旧密码"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={text => {
                        this.setState({ newName: text });
                    }}
                />
                <TextInput
                    style={styles.name}
                    placeholder="请输入新密码"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={text => {
                        this.setState({ newName: text });
                    }}
                />
                <TextInput
                    style={styles.name}
                    placeholder="请确认新密码"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={text => {
                        this.setState({ newName: text });
                    }}
                />
                <TouchableOpacity
                    style={styles.chooseBtn}
                    onPress={this._selectPhotoTapped}
                >
                    <Text style={{ fontSize: 18 }}>修改密码</Text>
                </TouchableOpacity>
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
    },
    chooseBtn: {
        backgroundColor: "#fff",
        width: "80%",
        marginTop: 35,
        //margin: "auto",
        height: 45,
        lineHeight: 45,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 2
    },
    name: {
        width: "100%",
        height: 50,
        backgroundColor: "#fff",
        padding: 10,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: "#eee"
    }
});
