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
    createBottomTabNavigator,
    createAppContainer,
    createSwitchNavigator
} from "react-navigation";
// 路由配置文件
// 引入页面,新建页面要在这里引入
import BottomNavigator from "../scene/BottomTab/index.js";
import LoginScene from "../scene/Mine/LoginScene";
import RegisterScene from "../scene/Mine/RegisterScene";

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
        const userToken = await AsyncStorage.getItem("user");
        //如果有token则跳转到主页，否则跳到登录操作去登录
        this.props.navigation.navigate(userToken ? "Mine" : "Login1");
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

//登录操作
class SignInScreen extends Component {
    //登录
    static navigationOptions = {
        title: "please sign in"
    };
    _signInAsync = async () => {
        await AsyncStorage.setItem("userToken", "abc");
        this.props.navigation.navigate("BottomTab");
    };
    render() {
        return (
            <View style={styles.container}>
                <Button title="登录" onPress={this._signInAsync} />
            </View>
        );
    }
}
/*
class HomeScreen extends Component {
    static navigationOptions = {
        title: "Welcome to the HomePage"
    };
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate("Auth");
    };
    render() {
        return (
            <View style={styles.container}>
                <Button
                    title="go to onther"
                    onPress={() => {
                        this.props.navigation.navigate("Other");
                    }}
                />
                <Button title="sign out" onPress={this._signOutAsync} />
            </View>
        );
    }
}

class OtherScreen extends Component {
    static navigationOptions = {
        title: "其他页面"
    };
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate("Auth");
    };
    render() {
        return (
            <View style={styles.container}>
                <Text>其他内容</Text>
                <Button title="sign out" onPress={this._signOutAsync} />
            </View>
        );
    }
}
//页面路由配置

const AppStack = createStackNavigator({
    AppHome: HomeScreen,
    Other: OtherScreen
});

//验证路由配置
const AuthStack = createStackNavigator({
    SignIn: SignInScreen
});
*/

/*
const HomeStack = createStackNavigator({
    Main: {
        screen: HomeScene,
        navigationOptions: {
            headerTitle: "主页"
        }
    },
    Sell: {
        screen: SellScene,
        navigationOptions: {
            headerTitle: "淘页面"
        }
    }
});

const MineStack = createStackNavigator({
    Mine: {
        screen: MineScene,
        navigationOptions: {
            headerTitle: "个人"
        }
    },
    MineDetail: {
        screen: LoginScene,
        navigationOptions: {
            headerTitle: "个人2"
        }
    }
});

const Bottom = createBottomTabNavigator({
    Home2: {
        screen: HomeStack,
        navigationOptions: {
            tabBarLabel: "Home2"
        }
    },
    Mine2: {
        screen: MineStack,
        navigationOptions: {
            tabBarLabel: "Mine2"
        }
    }
});
*/
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

//验证路由配置

const AppContainer = createAppContainer(
    createSwitchNavigator(
        {
            BottomTab: BottomNavigator,
            Login: LoginStack,
            Register: RegStack,
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
