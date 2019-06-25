import React, { Component } from "react";
import {
    View,
    SafeAreaView,
    Image,
    StyleSheet,
    Text,
    Button,
    TouchableOpacity
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import mineIcon1 from "../../assets/images/mine1.png";
import mineIcon2 from "../../assets/images/mine2.png";
import defaultImg from "../../assets/images/default1.jpeg";
import arrowRight from "../../assets/images/arrowRight.png";
import publish3 from "../../assets/images/publish3.png";
import collect from "../../assets/images/collect.png";

// 我的--个人中心页面
export default class MineScene extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this.state = {
            isLogin: false,
            username: ""
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

    //注销
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.setState({ isLogin: false, username: "" });
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
                <TouchableOpacity
                    style={styles.userInfo}
                    activeOpacity={0.9}
                    onPress={() => {
                        navigate("UserInfo");
                    }}
                >
                    <Image style={styles.avatar} source={defaultImg} />
                    <TouchableOpacity
                        style={styles.userInfo}
                        activeOpacity={0.9}
                    />
                    <View style={styles.userName}>
                        <Text style={styles.userText}>昵称 : 用户32</Text>
                        <Text style={styles.userText}>
                            用户名 : {this.state.username}
                        </Text>
                    </View>
                    <Image style={styles.img} source={arrowRight} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.mineList} activeOpacity={0.9}>
                    <Image style={styles.publishImg} source={publish3} />

                    <Text style={styles.mineText}>我发布的信息</Text>

                    <Image style={styles.img2} source={arrowRight} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.mineList} activeOpacity={0.9}>
                    <Image style={styles.collectImg} source={collect} />

                    <Text style={styles.mineText}>我的收藏</Text>

                    <Image style={styles.img2} source={arrowRight} />
                </TouchableOpacity>
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
                    <Text onPress={this._signOutAsync}>退出</Text>
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
        backgroundColor: "#eee"
    },
    tabBarIcon: {
        width: 22,
        height: 22
    },
    userInfo: {
        backgroundColor: "#fff",
        marginBottom: 20,
        height: 100,
        justifyContent: "center",
        alignItems: "flex-start",
        flexDirection: "row"
    },
    avatar: {
        marginTop: 10,

        marginLeft: 15,
        marginRight: 15,
        margin: 15,
        width: 80,
        height: 80,
        borderRadius: 4
    },
    img: {
        marginTop: 36,
        marginRight: 10,
        width: 28,
        height: 28,
        flexDirection: "column",
        justifyContent: "center"
    },
    userName: {
        flex: 1,
        flexDirection: "column", //并排显示则设为row
        //alignItems: "center", // 水平居中设为center
        justifyContent: "flex-end", // 垂直居中设为center
        height: 100,
        lineHeight: 100,
        paddingBottom: 15
    },
    userText: {
        height: 20
    },
    mineList: {
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        height: 70,
        //justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    publishImg: {
        marginRight: 15,
        marginLeft: 15,
        width: 40,
        height: 40
    },
    collectImg: {
        marginRight: 15,
        marginLeft: 15,
        width: 40,
        height: 48
    },
    mineText: {
        flex: 1
    },
    img2: {
        marginRight: 10,
        width: 28,
        height: 28,
        flexDirection: "column",
        justifyContent: "center"
    }
});
