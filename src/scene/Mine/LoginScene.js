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
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import UserAvatar from "../../components/UserAvatar";
import "../../assets/data/data1.js";

// 用户登录页
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            pwd: "",
            isLogin: false,
            avatar: null, //存到storage中
            nickName: ""
        };
        this._getAsyncState();
    }

    _getAsyncState = async () => {
        // key为name,存的值是用户名
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

    _setAsyncState = async (name, pwd) => {
        let key = "user";
        let data = {
            name: name,
            pwd: pwd,
            avatar: this.state.avatar,
            nickName: this.state.nickName
        };
        let jsonStr = JSON.stringify(data);
        await AsyncStorage.setItem(key, jsonStr);
        this.props.navigation.navigate("BottomTab");
    };

    // 密码处理,这个暂时用不上了,用RN TextInput自带的 secureTextEntry属性替代
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
    _submitAuth = async () => {
        let message = ""; // 提示框消息
        if (this.state.name == "") {
            message = "请输入用户名";
        } else if (this.state.pwd == "") {
            message = "请输入密码";
        } else if (this.state.pwd.length < 6) {
            message = "请输入6位数以上的任意字符";
            //this._setAsyncState();
        } else {
            // 因为axios是异步请求,如果不用await，会先执行axios后面的操作，导致接收不到数据
            const resp = await axios
                .get("/getUser", { dataType: "json" })
                .then(res => {
                    console.log("登录打印" + res.data);
                    if (
                        res.data.name == this.state.name &&
                        res.data.pwd == this.state.pwd
                    ) {
                        message = "登陆成功";
                        this.setState({ isLogin: true });
                    } else {
                        message = "账号或密码不正确";
                    }
                })
                .catch(err => {
                    message = "网络错误";
                    console.log(err);
                });
            console.log(resp);
        }
        if (this.state.isLogin) {
            //存储用户名并跳转
            this._setAsyncState(this.state.name, this.state.pwd);
        } else {
            Alert.alert("提示", message);
        }
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
                        autoCapitalize="none"
                        onChangeText={text => {
                            this.setState({ name: text });
                        }}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="请输入密码"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        onChangeText={text => {
                            this.setState({ pwd: text });
                        }}
                        style={styles.input}
                        value={this.state.pwd}
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
