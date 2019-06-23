import React, { Component } from "react";
import {
    SafeAreaView,
    View,
    StyleSheet,
    Button,
    Text,
    TextInput,
    Alert
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import UserAvatar from "../../components/UserAvatar";

// 用户登录页
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            pwd: "",
            showPwd: ""
        };
        this._getAsyncState();
    }

    _getAsyncState = async () => {
        const userToken = await AsyncStorage.getItem("user");
        if (userToken) {
            /** 这里还有点问题，已经登录的时候会进到这个登录页判断状态再调回中心页，
             * 应该在点击链接的地方加判断
             * */
            this.props.navigation.navigate("Mine");
        } else {
            console.log("未登录哦");
        }
    };

    _setAsyncState = async () => {
        await AsyncStorage.setItem("user", "pwd123");

        this.props.navigation.navigate("BottomTab");
    };

    // 密码处理
    _pwdFormat = text => {
        // 因为text是 ****8,只有最后一个数字没有被替换,每次拼接最后一个得到的就是最终输入密码
        let val = this.state.pwd + text.replace(/\*/g, "");
        if (text == "") {
            val = "";
        } else if (text.replace(/\*/g, "") == "") {
            console.log(text.length);
            val = val.substr(0, text.length);
        }
        //console.log(val);
        this.setState({ pwd: val });
        console.log(this.state.pwd);
        let str = text.replace(/\w+/g, "*");
        //console.log(text.replace(/^(\w)+/g, str));
        return str;
    };

    // 提交验证
    _submitAuth = () => {
        let message = ""; // 提示框消息
        if (this.state.name == "") {
            message = "请输入用户名";
        } else if (this.state.pwd == "") {
            message = "请输入密码";
        } else if (this.state.pwd.length < 6) {
            message = "密码格式不正确";
            //this._setAsyncState();
        } else {
            message = "登陆成功";
        }
        console.log(this.state.name);
        console.log(this.state.pwd);
        Alert.alert("提示", message);

        //this._setAsyncState();
    };
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.text}>登录账号,体验更多功能</Text>
                </View>
                <View>
                    <UserAvatar />
                    <TextInput
                        placeholder="请输入账号"
                        onChangeText={text => {
                            this.setState({ name: text });
                        }}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="请输入密码"
                        onChangeText={text => {
                            this.setState({ showPwd: this._pwdFormat(text) });
                        }}
                        style={styles.input}
                        value={this.state.showPwd}
                    />
                    <View style={styles.touchView}>
                        <Button
                            color="#fff"
                            title="登录"
                            onPress={this._submitAuth}
                        />
                    </View>
                </View>
                <View style={styles.viewReg}>
                    <Button
                        color="#058de6"
                        title="注册"
                        onPress={() => {
                            this.props.navigation.navigate("Register");
                        }}
                    />
                </View>
                <Text
                    onPress={() => {
                        this.props.navigation.navigate("Home2");
                    }}
                >
                    返回
                </Text>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "80%" // 因为底部导航占了一部分高度，所以不设置100%
    },
    text: {
        fontSize: 18,
        width: "100%",
        height: 30,
        marginBottom: 40
    },
    input: {
        width: 300,
        fontSize: 18,
        borderBottomWidth: 1,
        borderRadius: 2,
        borderColor: "#ddd",
        marginTop: 20,
        padding: 15
    },
    touchView: {
        backgroundColor: "#e91e63",
        marginTop: 40,
        padding: 5,
        borderRadius: 2
    },
    viewReg: {
        // 居右
        width: 315,
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10
    }
});
