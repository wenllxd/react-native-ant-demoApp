import React, { Component } from "react";
import {
    SafeAreaView,
    View,
    StyleSheet,
    Button,
    Text,
    TextInput
} from "react-native";
import UserAvatar from "../../components/UserAvatar";

// 用户登录页
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.text}>登录账号,体验更多功能</Text>
                </View>
                <View>
                    <UserAvatar />
                    <TextInput placeholder="请输入账号" style={styles.input} />
                    <TextInput placeholder="请输入密码" style={styles.input} />
                    <View style={styles.touchView}>
                        <Button color="#fff" title="登录" />
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
