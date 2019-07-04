import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    Button,
    View,
    ActivityIndicator,
    StatusBar
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import {
    createStackNavigator,
    createAppContainer,
    createSwitchNavigator
} from "react-navigation";
// 路由配置文件
// 引入页面,新建页面要在这里引入
import BottomNavigator from "../scene/BottomTab/index.js";
import LoginScene from "../scene/Mine/LoginScene";
import RegisterScene from "../scene/Mine/RegisterScene";

import MineScene from "../scene/Mine/MineScene";
// 子页面
import MyPublish from "../scene/Mine/myPublish.js";
import MyCollect from "../scene/Mine/myCollect.js";
import UserInfoScene from "../scene/Mine/UserInfoScene";
import UploadAvatarScene from "../scene/Mine/UploadAvatarScene";
import UpdatePassword from "../scene/Mine/UpdatePassword";
import UpdateNickName from "../scene/Mine/UpdateNickName";
/**
 * 验证登录状态流程（暂时先判断个人中心）
 * 1.点击个人中心--->
 */

//全局--获取身份状态
class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this._getAsyncState();
    }
    //获取user token
    _getAsyncState = async () => {
        //这里如果要取用户信息，则需要反序列化userToken
        const userToken = await AsyncStorage.getItem("user");
        console.log("路由route打印:" + userToken);
        //如果有token则跳转到个人中心，否则跳到登录操作去登录
        this.props.navigation.navigate(userToken ? "Publish2" : "Login1");
        //his.props.navigation.navigate("Home");
    };
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar />
            </View>
        );
    }
}

// 可以在这里增加不需要显示底部导航的页面，但是要手动返回
const LoginStack = createStackNavigator({
    Login1: {
        screen: LoginScene,
        navigationOptions: {
            headerTitle: "登录",
            headerTintColor: "blue"
        }
    }
});
const RegStack = createStackNavigator({
    Register1: {
        screen: RegisterScene,
        navigationOptions: {
            headerTitle: "注册"
        }
    }
});

//MineStack1作用：个人中心子页面没有tab,但是返回到个人中心时要有tab
const MineStack1 = createStackNavigator({
    Mine: {
        screen: MineScene,
        navigationOptions: {
            headerTitle: "个人中心",
            headerBackTitle: "个人中心",
            headerTintColor: "#fff",
            headerStyle: {
                backgroundColor: "#e91e63"
            }
        }
    },
    Login: {
        screen: LoginScene,
        navigationOptions: {
            headerTitle: "登录"
        }
    },
    Register: {
        screen: RegisterScene,
        navigationOptions: {
            headerTitle: "注册"
        }
    },
    UserInfo: {
        screen: UserInfoScene,
        navigationOptions: ({ navigation }) => {
            const { params } = navigation.state;
            // backRouteName参数 在页面调用的时候一定要定义，否则报错

            let name = params.backRouteName ? params.backRouteName : "Mine2";
            console.log(navigation);
            return {
                headerTitle: "个人信息",
                headerBackTitle: "设置",
                headerLeft: (
                    <Button
                        title="返回"
                        onPress={() => {
                            navigation.navigate(name);
                        }}
                    />
                )
            };
        }
    },
    UploadAvatar: {
        screen: UploadAvatarScene
    },
    UpdatePassword: {
        screen: UpdatePassword
    },
    UpdateNickName: {
        screen: UpdateNickName
    },
    MyPublish: {
        screen: MyPublish,
        navigationOptions: ({ navigation }) => {
            const { params } = navigation.state;
            // backRouteName参数 在页面调用的时候一定要定义，否则报错

            let name = params.backRouteName ? params.backRouteName : "Mine2";
            console.log(navigation);
            return {
                headerTitle: "个人信息",
                headerBackTitle: "返回",
                headerLeft: (
                    <Button
                        title="返回"
                        onPress={() => {
                            navigation.navigate(name);
                        }}
                    />
                )
            };
        }
    },
    MyCollect: {
        screen: MyCollect,
        navigationOptions: ({ navigation }) => {
            const { params } = navigation.state;
            // backRouteName参数 在页面调用的时候一定要定义，否则报错

            let name = params.backRouteName ? params.backRouteName : "Mine2";
            console.log(navigation);
            return {
                headerTitle: "个人信息",
                headerBackTitle: "返回",
                headerLeft: (
                    <Button
                        title="返回"
                        onPress={() => {
                            navigation.navigate(name);
                        }}
                    />
                )
            };
        }
    }
});

//验证路由配置

const AppContainer = createAppContainer(
    createSwitchNavigator(
        {
            BottomTab: BottomNavigator,
            Login: LoginStack,
            Register: RegStack,
            Mine1: MineStack1,
            //App: AppStack,
            Auth: AuthLoadingScreen
        },
        {
            initialRouteName: "Auth"
            // 当backBehavior的值为默认值none时，从注册或登录页面跳转到首页后按下系统返回键不退回到注册或登录页面
        }
    )
);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default () => <AppContainer />;
