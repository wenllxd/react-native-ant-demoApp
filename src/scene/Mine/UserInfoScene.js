import React, { Component } from "react";
import {
    SafeAreaView,
    View,
    StyleSheet,
    Button,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    Image
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import defaultImg from "../../assets/images/default1.jpeg";
import arrowRight from "../../assets/images/arrowRight.png";

export default class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            username: ""
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
                <TouchableOpacity style={styles.avatarView}>
                    <Text style={styles.avatarText}>头像</Text>
                    <Image source={defaultImg} style={styles.avatar} />
                    <Image source={arrowRight} style={styles.img} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.InfoView}>
                    <Text style={styles.infoText}>用户名</Text>
                    <Text style={styles.infoName}>{this.state.username}</Text>
                    <Image source={arrowRight} style={styles.infoImg} />
                </TouchableOpacity>
                <Text>用户信息修改界面</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: "#555",
        backgroundColor: "#eee"
    },
    avatarView: {
        backgroundColor: "#fff",
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        height: 80,
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "row"
    },
    avatarText: {
        flex: 1,
        height: 80,
        lineHeight: 80,
        paddingBottom: 15,
        marginLeft: 15
    },
    avatar: {
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        margin: 15,
        width: 60,
        height: 60,
        borderRadius: 4
    },
    img: {
        marginTop: 26,
        marginRight: 10,
        width: 28,
        height: 28,
        flexDirection: "column",
        justifyContent: "center"
    },
    infoImg: {
        marginTop: 16,
        marginRight: 10,
        width: 28,
        height: 28,
        flexDirection: "column",
        justifyContent: "center"
    },
    InfoView: {
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        height: 60,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-start"
    },
    infoText: {
        flex: 5,
        height: 60,
        lineHeight: 60
    },
    infoName: {
        flex: 1,
        width: 200,
        height: 60,
        lineHeight: 60
    }
});
