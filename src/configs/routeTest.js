import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    Button,
    View,
    AsyncStorage,
    ActivityIndicator,
    StatusBar
} from "react-native";
import {
    createStackNavigator,
    createBottomTabNavigator,
    createAppContainer,
    createSwitchNavigator
} from "react-navigation";
// 路由配置文件
// 引入页面,新建页面要在这里引入
import BottomNavigator from "../scene/BottomTab/index.js";
import HomeScene from "../scene/Home/HomeScene";
import DemandScene from "../scene/Demand/DemandScene";
import PublishScene from "../scene/Publish/PublishScene";
import SellScene from "../scene/Sell/SellScene";
import MineScene from "../scene/Mine/MineScene";
import LoginScene from "../scene/Mine/LoginScene";
import RegisterScene from "../scene/Mine/RegisterScene";
import AuthTest from "../scene/Mine/AuthTest";

// 测试身份验证的一个单独路由,成功

//获取身份状态
class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true;
        this._getAsyncState();
    }
    //获取user token
    _getAsyncState = async () => {
        const userToken = await AsyncStorage.getItem("userToken");
        //如果有token则跳转到主页，否则跳到登录操作去登录
        this.props.navigation.navigate(userToken ? "App" : "Auth");
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
        this.props.navigation.navigate("App");
    };
    render() {
        return (
            <View style={styles.container}>
                <Button title="登录" onPress={this._signInAsync} />
            </View>
        );
    }
}

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
    Home: HomeScreen,
    Other: OtherScreen
});

//验证路由配置
const AuthStack = createStackNavigator({
    SignIn: SignInScreen
});

//const AppContainer = createAppContainer(RootStack);
const AppContainer = createAppContainer(
    createSwitchNavigator(
        {
            AuthLoading: AuthLoadingScreen,
            App: AppStack,
            Auth: AuthStack
        },
        {
            initialRouteName: "AuthLoading"
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
